from flask import Flask
from flask import request

app = Flask(__name__)

@app.get('/api/generate')
def generate_workout():
    return "hi there"