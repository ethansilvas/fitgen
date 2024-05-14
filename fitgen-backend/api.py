from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

"""
30 minute
Shoulders
Triceps
(Quadriceps or Hamstrings)
Biceps
Chest
Glutes
Abs
Lower Back


1 hour
Back
Hamstrings

my version
Shoulders
Triceps
(Quadriceps or Hamstrings)
Biceps
Chest
Glutes
Abs
(Back or lower back)
"""
@app.get('/api/generate')
def generate_workout():
    workout = {}
    
    

    return jsonify(workout) 

if __name__ == '__main__':
    # default port 5000 will result in CORS issue
    app.run(debug=True, port=8080)