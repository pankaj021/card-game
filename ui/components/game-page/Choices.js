import React, { useState } from 'react';
import Select from '../lib/Select';

export default function Choices({disabled, onChange}) {
    const [choice, resetChoice] = useState(false);
    const onChangeHandler = (e, choice) => {
        if(e.target.checked){
            onChange(choice);
            resetChoice(choice);
        } else {
            resetChoice(false);
        }
    }
    if(disabled) return <h4>Wait for your turn....</h4>
    return (
        <div className="choice-list">
            <div className="choice-set">
                <div className="choice-wrp">
                    <Select
                        checked={choice && choice === "red"}
                        label="red" 
                        onChange={e => onChangeHandler(e, "red")}
                    />
                </div>
                <div className="choice-wrp">
                    <Select
                        checked={choice && choice === "black"}
                        label="black" 
                        onChange={e => onChangeHandler(e, "black")}
                    />
                </div>
                <div className="choice-wrp">
                    <Select
                        checked={choice && choice === "random"}
                        label="random" 
                        onChange={e => onChangeHandler(e, "random")}
                    />
                </div>
            </div>
            <div className="choice-set">
                <div className="choice-wrp">
                    <img src="/icons/hearts.svg"/>
                    <Select
                        checked={choice && choice === "1"}
                        onChange={(e) => onChangeHandler(e, "1")}
                    />
                </div>
                <div className="choice-wrp">
                    <img src="/icons/diamonds.svg"/>
                    <Select
                        checked={choice && choice === "2"}
                        onChange={(e) => onChangeHandler(e, "2")}
                    />
                </div>
                <div className="choice-wrp">
                    <img src="/icons/clubs.svg"/>
                    <Select
                        checked={choice && choice === "3"}
                        onChange={(e) => onChangeHandler(e, "3")}
                    />
                </div>
                <div className="choice-wrp">
                    <img src="/icons/spades.svg"/>
                    <Select
                        checked={choice && choice === "4"} 
                        onChange={(e) => onChangeHandler(e, "4")}
                    />
                </div>
            </div>
        </div>
    )
}