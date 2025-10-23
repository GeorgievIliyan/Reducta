import React from 'react'
import { useState } from 'react'

const ToDigits = () => {
    
    const [input, setInput] = useState('')
    const [result, setResult] = useState('')

    function reverseCode(studentNum) {
        const target = parseInt(studentNum, 10);
        if (isNaN(target)) {
            return "❌ Enter a valid student number (1–30)";
        }

        if (target < 1 || target > 30) {
            return "❌ Enter a valid student number (1–30)";
        }

        // Compute digital root
        const digitalRoot = (n) => {
            while (n > 9) {
                n = String(n)
                    .split("")
                    .reduce((a, b) => a + Number(b), 0);
            }
            return n;
        };

        const root = digitalRoot(target);

        // Try random 6-digit numbers
        for (let i = 0; i < 10000; i++) {
            const candidate = Math.floor(Math.random() * 900000) + 100000;
            if (digitalRoot(candidate) === root) {
                return candidate;
            }
        }

        return "⚠️ Couldn't find code (try again)";
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setResult(reverseCode(input))
        setInput('')
    }

    return (
        <div>
            <h2>Class number 👉 digits</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <input 
                    required 
                    placeholder='##' 
                    type='text'
                    value={input}
                    onChangeCapture={(e) => setInput(e.target.value)}
                />
            </form>
            
            <span>{ result }</span>
        </div>
    )
}

export default ToDigits