'use client'
import React, { useEffect, useState } from "react";
import TargetMuscle from "./TargetMuscle";

type Exercise = {
    Exercise: string,
    Reps: number,
    Weight: number,
    Sets: number
}

type Workout = {
    Shoulders: Exercise,
    Triceps: Exercise,
    Quadriceps?: Exercise,
    Hamstrings?: Exercise,
    Biceps: Exercise,
    Chest: Exercise,
    Glutes: Exercise,
    Abs: Exercise, 
    "Lower Back": Exercise
}

export default function WorkoutTable() {
    const [isLoading, setLoading] = useState(true)
    const [workout, setWorkout] = useState<Workout | null>(null)
    const [selectedMuscleExercises, setSelectedMuscleExercises] = useState([])

    useEffect(() => {
        fetch('http://localhost:8080/api/generate').then(
            response => response.json()
        ).then((data) => {
            setWorkout(data);
            setLoading(false);
        });
    }, []);

    const handleMuscleChange = (muscle: []) => {
        console.log(muscle)
        setSelectedMuscleExercises(muscle);
    }

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    } else if (workout) {
        console.log(workout)
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Target Muscle</th>
                            <th>Exercise</th>
                            <th>Weight</th>
                            <th>Reps</th>
                            <th>Sets</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Object.entries(workout).map(([targetMuscle, exercise]) => (
                                <tr key={targetMuscle}>
                                    <td>
                                        <TargetMuscle defaultMuscle={targetMuscle} onMuscleChange={handleMuscleChange}></TargetMuscle>
                                    </td>
                                    <td>
                                        <select
                                            defaultValue={exercise.Exercise}
                                        >
                                            <option value={exercise.Exercise}>{exercise.Exercise}</option>
                                            {
                                                selectedMuscleExercises.map((exercise, index) => (
                                                    <option key={exercise}>{exercise}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                    <td>{exercise.Weight}</td>
                                    <td>{exercise.Reps}</td>
                                    <td>{exercise.Sets}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}