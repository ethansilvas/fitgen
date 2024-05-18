import { useEffect, useState } from "react";

interface TargetMuscleProps {
    defaultMuscle: string;
    onMuscleChange: (muscle: []) => void;
}

export default function TargetMuscle({ defaultMuscle, onMuscleChange }: TargetMuscleProps) {
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

    const handleChange = (e) => {
        console.log(targetMuscles[e.target.value])
        onMuscleChange(targetMuscles[e.target.value])
    }

    if (isLoading) {
        return (
            <select defaultValue={defaultMuscle}>
                <option value={defaultMuscle}>{defaultMuscle}</option>
            </select>
        )
    } else {
        return (
            <select defaultValue={defaultMuscle} onChange={handleChange}>
                <option value={defaultMuscle}>{defaultMuscle}</option>
                {
                    Object.entries(targetMuscles).map(([muscle, exercises]) => (
                        muscle != defaultMuscle ? <option key={muscle}>{muscle}</option> : null
                    ))
                }
            </select>
        )
    }
}