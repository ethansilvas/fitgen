from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.get('/api/generate')
def generate_workout():
    return jsonify({
        'message': 'hello there'
    }) 

if __name__ == '__main__':
    # default port 5000 will result in CORS issue
    app.run(debug=True, port=8080)