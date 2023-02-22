import React from 'react'
import Header from './Header';
import { useState, useEffect } from "react";

 function ClickAndReveal() {
    const [interactionComplete, setInteractionComplete] = useState(false);
    const [exclusiveReveal] = useState(true);
    const [clickAndRevealItems, setClickAndRevealItems] = useState([
        {
            id: 1,
            clickText: "First Click",
            revealText: "This is the revealed content for the first click and reveal item.",
            itemCurrentlyRevealed: false,
            itemHasRevealed: false
        },
        {
            id: 2,
            clickText: "Second Click",
            revealText: "This is the revealed content for the second click and reveal item.",
            itemCurrentlyRevealed: false,
            itemHasRevealed: false
        },
        {
            id: 3,
            clickText: "Third Click",
            revealText: "This is the revealed content for the third click and reveal item.",
            itemCurrentlyRevealed: false,
            itemHasRevealed: false
        }
    ]);

    useEffect(function(){
        const remainingUnrevealed = clickAndRevealItems.filter(item => !item.itemHasRevealed).length;
        console.log(remainingUnrevealed);
        if(remainingUnrevealed < 1){
            setInteractionComplete(true);
        }

    }, [clickAndRevealItems ])

    const handleItemRevealed = (index) => {
        if(exclusiveReveal){
            setClickAndRevealItems([...clickAndRevealItems.map((item) => {
                item.itemCurrentlyRevealed = false;
                if(item.id === index){
                    item.itemCurrentlyRevealed = true;
                    if(!item.itemHasRevealed){
                        item.itemHasRevealed = true;
                    }
                }
                return item;
            })]);
        }else {
            const newClickAndRevealItems = [ ...clickAndRevealItems ];
            const itemToReveal = newClickAndRevealItems.find((item) => item.id === index);

            itemToReveal.itemCurrentlyRevealed = true;
            if(!itemToReveal.itemHasRevealed){
                itemToReveal.itemHasRevealed = true;
            }

            setClickAndRevealItems(newClickAndRevealItems);
        }
    }

    const itemCursorClassname = (item) => {
        if (item.itemCurrentlyRevealed) {
            return "cursor-auto";
        }
        return ""
    }

    const itemColorClassname = (item) => {
        if (item.itemCurrentlyRevealed) {
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
                <button onClick={() => handleItemRevealed(index + 1)} 
                className={`p-4 rounded-lg w-2/3 mx-auto 
                ${itemCursorClassname(item)} 
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
                    <p>Learner can reveal content in any order.</p>
                    <p>Continue button is just for demonstrating interaction is complete.</p>
                    <p class="mb-8">Exclusive reveal (where reveal hides siblings) is set to: <span className="font-bold">{String(exclusiveReveal)}</span></p>
                    <div className="flex">
                        {renderClickAndRevealItems()}
                    </div>
                    <button className={`bg-slate-400 rounded-lg p-2 w-1/5 mb-3 ${submitButtonClassname()}`}>Continue</button>
                </div>
            </div>
        </div>
    )
}

export default ClickAndReveal
