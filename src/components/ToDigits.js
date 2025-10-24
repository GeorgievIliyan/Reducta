import React, { useState } from 'react';

const ToDigits = () => {
    const [input, setInput] = useState('');
    const [result, setResult] = useState(null);
    const [prevValue, setPrevValue] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    function reverseCode(studentNum) {
        const target = parseInt(studentNum, 10); 
        
        let second_one = 0; 

        if (isNaN(target) || target < 1 || target > 30) {
            return { type: 'error', message: "Въведете валиден номер на ученик (1–30)." };
        }

        const calcXY = (num) => {
            let current = String(num);
            const actions = [];

            while (current.length > 1) {
                const summed = String(Number(current[0]) + Number(current[1]));
                current = summed + current.slice(2);
                actions.push(current);
            }

            const x = parseInt(current, 10);
            let y = null;
            if (actions.length >= 2) {
                y = parseInt(actions[actions.length - 2], 10); 
            }

            return { x, y };
        };

        for (let i = 0; i < 20000; i++) {
            const candidate = Math.floor(Math.random() * 900000) + 100000;
            const { x, y } = calcXY(candidate);

            if (x === target) { 
                second_one = y;
            } else if (y === target) {
                second_one = x;
            }

            if (x === target || y === target) {
                return {
                    type: 'success',
                    message: candidate,
                    second_one: second_one
                };
            }
        }

        return { type: 'warning', message: "Не можа да се намери код. Опитайте отново" };
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;
        
        setIsLoading(true);
        setResult(null); 
        setPrevValue(input);

        setTimeout(() => {
            const calculatedResult = reverseCode(input);
            setResult(calculatedResult);
            setInput('');
            setIsLoading(false);
        }, 300);
    };

    const getResultClasses = (type) => {
        switch (type) {
            case 'success':
                return 'bg-green-100 text-green-700 border-green-300';
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
                return 'bi bi-check-circle-fill';
            case 'error':
                return 'bi bi-x-octagon-fill';
            case 'warning':
                return 'bi bi-exclamation-triangle-fill';
            default:
                return 'bi bi-info-circle-fill';
        }
    };


    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <input 
                    required 
                    placeholder='Въведете номер (1-30)' 
                    type='number'
                    min='1'
                    max='30'
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
                            <i className="bi bi-magic mr-2"></i> 
                            <span>Генерирай</span>
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
                                За ученик <span className='font-semibold'>№{prevValue}</span> генерираният код е: 
                                <span className="font-bold text-lg ml-2">{result.message}</span>.
                                <br/>Потенциален втори: <span className='font-semibold'>№{result.second_one}</span>.
                            </span>
                        ) : (
                            <span>
                                Резултат за ученик **№{prevValue}**: <span className="ml-1">{result.message}</span>
                            </span>
                        )}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ToDigits;