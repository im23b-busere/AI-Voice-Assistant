from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.main import ask_ai, secret_key
from dotenv import load_dotenv
import os
import mysql.connector
import jwt
import logging

load_dotenv()
PW = os.getenv('DB_PW')

app = Flask(__name__)

#db connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': PW,
    'database': 'AI_Voice_Assistant'
}

# prevent CORS policy errors
CORS(app)


# Route to handle AI responses
@app.route("/voice", methods=["POST"])
def voice_input():
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "Invalid or missing JSON payload"}), 400

        user_input = data.get("input", None)
        if not user_input:
            return jsonify({"error": "Input is required"}), 400

        ai_response = ask_ai(user_input) 
        if not ai_response:
            return jsonify({"error": "AI could not generate a response"}), 500
        return jsonify({"response": ai_response})

    except Exception as err:
        return jsonify({"error": str(err)}), 500


# Configure logging
logging.basicConfig(level=logging.DEBUG)

@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid or missing JSON payload"}), 400
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Hash the password
    hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

    # Connect to the database
    try:
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()
    except mysql.connector.Error as err:
        logging.error(f"Database connection error: {err}")
        return jsonify({"error": "Database connection error"}), 500

    try:
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, hashed_password))
        connection.commit()
        return jsonify({"message": "User registered successfully"}), 201

    except mysql.connector.Error as err:
        logging.error(f"Database error: {err}")
        connection.rollback()
        return jsonify({"error": str(err)}), 500
    except Exception as e:
        logging.error(f"Unexpected error: {e}")
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        connection.close()

# Route for user login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    # Connect to the database
    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor(dictionary=True)

    try:
        # Check if the user exists in the database
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user and check_password_hash(user["password"], password):
            # Create the JWT token
            token = jwt.encode({
                'sub': user['email']
            }, secret_key, algorithm='HS256')

            # Check if the cookie already exists
            if request.cookies.get('access_token_cookie'):
                response = jsonify({"message": "Login successful"})
            else:
                # Send the cookie to the frontend
                response = jsonify({"message": "Login successful"})
                response.set_cookie(
                    "access_token_cookie",
                    token,
                    httponly=False, # should be True but runs locally so False
                    secure=False,  # should be True but runs locally so False
                    samesite="Lax"  # Strict doesn't want to work :/
                )
            return response, 200

        else:
            return jsonify({"error": "Invalid email or password"}), 401

    except mysql.connector.Error as err:
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        connection.close()
        

if __name__ == "__main__":
    app.run(debug=True)
