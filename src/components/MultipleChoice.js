import React from 'react'
import Header from './Header';
import { useState } from "react";

// const MultipleChoiceData = {
//     questions: [
//         {
//             id: 1,
//             questionText: "What is the capital of France?",
//             options: ["London", "Paris", "Rome", "Lisbon"],
//             correctOption: "Paris",
//             selectedOption: "",
//         },
//         {
//             id: 2,
//             questionText: "What is the capital of Spain?",
//             options: ["Oslo", "Cardiff", "Madrid", "Dublin"],
//             correctOption: "Madrid",
//             selectedOption: "",
//         },
//         {
//             id: 3,
//             questionText: "What is the capital of Portugal?",
//             options: ["Caracus", "Paris", "Cardiff", "Lisbon"],
//             correctOption: "Lisbon",
//             selectedOption: "",
//         },
//         {
//             id: 4,
//             questionText: "What is the capital of Italy?",
//             options: ["London", "Rome", "Madrid", "Prague"],
//             correctOption: "Rome",
//             selectedOption: "",
//         },
//         {
//             id: 5,
//             questionText: "What is the capital of Wales?",
//             options: ["Bogota", "Paris", "Cardiff", "Rome"],
//             correctOption: "Cardiff",
//             selectedOption: "",
//         }
//     ]
// }

function MultipleChoice() {
    const [multipleChoiceData, setMultipleChoiceData] = useState({
        test: "hello",
        questions: [
            {
                id: 1,
                questionText: "What is the capital of France?",
                options: ["London", "Paris", "Rome", "Lisbon"],
                correctOption: "Paris",
                selectedOption: "",
            },
            {
                id: 2,
                questionText: "What is the capital of Spain?",
                options: ["Oslo", "Cardiff", "Madrid", "Dublin"],
                correctOption: "Madrid",
                selectedOption: "",
            },
            {
                id: 3,
                questionText: "What is the capital of Portugal?",
                options: ["Caracus", "Paris", "Cardiff", "Lisbon"],
                correctOption: "Lisbon",
                selectedOption: "",
            },
            {
                id: 4,
                questionText: "What is the capital of Italy?",
                options: ["London", "Rome", "Madrid", "Prague"],
                correctOption: "Rome",
                selectedOption: "",
            },
            {
                id: 5,
                questionText: "What is the capital of Wales?",
                options: ["Bogota", "Paris", "Cardiff", "Rome"],
                correctOption: "Cardiff",
                selectedOption: "",
            }
        ]
    });

    const handleOptionClick = (questionElement, option) => {
        console.log(multipleChoiceData);
        console.log(questionElement);
        console.log("question id is "+questionElement.id);
        console.log("option is "+option);

        const questions = multipleChoiceData.questions;
        const questionAnswered = questions.filter(question => question.id === questionElement.id);

        console.log(questions);
        console.log(questionAnswered);
        
        setMultipleChoiceData(existingValues => ({
            ...existingValues,
            questions[0].selectedOption: "test",
        }))
        
    }

    return (
        <div>
            <Header title="Multiple Choice" />

            <div className="container mx-auto w-2/3 text-center py-5">
                {multipleChoiceData.questions.map((question, index) => (
                    <div key={index} className="mb-8">
                        <p className="p-3 bg-slate-400 rounded-lg">{question.questionText}</p>
                        <div className="flex justify-between my-2">
                            {question.options.map((option, optionIndex) => (
                                <button onClick={() => handleOptionClick(question, option)} key={optionIndex} className="bg-slate-200 rounded-lg p-2 w-1/5">{option}</button>
                            ))}
                        </div>
                    </div>
                    
                ))}
            </div>
        </div>
    )
}

export default MultipleChoice;