import React from "react";
import Nouislider from "nouislider-react";
import Header from './Header';
import { useState } from "react";
import "nouislider/distribute/nouislider.css";
import { useContext } from "react";
import AppContext from "../AppContext";
import { Link } from "react-router-dom";

function SlidersGlobalBefore() {
    const { startConfidenceLevels, updateStartConfidenceLevels } = useContext(AppContext);
    const [interactionComplete, setInteractionComplete] = useState(false);
    const [sliderStatements, setSliderStatements] = useState([
        {
            id: 0,
            questionText: "I feel confident about topic 1",
            selectedAnswer: 5,
        },
        {
            id: 1,
            questionText: "I feel confident about topic 2",
            selectedAnswer: 5,
        },
        {
            id: 2,
            questionText: "I feel confident about topic 3",
            selectedAnswer: 5,
        },
    ]);

    const updateSliderValue = (range, index) => {
        if (interactionComplete) return;
        const rounded = Math.trunc(range);
        const newSliderStatements = [ ...sliderStatements ];

        newSliderStatements.find((question) => question.id === index).selectedAnswer = rounded;
        setSliderStatements(newSliderStatements);
    }

    const handleSlidersSubmit = () => {
        console.log("sldfkj");
        const updatedValues = [];
        for(let i = 0; i < sliderStatements.length; i ++){
            updatedValues.push(sliderStatements[i].selectedAnswer);
        }

        updateStartConfidenceLevels(updatedValues);
        setInteractionComplete(true);
    }
    
    const interactionCompleteClassname = () => {
        if (!interactionComplete) {
            return "";
        }
        return "locked"
    }
    
    const interactionCompleteSubmitClassname = () => {
        if (!interactionComplete) {
            return "";
        }
        return "hidden"
    }
    
    const interactionCompleteContinueClassname = () => {
        if (!interactionComplete) {
            return "hidden";
        }
        return ""
    }

    const renderSliders = () => {

        return sliderStatements.map((question, index) => (
            <div className="mb-14" key={index}>
                <p className="mb-2">{question.questionText}</p>
                <Nouislider range={{ min: 0, max: 10 }} 
                    start={startConfidenceLevels[index]} 
                    step={1} 
                    connect={[true, false]} 
                    pips={{mode: "positions", density: 100, values: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}}
                    onChange={(range)=>updateSliderValue(range, index)}
                    id={index}
                />
            </div>
        ))
    }

    return (
        <div>
            <Header title="Sliders Global Before" description="These sliders update app-wide state using React Context API (AppContext.js). This demo sends you to the SlidersGlobalAfter component if you click 'Continue'." />
            <div className="bg-slate-300">
                <div className="container mx-auto text-center bg-slate-300 pb-2"></div>
            </div>
            <div className={`sliders-interaction container mx-auto w-1/3 my-5 ${interactionCompleteClassname()}`}>
                {renderSliders()}
                <div className="text-center">
                    <button
                        onClick={handleSlidersSubmit}
                        className={`bg-slate-400 rounded-lg p-2 w-1/5 ${interactionCompleteSubmitClassname()}`}>
                        Submit
                    </button>
                    <Link className={`bg-slate-400 rounded-lg p-2 w-1/5 ${interactionCompleteContinueClassname()}`} to="/sliders-global-after">Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default SlidersGlobalBefore