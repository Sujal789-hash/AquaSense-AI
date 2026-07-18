from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained model
model = joblib.load("model.pkl")


@app.route("/")
def home():
    return jsonify({
        "message": "AquaSense AI Backend Running"
    })


@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        features = np.array([[
            float(data["ph"]),
            float(data["Hardness"]),
            float(data["Solids"]),
            float(data["Chloramines"]),
            float(data["Sulfate"]),
            float(data["Conductivity"]),
            float(data["Organic_carbon"]),
            float(data["Trihalomethanes"]),
            float(data["Turbidity"])
        ]])

        prediction = model.predict(features)[0]
        probability = model.predict_proba(features)[0]
        confidence = round(max(probability) * 100, 2)

        if prediction == 1:
            result = "Safe"
            score = min(int(confidence), 100)

            if confidence >= 90:
                risk = "Very Low"
            elif confidence >= 75:
                risk = "Low"
            else:
                risk = "Moderate"

            recommendation = [
                "Water appears safe for drinking.",
                "Maintain regular quality monitoring.",
                "Store water in clean containers.",
                "Ensure periodic laboratory testing."
            ]

            summary = (
                "The AI model predicts that this water sample is suitable for drinking. "
                "The measured parameters indicate a low health risk. "
                "Regular monitoring is recommended to ensure the water quality remains consistent."
            )

        else:
            result = "Unsafe"
            score = max(100 - int(confidence), 10)

            if confidence >= 90:
                risk = "Critical"
            elif confidence >= 75:
                risk = "High"
            else:
                risk = "Moderate"

            recommendation = [
                "Do not consume this water without treatment.",
                "Boil or filter the water before use.",
                "Conduct laboratory testing to identify contaminants.",
                "Consider installing a suitable purification system."
            ]

            summary = (
                "The AI model predicts that this water sample may not be safe for drinking. "
                "One or more parameters suggest poor water quality. "
                "Water treatment and professional laboratory analysis are recommended before consumption."
            )

        return jsonify({
            "prediction": result,
            "confidence": confidence,
            "water_quality_score": score,
            "risk_level": risk,
            "recommendations": recommendation,
            "summary": summary
        })

    except (KeyError, ValueError):
        return jsonify({
            "error": "Please enter valid numeric values for all input fields."
        }), 400

    except Exception as e:
        return jsonify({
            "error": f"Prediction failed: {str(e)}"
        }), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)