import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const ToNumber = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [prevValue, setPrevValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function calcNumber(number) {
        let temp = String(number);
        const inputNum = parseInt(number, 10);

        if (isNaN(inputNum) || temp.length !== 6) {
            return { type: 'error', message: "Грешка! Комбинацията трябва да е шестцифрен!" };
        }
        
        let z = null;
        let flipped = false;
        const actions = [];
        
        let currentString = temp;
        while (currentString.length > 1) {
            const summed = String(Number(currentString[0]) + Number(currentString[1]));
            currentString = summed + currentString.slice(2);
            actions.push(currentString);
        }
        const x = currentString;
        
        let y = '';
        if (actions.length >= 2) {
            y = actions[actions.length - 2]; 

            if (Number(y) > 30) {
                y = y.split("").reverse().join("");
                flipped = true;
            }
            
            if (Number(y) > 28 && !y.includes('exception')) {
                y = `${y} - изключение от правилото`;
            }
        }
        
        if (actions.length >= 3) {
            const zCandidate = actions[actions.length - 3];
            if (Number(zCandidate) <= 28) {
                z = zCandidate;
            }
        }

        let message = '';
        if (z) {
            message = `${x}, ${y}`;
            if (z) {
                message += `, ${z}`;
            }
        } else {
            message = `№${x}, №${y}`;
        }
        
        if (flipped) {
            message += ` (обърнат код)`;
        }

        return { type: 'success', message: message };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;
        
        setIsLoading(true);
        setResult(null);
        setPrevValue(input);

        setTimeout(() => {
            const calculatedResult = calcNumber(input);
            setResult(calculatedResult);
            setInput('');
            setIsLoading(false);
        }, 300);
    };
    
    const getResultClasses = (type) => {
        switch (type) {
            case 'success':
                return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'error':
                return 'bg-red-100 text-red-700 border-red-300';
            case 'warning':
                return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };
    
    const getResultIcon = (type) => {
        switch (type) {
            case 'success':
                return 'bi bi-arrow-right-circle-fill';
            case 'error':
                return 'bi bi-x-octagon-fill';
            default:
                return 'bi bi-info-circle-fill';
        }
    };

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <input 
                    required 
                    placeholder='Въведете 6 цифри' 
                    type='text'
                    maxLength='6'
                    minLength='6'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 shadow-sm outline-none w-full"
                />
                <button
                    type='submit'
                    disabled={isLoading}
                    className="w-full sm:w-auto px-5 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-150 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {isLoading ? (
                        <i className="bi bi-arrow-repeat animate-spin text-xl"></i> 
                    ) : (
                        <>
                            <i className="bi bi-calculator mr-2"></i> 
                            <span>Изчисли</span> 
                        </>
                    )}
                </button>
            </form>

            {prevValue && result && (
                <div className={`p-4 border rounded-lg text-sm transition-all duration-300 ${getResultClasses(result.type)}`}>
                    <p className='font-medium flex items-center'>
                        <i className={`${getResultIcon(result.type)} mr-3 text-lg`}></i> 
                        
                        {result.type === 'success' ? (
                            <span>
                                От комбинацията <span className='font-semibold'>{prevValue}</span> получаваме: 
                                <span className="font-bold text-lg ml-2">{result.message}</span>
                            </span>
                        ) : (
                            <span>
                                Резултат за **{prevValue}**: <span className="ml-1">{result.message}</span>
                            </span>
                        )}
                    </p>
                </div>
            )}
        </div>

    );
};

export default ToNumber;