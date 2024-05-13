import pandas as pd
import numpy as np

workout_df = pd.read_csv(
    './data/WorkoutExport.csv',
    parse_dates=True,
)

# select timeframe of workout data 
workout_df = workout_df[workout_df['Date'] > '2023-06-05']

# convert weight column to lbs 
kg_to_lbs = 2.20462
workout_df['Weight'] = workout_df['Weight(kg)'] * kg_to_lbs 

# reduce number of rows by merging all rows with the same exercise into one row
# then create a new column for how many sets of the exercise were done 
workout_df = workout_df.groupby(['Date', 'Exercise', 'Weight', 'Reps', 'Duration(s)', 'isWarmup']).size().reset_index(name='Sets')

"""
after the previous merges there still may be duplicate exercises for the same day if: 
    - the number of reps done were different for each set
    - the weight values were different for each set
"""

# remove duplicate exercise rows by using the average value for the Reps column
workout_df = workout_df.groupby(['Date', 'Exercise', 'Weight', 'Duration(s)', 'isWarmup'])['Reps'].mean().reset_index(name='Reps')
workout_df['Reps'] = np.ceil(workout_df['Reps'])

# remove duplicate exercise rows by using the lowest weight value 
# workout_df = workout_df.groupby(['Date', 'Exercise', 'Reps', 'Duration(s)', 'isWarmup'])['Weight'].min().reset_index(name='Weight')

workout_df.set_index('Date', inplace=True)
workout_df.sort_index(ascending=False, inplace=True)
workout_df.to_csv('test.csv')
