from flask import Flask, jsonify
from flask_cors import CORS
from backend.main import ask_ai
from flask import request

app = Flask(__name__)

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


if __name__ == "__main__":
    app.run(debug=True)
