from flask import Flask, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)

# Carregar o modelo treinado
model = joblib.load('model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array([
        data['radius_mean'],
        data['texture_mean'],
        data['perimeter_mean'],
        data['area_mean'],
        data['smoothness_mean']
    ]).reshape(1, -1)
    prediction = model.predict(features)
    return jsonify({'prediction': int(prediction[0])})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
