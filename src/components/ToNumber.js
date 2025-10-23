import React, { useState } from 'react'

const ToNumber = () => {
    
    const [input, setInput] = useState('')
    const [result, setResult] = useState('')

    function calcNumber(number) {
        let z = null;
        let flipped = false;

        let temp = String(number);
        if (temp.length !== 6) {
            return "Error! Number must be six digits!";
        }

        const actions = [];
        while (temp.length > 1) {
            const summed = String(Number(temp[0]) + Number(temp[1]));
            temp = summed + temp.slice(2);
            actions.push(temp);
        }
        const x = temp;

        let y;
        if (actions.length) {
            y = actions[actions.length - 2];
            if (Number(y) > 30) {
                y = y.split("").reverse().join("");
                flipped = true;
            }
        }

        if (Number(y) > 28) {
            y = `${y} - exception from the rule`;
        }

        if (Number(actions[actions.length - 3]) <= 28) {
            z = actions[actions.length - 3];
        }

        if (flipped) {
            if (z) {
                return `${x}, ${y} - flipped, ${z}`;
            } else {
                return `${x}, ${y} - flipped`;
            }
        } else {
            if (z) {
                return `${x}, ${y}, ${z}`;
            } else {
                return `${x}, ${y}`;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setResult(calcNumber(input))
        setInput('')
    }

    return (
        <div>
            <h2>Digits 👉 class number</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                    required 
                    placeholder='######' 
                    type='text'
                    value={input}
                    onChangeCapture={(e) => setInput(e.target.value)}
                />
            </form>
            
            <span>{ result }</span>
        </div>
    )
}

export default ToNumber