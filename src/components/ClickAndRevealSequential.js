import React from 'react'
import Header from './Header';
import { useState, useEffect } from "react";

 function ClickAndRevealSequential() {
    const [interactionComplete, setInteractionComplete] = useState(false);
    const [clickAndRevealItems, setClickAndRevealItems] = useState([
        {
            id: 1,
            clickText: "First Click",
            revealText: "This is the revealed content for the first click and reveal item.",
            itemCurrentlyRevealed: false,
            itemHasRevealed: false,
            clickable: true
        },
        {
            id: 2,
            clickText: "Second Click",
            revealText: "This is the revealed content for the second click and reveal item.",
            itemCurrentlyRevealed: false,
            itemHasRevealed: false,
            clickable: false
        },
        {
            id: 3,
            clickText: "Third Click",
            revealText: "This is the revealed content for the third click and reveal item.",
            itemCurrentlyRevealed: false,
            itemHasRevealed: false,
            clickable: false
        }
    ]);

    useEffect(function(){
        const remainingUnrevealed = clickAndRevealItems.filter(item => !item.itemHasRevealed).length;
        if(remainingUnrevealed < 1){
            setInteractionComplete(true);
        }

    }, [clickAndRevealItems ])

    const handleItemRevealed = (index) => {
        if(!clickAndRevealItems[index].clickable) return; 
        const newClickAndRevealItems = [ ...clickAndRevealItems ];
        const itemToReveal = newClickAndRevealItems.find((item) => item.id === index + 1);
        const nextItem = newClickAndRevealItems.find((item) => item.id === index + 2);

        itemToReveal.itemCurrentlyRevealed = true;
        if(!itemToReveal.itemHasRevealed){
            itemToReveal.itemHasRevealed = true;
            itemToReveal.clickable = false;
        }

        if(nextItem !== undefined){
            nextItem.clickable = true;
        }

        setClickAndRevealItems(newClickAndRevealItems);
    }

    const itemCompletedClassname = (item) => {
        if (item.itemHasRevealed) {
            return "completed";
        }
        return ""
    }

    const itemDisabledClassname = (item) => {
        if (item.clickable) {
            return "";
        }
        return "disabled"
    }

    const itemColorClassname = (item) => {
        if (item.itemHasRevealed) {
            return "bg-yellow-400";
        }
        return "bg-white"
    }

    const revealedContentClassname = (item) => {
        if (item.itemCurrentlyRevealed) {
            return "";
        }
        return "invisible"
    }

    const submitButtonClassname = () => {
        if (interactionComplete) {
            return "";
        }
        return "hidden"
    }

    const renderClickAndRevealItems = () => {
        return clickAndRevealItems.map((item, index) => 
            <div key={index}>
                <button onClick={() => handleItemRevealed(index)} 
                className={`p-4 rounded-lg w-2/3 mx-auto 
                ${itemDisabledClassname(item)} 
                ${itemCompletedClassname(item)} 
                ${itemColorClassname(item)}`}>
                {item.clickText}</button>
                <div className={`p-10 ${revealedContentClassname(item)}`}>
                    <p>{item.revealText}</p>    
                </div>
            </div>
        )
    }

    return (
        <div>
            <Header title="Click And Reveal" />
            <div className="bg-slate-300">
                <div className="container mx-auto w-1/2 text-center bg-slate-300 pb-2">
                    <p>Learner has to reveal content in order.</p>
                    <p className='mb-6'>Continue button is just for demonstrating interaction is complete.</p>
                    <div className="flex">
                        {renderClickAndRevealItems()}
                    </div>
                    <button className={`bg-slate-400 rounded-lg p-2 w-1/5 mb-3 ${submitButtonClassname()}`}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default ClickAndRevealSequential
