'use client'
import React, { useEffect, useState } from "react";

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

export default function Test() {
    const [isLoading, setLoading] = useState(true)
    const [workout, setWorkout] = useState<Workout | null>(null)

    useEffect(() => {
        fetch('http://localhost:8080/api/generate').then(
            response => response.json()
        ).then((data) => {
            setWorkout(data);
            setLoading(false);
        });
    }, []);

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
                            Object.entries(workout).map(([key, value]) => (
                                <tr key={key}>
                                    <td>{key}</td>
                                    <td>{value.Exercise}</td>
                                    <td>{value.Weight}</td>
                                    <td>{value.Reps}</td>
                                    <td>{value.Sets}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        )
    }
}