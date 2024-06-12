from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import pickle

app = Flask(__name__)
CORS(app)

# Carregar o modelo treinado
model = load_model('model.h5')

@app.route('/')
def index():
    return 'Teste'

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Verificar se os dados foram enviados como JSON
        if not request.json:
            return jsonify({'error': 'Os dados devem ser enviados como JSON'}), 400
        
        data = request.json
        
        # Verificar se todos os campos necessários estão presentes nos dados
        required_fields = [
            'concave_points_worst', 'perimeter_worst', 'concave_points_mean', 
            'radius_worst', 'perimeter_mean'
        ]
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'O campo {field} é obrigatório'}), 400
        
        # Extrair os recursos necessários para a predição
        features = np.array([
            data['concave_points_worst'],
            data['perimeter_worst'],
            data['concave_points_mean'],
            data['radius_worst'],
            data['perimeter_mean']
        ]).reshape(1, -1)
        
        # Fazer a predição
        prediction = model.predict(features)
        prediction = (prediction > 0.5).astype(int)
        
        # Retornar a predição como uma resposta JSON
        return jsonify({'prediction': int(prediction[0][0])})
    except KeyError as e:
        # Se algum campo obrigatório estiver faltando nos dados
        return jsonify({'error': f'O campo {str(e)} é obrigatório'}), 400
    except Exception as e:
        # Em caso de erro desconhecido, retornar uma mensagem de erro com status HTTP 500
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Iniciar o servidor Flask
    app.run(host='0.0.0.0', port=5000)
