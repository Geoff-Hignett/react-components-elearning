import React from "react";
import Nouislider from "nouislider-react";
import Header from './Header';
import { useState, useEffect } from "react";
import tickGreen from '../assets/img/tick-green.svg';
import crossRed from '../assets/img/cross-red.svg';
import "nouislider/distribute/nouislider.css";

function Sliders() {
    const [interactionLocked, setInteractionLocked] = useState(false);
    const [score, setScore] = useState(null);
    const [questionsRandomized] = useState(true);
    const [interactionResult, setInteractionResult] = useState(null);
    const [remainingAttempts, setRemainingAttempts] = useState(2);
    const [randomizedSliderQuestions, setRandomizedSliderQuestions] = useState([]);
    const [sliderQuestions, setSliderQuestions] = useState([
        {
            id: 0,
            questionText: "What is 3 + 5?",
            selectedAnswer: 5,
            submittedAnswer: null,
            correctAnswer: 8,
        },
        {
            id: 1,
            questionText: "What is 2 - 1?",
            selectedAnswer: 5,
            submittedAnswer: null,
            correctAnswer: 1,
        },
        {
            id: 2,
            questionText: "What is 9 - 4?",
            selectedAnswer: 5,
            submittedAnswer: null,
            correctAnswer: 5,
        },
        {
            id: 3,
            questionText: "What is 1 + 5?",
            selectedAnswer: 5,
            submittedAnswer: null,
            correctAnswer: 6,
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

    // this useEffect hook with an empty array as the second argument runs once on the first render and never again
    // so it is used for randomising the statements at the beginning if questionsRandomized is set to true
    useEffect(function(){
        const newSliderQuestions = [...sliderQuestions];
        if(questionsRandomized){
            newSliderQuestions.map((question) => {
                return {...question};
            })
            shuffle(newSliderQuestions);
            newSliderQuestions.map((question, index) => {
                question.id = index;
            })
            setRandomizedSliderQuestions(newSliderQuestions);
        }else {
            setSliderQuestions(newSliderQuestions);
        }
    }, [])

    useEffect(function(){
        if(score !== null){
            markInteraction(score, remainingAttempts);
        }

    }, [score, remainingAttempts ])

    const markInteraction = () => {
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

    const completeInteraction = (score) => {
        console.log("completing interaction with score of "+score);
        if(score === 100){
            setInteractionResult("correct");
        }else {
            setInteractionResult("incorrect");
        }
    }

    const resetInteraction = () => {
        setInteractionResult(null);
        setInteractionLocked(false);
        setScore(null);
        setSliderQuestions([...sliderQuestions.map((question) => {
            question.submittedAnswer = null;
            question.selectedAnswer = 5;
            return question;
        })]);
    }

    const updateSliderValue = (range, index) => {
        console.log("doing updateslider");
        if (interactionLocked) return;
        const rounded = Math.trunc(range);
        const newSliderQuestions = [ ...sliderQuestions ];

        newSliderQuestions.find((question) => question.id === index).selectedAnswer = rounded;
        setSliderQuestions(newSliderQuestions);
    }

    const updateRandomizedSliderValue = (range, index) => {
        console.log("doing updaterandomizedslider");
        if (interactionLocked) return;
        const rounded = Math.trunc(range);
        const newRandomizedSliderQuestions = [ ...randomizedSliderQuestions ];

        newRandomizedSliderQuestions.find((question) => question.id === index).selectedAnswer = rounded;
        setRandomizedSliderQuestions(newRandomizedSliderQuestions);
    }

    const handleSlidersSubmit = () => {
        setSliderQuestions([...sliderQuestions.map((question) => {
            question.submittedAnswer = question.selectedAnswer;
            question.selectedAnswer = null;
            return question;
        })]);
        setInteractionLocked(true);

        const correctScorePercentage = sliderQuestions.filter(question => question.correctAnswer === question.submittedAnswer).length / sliderQuestions.length * 100;
        setScore(correctScorePercentage);
        setInteractionLocked(true);
        setRemainingAttempts(remainingAttempts - 1);
    }
    
    const interactionLockedClassname = () => {
        if (!interactionLocked) {
            return "";
        }
        return "locked"
    }
    
    const interactionLockedSubmitClassname = () => {
        if (!interactionLocked) {
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

    const questionCorrectClassname = (question) => {
        if (question.correctAnswer === question.submittedAnswer) {
            return "";
        }
        return "hidden"
    }

    const questionIncorrectClassname = (question) => {
        if (interactionLocked && question.correctAnswer !== question.submittedAnswer) {
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

    const renderSliders = () => {
        if(questionsRandomized){
            return randomizedSliderQuestions.map((question, index) =>(
                <div className="mb-14" key={index}>
                    <div className="flex items-center mb-2">
                        <p className="mr-5">{question.questionText}</p>
                        <img className={`w-5 ${questionCorrectClassname(question)}`} src={tickGreen} alt="" />
                        <img className={`w-5 ${questionIncorrectClassname(question)}`} src={crossRed} alt="" />
                    </div>
                    <Nouislider range={{ min: 0, max: 10 }} 
                        start={[randomizedSliderQuestions[index].selectedAnswer]} 
                        step={1} 
                        connect={[true, false]} 
                        pips={{mode: "positions", density: 100, values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}}
                        onChange={(range)=>updateRandomizedSliderValue(range, index)}
                        id={index}
                    />
                </div>
        ))
        }else {

            return sliderQuestions.map((question, index) =>(
                <div className="mb-14" key={index}>
                <p className="mb-2">{question.questionText}</p>
                <Nouislider range={{ min: 0, max: 10 }} 
                    start={[sliderQuestions[index].selectedAnswer]} 
                    step={1} 
                    connect={[true, false]} 
                    pips={{mode: "positions", density: 100, values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}}
                    onChange={(range)=>updateSliderValue(range, index)}
                    id={index}
                />
            </div>
        ))
      }
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
            <Header title="Sliders" />
            <div className="bg-slate-300">
                <div className="container mx-auto text-center bg-slate-300 pb-2">
                    <p>These sliders use local component state as they don't need to share state across the project.</p>
                    <p className="mb-5">Continue button is just for demonstrating interaction is complete.</p>
                    <h2>Learner Score: <span className="font-bold">{score}</span>/100</h2>
                    <h2>Attempts Remaining: <span className="font-bold">{remainingAttempts}</span></h2>
                </div>
            </div>
            <div className={`sliders-interaction container mx-auto w-1/3 my-5 ${interactionLockedClassname()}`}>
                {renderSliders()}
                <div className="text-center">
                    <button
                        onClick={handleSlidersSubmit}
                        className={`bg-slate-400 rounded-lg p-2 w-1/5 ${interactionLockedSubmitClassname()}`}>
                        Submit
                    </button>
                </div>
                <div className="text-center">
                    {renderFeedback()}
                </div>
            </div>
        </div>
    )
}

export default Sliders