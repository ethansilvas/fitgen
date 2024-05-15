'use client'
import React, { useEffect, useState } from "react";

type Exercise = {
    Exercise: string,
}

type Workout = {
    Abs: Exercise
}


export default function Test() {
    // const [isLoading, setLoading] = useState(true)
    const [workout, setWorkout] = useState<Workout>({ Abs: { Exercise: 'Crunches' } })

    useEffect(() => {
        fetch('http://localhost:8080/api/generate').then(
            response => response.json()
        ).then((data) => {
            setWorkout(data);
            //setLoading(false);
        });
    }, []);

    if (Object.keys(workout).length === 0) {
        return (
            <div>Loading...</div>
        )
    } else {
        console.log(workout)
        return (
            <div>{workout.Abs.Exercise}</div>
        )
    }
}