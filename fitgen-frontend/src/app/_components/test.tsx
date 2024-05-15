'use client'
import React, { useEffect, useState } from "react";

type Exercise = {
    Exercise: string,
    Reps: number,
    Weight: number
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
    } else {
        console.log(workout)
        return (
            <div>{workout && workout["Lower Back"] ? workout["Lower Back"].Exercise : ''}</div>
        )
    }
}