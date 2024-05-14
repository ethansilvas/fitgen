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

    if legs == 0:
        base_workout[2] = 'Quadriceps'
    else:
        base_workout[2] = 'Hamstrings'

    if back == 0:
        base_workout[7] = 'Back' 
    else:
        base_workout[7] = 'Lower Back'

def get_exercise(target_muscle):
    """Use data to generate exercise, sets, and reps given a target muscle"""

    # choose a random exercise from the list of exercises for the given target muscle
    exercise_index = randint(0, len(target_muscles[target_muscle]) - 1)

    print(target_muscles[target_muscle][exercise_index])


@app.get('/api/generate')
def generate_workout():
    base_workout = ['Shoulders', 'Triceps', 'Quadriceps or Hamstrings', 'Biceps', 'Chest', 'Glutes', 'Abs', 'Back or Lower Back']
    choose_legs_back(base_workout)

    workout = {}
    
    for exercise in base_workout:
        get_exercise(exercise)
        workout[exercise] = []

    return jsonify(workout) 

if __name__ == '__main__':
    # default port 5000 will result in CORS issue
    app.run(debug=True, port=8080)