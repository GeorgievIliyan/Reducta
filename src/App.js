// App.js
import Modal from './components/Modal.js';
import ToDigits from './components/ToDigits.js';
import ToNumber from './components/ToNumber.js';

function App() {
    return (
        <div className="App h-full bg-gray-50 flex flex-col items-center justify-center font-sans">
            
            <Modal /> 
            
            <div className='w-full max-w-2xl bg-white p-8 md:p-10 rounded-xl shadow-xl border border-gray-100 space-y-8'>
                
                <h1 className='text-4xl font-bold text-gray-800 border-b-1 border-gray-200 pb-4 mb-4 text-center'>
                    Прогнозен Инструмент
                </h1>

                <div className='space-y-6'>
                    
                    <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-md transition duration-300 hover:shadow-lg'>
                        <h2 className='text-xl font-semibold text-blue-600 mb-4 flex items-center'>
                            <i className="bi bi-hash mr-2 text-2xl"></i> Конвертиране в Цифри
                        </h2>
                        <ToDigits />
                    </div>

                    <div className='bg-white p-6 rounded-lg border border-gray-200 shadow-md transition duration-300 hover:shadow-lg'>
                        <h2 className='text-xl font-semibold text-blue-600 mb-4 flex items-center'>
                            <i className="bi bi-arrow-repeat me-3 text-2xl"></i> Конвертиране в Число
                        </h2>
                        <ToNumber />
                    </div>
                </div>

            </div>
        </div>
    );
}

export default App;