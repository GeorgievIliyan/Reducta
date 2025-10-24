import React, { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Modal = () => {
  const [hasAccepted, setHasAccepted] = useState(false);
  const [seconds, setSeconds] = useState(10)
  const buttonIsDisabled = seconds > 0

  useEffect(() => {
    if (seconds === 0){
      return
    }
    const timerId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds - 1)
    }, 1000)

    return () => clearInterval(timerId)
  }, [seconds])
  
  useEffect(() => {
    const accepted = localStorage.getItem('hasAccepted') === 'true';
    setHasAccepted(accepted);
  }, []);

  useEffect(() => {
    if (!hasAccepted) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    
    return () => {
        document.body.style.overflow = 'unset';
    };
  }, [hasAccepted]);

  const acceptTerms = () => {
    localStorage.setItem('hasAccepted', 'true');
    setHasAccepted(true);
  };

  if (hasAccepted) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex justify-center items-center z-[1050] overflow-y-auto p-4"
    >
      <div className="bg-white p-8 rounded-xl shadow-2xl w-11/12 max-w-lg transform scale-100 transition-all duration-300 my-auto">
        
        <div className="flex items-center mb-6 pb-4 border-b border-gray-200">
            <i className="bi bi-file-earmark-text text-3xl text-blue-600 mr-3"></i>
            <h3 className="text-3xl font-bold text-gray-800">Условия за ползване</h3>
        </div>

        <div className='space-y-4 text-gray-700 text-sm max-h-[70vh] overflow-y-auto pr-2'> 
            <p>
                Следващите условия определят правилата за използване на приложението:
            </p>
            <ul className="list-disc list-outside pl-5 space-y-3">
                <li>
                    <strong>Цел на приложението:</strong> Това приложение предоставя прогноза за това кой номер ще се падне, базирана на алгоритъм. Прогнозата е само за информационни цели и не гарантира точност.
                </li>
                <li>
                    <strong>Отказ от отговорност:</strong> Приложението не носи отговорност за резултатите от тестовете или въпросите, получени от потребителите. Алгоритъмът е само прогноза и не трябва да се възприема като окончателен източник на информация.
                </li>
                <li>
                    <strong>Използване на приложението:</strong> Потребителите използват приложението на свой риск. Ние не можем да бъдем държани отговорни за никакви последствия, които могат да възникнат вследствие на използването на прогнозите.
                </li>
                <li>
                    <strong>Лиценз:</strong> Приложението е лицензирано под Polyform Noncommercial License 1.0.0. С това се изисква задължително посочване на авторство, забрана за търговско използване и забрана за създаване и разпространение на производни произведения. 
                </li>
                <li>
                    <strong>Промени в условията:</strong> Запазваме си правото да променяме тези условия по всяко време. Промените ще бъдат публикувани на тази страница и ще влязат в сила незабавно.
                </li>
            </ul>
        </div>
        
        <p className='mt-8 mb-6 text-sm text-gray-500'>
          С натискане на бутона <strong>"Съгласявам се"</strong>, вие потвърждавате, че сте запознати и се съгласявате с условията за ползване на приложението. Ако не желаете да ги спазвате, моля напуснете страницата.
        </p>
        <div className='flex justify-end'>
          {buttonIsDisabled?
          <button
            className='py-3 px-6 bg-blue-600 rounded-lg text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-150 ease-in-out w-full md:w-auto'
            type='button'
          >
            Изкчакайте {seconds} секунди
            <i className="bi bi-stopwatch ms-3 text-lg"></i>
          </button>
          :
          <button
            className='py-3 px-6 bg-blue-600 rounded-lg text-white font-semibold shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-150 ease-in-out w-full md:w-auto'
            type='button'
            onClick={acceptTerms}
          >
            Съгласявам се
            <i className="bi bi-arrow-right ms-3"></i>
          </button>
          }
        
        </div>
      </div>
    </div>
  );
};

export default Modal;