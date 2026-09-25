from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Crop Disease Analyzer AI Backend is Running"

@app.route("/predict", methods=["POST"])
def predict():
    if "image" not in request.files:
        return jsonify({
            "error": "No image uploaded"
        }), 400

    image = request.files["image"]

    if image.filename == "":
        return jsonify({
            "error": "No image selected"
        }), 400

    try:
        img = Image.open(image)
        img.verify()

        return jsonify({
            "disease": "Test Disease",
            "confidence": 95,
            "recommendation": "This is a test result. Actual AI model will be connected next."
        })

    except Exception:
        return jsonify({
            "error": "Invalid image file"
        }), 400


if __name__ == "__main__":
    import os
    app.run(
        debug=True,
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )
