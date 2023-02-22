import React from 'react'
import Header from './Header';
import { useState, useEffect } from "react";

function MultipleChoice() {
    const [interactionLocked, setInteractionLocked] = useState(false);
    const [score, setScore] = useState(null);
    const [questionsRandomized] = useState(true);
    const [answersRandomized] = useState(true);
    const [interactionResult, setInteractionResult] = useState(null);
    const [remainingAttempts, setRemainingAttempts] = useState(2);
    const [quizQuestions, setQuizQuestions] = useState([
        {
            id: 1,
            questionText: "What is the capital of France?",
            options: ["London", "Paris", "Rome", "Lisbon"],
            correctOption: "Paris",
            selectedOption: null,
            submittedOption: null,
        },
        {
            id: 2,
            questionText: "What is the capital of Spain?",
            options: ["Oslo", "Cardiff", "Madrid", "Dublin"],
            correctOption: "Madrid",
            selectedOption: null,
            submittedOption: null,
        },
        {
            id: 3,
            questionText: "What is the capital of Portugal?",
            options: ["Caracus", "Paris", "Cardiff", "Lisbon"],
            correctOption: "Lisbon",
            selectedOption: null,
            submittedOption: null,
        },
        {
            id: 4,
            questionText: "What is the capital of Italy?",
            options: ["London", "Rome", "Madrid", "Prague"],
            correctOption: "Rome",
            selectedOption: null,
            submittedOption: null,
        },
        {
            id: 5,
            questionText: "What is the capital of Wales?",
            options: ["Bogota", "Paris", "Cardiff", "Rome"],
            correctOption: "Cardiff",
            selectedOption: null,
            submittedOption: null,
        }
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

    // this useEffect hook with an empty array as the second argument runs once on the first render and never again
    // so it is used for randomising the statements at the beginning if questions/answersRandomized is set to true
    useEffect(function(){          
        const newQuizQuestions = [...quizQuestions];
        if(questionsRandomized){
            newQuizQuestions.map((question) => {
                return {...question};
            })
            shuffle(newQuizQuestions);
        } 
        if(answersRandomized){
            newQuizQuestions.map((question) => {
                const newQuestion = {...question};
                shuffle(newQuestion.options);
                return newQuestion;
            })
        } 
        setQuizQuestions(newQuizQuestions);
    }, [])

    useEffect(function(){
        if(score !== null){
            markInteraction(score, remainingAttempts);
        }

    }, [score, remainingAttempts ])


    const handleOptionClick = (questionElement, option) => {
        if (interactionLocked) return;

        const newQuizQuestions = [ ...quizQuestions ];
        newQuizQuestions.find((question) => question.id === questionElement.id).selectedOption = option;
        console.log(quizQuestions);
        setQuizQuestions(newQuizQuestions);
        console.log(quizQuestions);
    }

    const handleAnswersSubmit = () => {
        setQuizQuestions([...quizQuestions.map((question) => {
            question.submittedOption = question.selectedOption;
            question.selectedOption = null;
            return question;
        })]);
        
        const correctScorePercentage = quizQuestions.filter(question => question.correctOption === question.submittedOption).length / quizQuestions.length * 100;
        setScore(correctScorePercentage);
        setInteractionLocked(true);

        setRemainingAttempts(remainingAttempts - 1);
    }

    const markInteraction = (score, remainingAttempts) => {
        console.log("marking interaction with score of "+score+" and remaining attempts of "+remainingAttempts);
        if(score === 100 || remainingAttempts === 0){
            completeInteraction(score);
        }else{
            promptRepeatInteraction();
        }
    }

    const promptRepeatInteraction = () => {
        setInteractionResult("repeat");
    }

    const resetInteraction = () => {
        setInteractionResult(null);
        setInteractionLocked(false);
        setScore(null);
        setQuizQuestions([...quizQuestions.map((question) => {
            question.submittedOption = null;
            return question;
        })]);
    }

    const completeInteraction = (score) => {
        console.log("completing interaction with score of "+score);
        if(score === 100){
            setInteractionResult("correct");
        }else {
            setInteractionResult("incorrect");
        }
    }

    const allQuestionsAnsweredClassname = () => {
        if (quizQuestions.filter(question => question.selectedOption !== null).length === quizQuestions.length) {
            return "";
        }
        return "hidden"
    }

    const feedbackCorrectClassname = (outcome) => {
        if (interactionResult === "correct" || outcome !== "correct") {
            return "";
        }
        return "hidden"
    }

    const feedbackIncorrectClassname = (outcome) => {
        if (interactionResult === "incorrect" || outcome !== "incorrect") {
            return "";
        }
        return "hidden"
    }

    const feedbackTryAgainClassname = (outcome) => {
        if (interactionResult === "repeat" || outcome !== "repeat") {
            return "";
        }
        return "hidden"
    }

    const shuffle = (array) => {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex !== 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    const renderQuestions = () => {
        const correctAnswerClassname = (question, optionIndex) => question.correctOption === optionIndex ? "correct " : "";
        const classOptionSelected = (question, optionId) => question.selectedOption === null || optionId !== question.selectedOption ? "" : "selected ";
        const classOptionSubmitted = (question, optionId) => question.submittedOption === null || optionId !== question.submittedOption ? "" : "submitted ";

        return quizQuestions.map((question, index) => (
            <div key={index} className="mb-8">
                <p className="p-3 bg-slate-400 rounded-lg">{question.questionText}</p>
                <div className="flex justify-between my-2">
                    {question.options.map((option, optionIndex) => (
                        <button onClick={() => handleOptionClick(question, option)}
                        key={optionIndex}
                        className={`multiple-choice__option bg-slate-200 rounded-lg p-2 w-1/5
                        ${correctAnswerClassname(question, option)}
                        ${classOptionSelected(question, option)}
                        ${classOptionSubmitted(question, option)}
                        `}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        ))
    }

    const renderFeedback = () => {
        return feedback.map((feedbackItem, index) => (
            <div key={index} 
                 className={`${feedbackTryAgainClassname(feedbackItem.outcome)} 
                 ${feedbackCorrectClassname(feedbackItem.outcome)} 
                 ${feedbackIncorrectClassname(feedbackItem.outcome)}
                 `}>
               <button 
                  onClick={feedbackItem.outcome === "repeat" ? resetInteraction : null} 
                  className='bg-slate-400 rounded-lg p-2 w-1/5 mb-3'>{feedbackItem.buttonText}
               </button>
               <h3 className={`text-xl font-bold ${feedbackItem.outcome === "correct" ? "text-green-600" : "text-red-600"}`}>{feedbackItem.text}</h3>
               <p>{feedbackItem.subText}</p>
            </div>
        ))
    }

    return (
        <div>
            <Header title="Multiple Choice" />
            
            <div className="bg-slate-300">
                <div className="container mx-auto text-center bg-slate-300 pb-2">
                    <h2>Learner Score: <span className='font-bold'>{score}</span>/100</h2>
                    <h2 className='mb-5'>Attempts Remaining: <span className='font-bold'>{remainingAttempts}</span></h2>
                    <p>The quiz is set to need 100% to pass.</p>
                    <p className="mb-5">Continue button is just for demonstrating interaction is complete.</p>
                </div>
            </div>
            <div className={`multiple-choice container mx-auto w-2/3 text-center py-5 ${interactionLocked ? "locked" : ""}`}>
                {renderQuestions()}
                <button
                    onClick={handleAnswersSubmit}
                    className={`bg-slate-400 rounded-lg p-2 w-1/5 ${allQuestionsAnsweredClassname()}`}
                >
                    Submit
                </button>

                {renderFeedback()}
            </div>
        </div>
    )
}

export default MultipleChoice;