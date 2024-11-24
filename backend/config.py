from flask import Flask, jsonify, request
from flask_cors import CORS
from backend.main import ask_ai
from dotenv import load_dotenv
import os
import mysql.connector

load_dotenv()
api_key = os.getenv('DB_PW')

app = Flask(__name__)

#db connection
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'DB_PW',
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


# Route for user registration
@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid or missing JSON payload"}), 400
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    connection = mysql.connector.connect(**db_config)
    cursor = connection.cursor()

    try:
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (name, email, password))
        connection.commit()
        return jsonify({"message": "User registered successfully"}), 201

    except mysql.connector.Error as err:
        connection.rollback()
        return jsonify({"error": str(err)}), 500
    finally:
        cursor.close()
        connection.close()


if __name__ == "__main__":
    app.run(debug=True)
