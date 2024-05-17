import { useEffect, useState } from "react";

interface TargetMuscleProps {
    defaultMuscle: string;
}

export default function TargetMuscle({ defaultMuscle }: TargetMuscleProps) {
    const [isLoading, setLoading] = useState(true)
    const [targetMuscles, setTargetMuscles] = useState({})

    useEffect(() => {
        fetch('http://localhost:8080/api/targetmuscles').then(
            response => response.json()
        ).then((allTargetMuscles) => {
            setTargetMuscles(allTargetMuscles)  
            setLoading(false)
        });
    }, [])

    if (isLoading) {
        return (
            <select defaultValue={defaultMuscle}>
                <option value={defaultMuscle}>{defaultMuscle}</option>
            </select>
        )
    } else {
        return (
            <select defaultValue={defaultMuscle}>
                <option value={defaultMuscle}>{defaultMuscle}</option>
                {
                    Object.entries(targetMuscles).map(([muscle, exercises]) => (
                        <option key={muscle}>{muscle}</option>
                    ))
                }
            </select>
        )
    }
}