from flask import Flask, request, jsonify
import numpy as np
import joblib

app = Flask(__name__)

# Carregar o modelo treinado
model = joblib.load(r'C:\Git\2024\ABP_IA\src\backend\model.pkl')

@app.route('/')
def index():
    return('test')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Verificar se os dados foram enviados como JSON
        if not request.json:
            return jsonify({'error': 'Os dados devem ser enviados como JSON'}), 400
        
        data = request.json
        
        # Verificar se todos os campos necessários estão presentes nos dados
        required_fields = ['radius_mean', 'texture_mean', 'perimeter_mean', 'area_mean', 'smoothness_mean']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'O campo {field} é obrigatório'}), 400
        
        # Extrair os recursos necessários para a predição
        features = np.array([
            data['radius_mean'],
            data['texture_mean'],
            data['perimeter_mean'],
            data['area_mean'],
            data['smoothness_mean']
        ]).reshape(1, -1)
        
        # Fazer a predição
        prediction = model.predict(features)
        
        # Retornar a predição como uma resposta JSON
        return jsonify({'prediction': int(prediction[0])})
    except KeyError as e:
        # Se algum campo obrigatório estiver faltando nos dados
        return jsonify({'error': f'O campo {str(e)} é obrigatório'}), 400
    except Exception as e:
        # Em caso de erro desconhecido, retornar uma mensagem de erro com status HTTP 500
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Iniciar o servidor Flask
    app.run(host='0.0.0.0', port=5000)
