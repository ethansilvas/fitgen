'use client'
import React, { useEffect, useState } from "react";

export default function Test() {
    useEffect(() => {
        fetch('http://localhost:8080/api/generate').then(
            response => response.json()
        ).then((data) => {
            console.log(data);
        });
    }, []);

    return (
        <div>tester</div>
    );
}