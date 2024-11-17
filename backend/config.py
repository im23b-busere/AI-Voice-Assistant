from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)

#prevent CORS policy errors
CORS(app)

@app.route("/")
def index():
    return jsonify({"message": "test"})

if __name__ == "__main__":
    app.run()
