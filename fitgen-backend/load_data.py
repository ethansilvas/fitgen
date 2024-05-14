import pandas as pd
import numpy as np
from data.exercise_dictionaries import exercises

workout_df = pd.read_csv('./data/WorkoutExport.csv', parse_dates=True)

# select timeframe of workout data 
workout_df = workout_df[workout_df['Date'] > '2023-06-05']

# remove any values where the workout was running
workout_df = workout_df.drop(workout_df[workout_df['Exercise'] == "Running"].index)

# convert weight column to lbs 
kg_to_lbs = 2.20462
workout_df['Weight'] = workout_df['Weight(kg)'] * kg_to_lbs 

# reduce number of rows by merging all rows with the same exercise into one row
# then create a new column for how many sets of the exercise were done 
workout_df = workout_df.groupby(['Date', 'Exercise', 'Weight', 'Reps', 'Duration(s)', 'isWarmup']).size().reset_index(name='Sets')

# further combine rows so that there are no duplicate exercises for the same day 
# do this by taking the average rep counts, minimum weight values, and adding up all the set values
workout_df = workout_df.groupby(['Date', 'Exercise', 'Duration(s)', 'isWarmup']).agg({
    'Reps': 'mean',
    'Weight': 'min',
    'Sets': 'sum'
}).reset_index()

# type conversions and rounding
workout_df['Reps'] = np.ceil(workout_df['Reps']).astype(int)
workout_df['Weight'] = workout_df['Weight'].astype(int)

# add the target muscle column 
workout_df['Target Muscle'] = workout_df['Exercise'].map(exercises)

workout_df.set_index('Date', inplace=True)
workout_df.sort_index(ascending=False, inplace=True)
workout_df.to_csv('test.csv')
