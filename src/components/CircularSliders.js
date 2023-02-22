import React from 'react';
import CircularSlider from '@fseehawer/react-circular-slider';
import Header from './Header';
import { useState, useEffect } from "react";

const CircularSliders = () => {
    const [interactionLocked, setInteractionLocked] = useState(false);
    const [score, setScore] = useState(null);
    const [interactionResult, setInteractionResult] = useState(null);
    const [remainingAttempts, setRemainingAttempts] = useState(2);
    const [sliderQuestions, setSliderQuestions] = useState([
        {
            id: 0,
            questionText: "What is 3/4 as a percentage?",
            selectedAnswer: 50,
            submittedAnswer: null,
            correctAnswer: 8,
        },
        {
            id: 1,
            questionText: "What is 1/2 as a percentage?",
            selectedAnswer: 50,
            submittedAnswer: null,
            correctAnswer: 1,
        },
        {
            id: 2,
            questionText: "What is 1/4 as a percentage?",
            selectedAnswer: 50,
            submittedAnswer: null,
            correctAnswer: 5,
        },

    ]);
    const [feedback] = useState([
        {
            id: 1,
            outcome: "correct",
            buttonText: "Continue",
            text: "Well Done!",
            subText: "You got everything correct",
        },
        {
            id: 2,
            outcome: "incorrect",
            buttonText: "Continue",
            text: "Not Quite!",
            subText: "You were so close",
        },
        {
            id: 3,
            outcome: "repeat",
            buttonText: "Retry",
            text: "Try Again!",
            subText: "Have another go",
        },
    ]);

    const renderCircularSliders = () => {
        return sliderQuestions.map((question, index) => (
            <CircularSlider
            width="180"
            label="PERCENTAGE"
            min={0}
            max={100}
            dataIndex={50}
            appendToValue="%"
            onChange={ value => { console.log(value); } }
            />
        ))
    }

    return (
        <div>
            <Header title="Circular Sliders" />
            <div className="bg-slate-300">
                <div className="container mx-auto text-center bg-slate-300 pb-2">
                    <p>These sliders use local component state as they don't need to share state across the project.</p>
                    <p className="mb-5">Continue button is just for demonstrating interaction is complete.</p>
                    <h2>Learner Score: <span className="font-bold">{score}</span>/100</h2>
                    <h2>Attempts Remaining: <span className="font-bold">{}</span></h2>
                </div>
            </div>
            <div className="container mx-auto flex justify-between w-1/2 py-10">
                {renderCircularSliders()}
            </div>
            </div>
    )
};

export default CircularSliders;