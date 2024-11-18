from flask import Flask, jsonify
from flask_cors import CORS
from backend.main import ask_AI
from flask import request

app = Flask(__name__)

# prevent CORS policy errors
CORS(app)


# Route to handle AI responses
@app.route("/voice", methods=["POST"])
def voice_input():
    try:
        data = request.get_json()
        user_input = data.get("input", None)

        ai_response = ask_AI(user_input)
        return jsonify({"response": ai_response})

    except Exception as err:
        return jsonify({"error": str(err)}), 500


if __name__ == "__main__":
    app.run(debug=True)
