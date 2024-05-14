from data.exercise_dictionaries import exercises

target_muscles = {}

for exercise in exercises:
    if exercises[exercise] in target_muscles:
        target_muscles[exercises[exercise]].append(exercise)
    else:
        target_muscles[exercises[exercise]] = [exercise]

print(target_muscles)