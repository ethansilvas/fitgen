from random import randint

from flask import Flask, jsonify, request
from flask_cors import CORS

from data.exercise_dictionaries import target_muscles

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

def choose_legs_back(base_workout):
    """Uses randint to choose between (quads or hamstrings) and (back or lower back)"""
    legs = randint(0, 1)
    back = randint(0, 1)

    base_workout.append('Quadriceps') if legs == 0 else base_workout.append('Hamstrings')
    base_workout.append('Back') if back == 0 else base_workout.append('Lower Back')

@app.get('/api/generate')
def generate_workout():
    base_workout = ['Shoulders', 'Triceps', 'Biceps', 'Chest', 'Glutes', 'Abs']

    choose_legs_back(base_workout)

    workout = {}
    
    for exercise in base_workout:
        workout[exercise] = []

    return jsonify(workout) 

if __name__ == '__main__':
    # default port 5000 will result in CORS issue
    app.run(debug=True, port=8080)