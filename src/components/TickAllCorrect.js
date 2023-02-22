import React from 'react'
import Header from './Header';
import tickBlack from '../assets/img/tick-black.svg';
import tickGreen from '../assets/img/tick-green.svg';
import { useState, useEffect } from "react";

function TickAllCorrect() {
    const [interactionLocked, setInteractionLocked] = useState(false);
    const [score, setScore] = useState(null);
    const [statementsRandomized] = useState(true);
    const [mandatoryStatementsToSelect] = useState(4);
    const [interactionResult, setInteractionResult] = useState(null);
    const [remainingAttempts, setRemainingAttempts] = useState(2);
    const [statements, setStatements] = useState(["Paris is the capital of France", "London is the capital of Wales", "Birmingham is the capital of Scotland", "Madrid is the capital of Spain", "Washington is the capital of Brazil", "Dallas is the capital of Northern Ireland", "Lisbon is the capital of Portugal", "Moscow is the capital of Russia"]);
    const [correctStatements] = useState(["Paris is the capital of France", "Madrid is the capital of Spain", "Lisbon is the capital of Portugal", "Moscow is the capital of Russia"]);
    const [selectedStatements, setSelectedStatements] = useState([]);
    const [submittedStatements, setSubmittedStatements] = useState([]);
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
    // so it is used for randomising the statements at the beginning if statementsRandomized is set to true
    useEffect(() => {
        const newStatements = [...statements];
        if(statementsRandomized){
            newStatements.map((statement) => {
                return {...statement};
            })
            shuffle(newStatements);
        } 
        setStatements(newStatements);
      }, []);

    useEffect(function(){
        if(score !== null){
            markInteraction(score, remainingAttempts);
        }

    }, [score, remainingAttempts ])

    const handleStatementClick = (statement) => {
        if (interactionLocked) return;
        const newSelectedStatements = [...selectedStatements];
        const itemIndex = newSelectedStatements.indexOf((statement));
        const currentlySelected = selectedStatements.length;        

        if(itemIndex > -1){
            newSelectedStatements.splice(itemIndex, 1);
        }else {
            if(currentlySelected > 3) return;
            newSelectedStatements.push(statement);
        }
        setSelectedStatements(newSelectedStatements);
    }

    const handleStatementsSubmit = () => {
        let newSubmittedStatements = [...submittedStatements];

        newSubmittedStatements = selectedStatements;
        console.log(newSubmittedStatements);
        const correctFiltered = newSubmittedStatements.filter(statement => correctStatements.indexOf(statement) > -1);
        console.log("the filter is"+correctFiltered);
        const score = correctFiltered.length / correctStatements.length * 100;

        setSubmittedStatements(newSubmittedStatements);
        setSelectedStatements([]);
        setInteractionLocked(true);
        setRemainingAttempts(remainingAttempts - 1);
        setScore(Math.max(0, score));
    }

    const markInteraction = (score, remainingAttempts) => {
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
        setSubmittedStatements([]);
    }

    const completeInteraction = (score) => {
        if(score === 100){
            setInteractionResult("correct");
        }else {
            setInteractionResult("incorrect");
        }
    }

    const mandatoryStatementsSelected = () => {
        if (selectedStatements.length === mandatoryStatementsToSelect) {
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

    const statementTickBlackClassname = (statement) => {
        if (selectedStatements.indexOf(statement) > -1) {
            return "";
        }
        return "hidden"
    }

    const statementTickGreenClassname = (statement) => {
        if (submittedStatements.indexOf(statement) > -1 && correctStatements.indexOf(statement) > -1) {
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
        const correctStatementClassname = (statement) => correctStatements.includes(statement) ? "correct " : "";
        const selectedStatementClassname = (statement) => selectedStatements.indexOf(statement) > -1 ? "selected " : "";
        const submittedStatementClassname = (statement) => submittedStatements.indexOf(statement) > -1 ? "submitted " : "";


        return statements.map((statement, index) => (
            <div key={index} 
                className={`flex items-center w-96 mb-4 
                ${correctStatementClassname(statement)} 
                ${selectedStatementClassname(statement)} 
                ${submittedStatementClassname(statement)}
            `}>
                <button onClick={() => {handleStatementClick(statement)}} className="tick-all-correct__option h-8 w-8 border-black border-2">
                    <img className={`${statementTickBlackClassname(statement)}`} src={tickBlack} alt="" />
                    <img className={`${statementTickGreenClassname(statement)}`} src={tickGreen} alt="" />
                </button>
                <p onClick={() => {handleStatementClick(statement)}} className="w-80 bg-slate-400 rounded-lg p-3 ml-3 cursor-pointer tick-all-correct__option">{statement}</p>
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
                  className='bg-slate-400 rounded-lg p-2 mb-3'>{feedbackItem.buttonText}
               </button>
               <h3 className={`text-xl font-bold ${feedbackItem.outcome === "correct" ? "text-green-600" : "text-red-600"}`}>{feedbackItem.text}</h3>
               <p>{feedbackItem.subText}</p>
            </div>
        ))
    }

    return (
        <div>
            <Header title="Tick All Correct" />
            
            <div className="bg-slate-300">
                <div className="container mx-auto text-center bg-slate-300 pb-2">
                    <h2>Learner Score: <span className='font-bold'>{score}</span>/100</h2>
                    <h2>Attempts Remaining: <span className='font-bold'>{remainingAttempts}</span></h2>
                    <h2 className='mb-5'>Mandatory to select: <span className='font-bold'>{mandatoryStatementsToSelect}</span></h2>
                    <p>The quiz is set to need 100% to pass.</p>
                    <p className="mb-5">Continue button is just for demonstrating interaction is complete.</p>
                </div>
            </div>
            <div className={`tick-all-correct container mx-auto flex flex-col items-center w-2/3 text-center py-5 ${interactionLocked ? "locked" : ""}`}>
                {renderQuestions()}
                <button
                    onClick={handleStatementsSubmit}
                    className={`bg-slate-400 rounded-lg p-2 w-1/5 ${mandatoryStatementsSelected()}`}
                >
                    Submit
                </button>

                {renderFeedback()}
            </div>
        </div>
    )
}

export default TickAllCorrect;