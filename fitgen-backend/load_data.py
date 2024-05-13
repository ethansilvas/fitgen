import pandas as pd

workout_df = pd.read_csv(
    './data/WorkoutExport.csv',
    index_col='Date',
    parse_dates=True,
)

# convert weight column to lbs 
kg_to_lbs = 2.20462
workout_df['Weight'] = workout_df['Weight(kg)'] * kg_to_lbs 

# reduce number of columns by merging all rows with the same exercise into one row
# then create a new column for how many sets of the exercise were done 
workout_df = workout_df.groupby(['Date', 'Exercise', 'Weight', 'Reps', 'Duration(s)', 'isWarmup']).size().reset_index(name='Sets')
workout_df.set_index('Date', inplace=True)
workout_df.sort_index(ascending=False, inplace=True)

workout_df.to_csv('test.csv')
