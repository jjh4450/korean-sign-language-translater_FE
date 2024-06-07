import React, { useRef, useEffect, useState } from 'react';
import useShowcaseStore from './store';

const TextInput = () => {
  const inputRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [recognizing, setRecognizing] = useState(false);

  const socket = useShowcaseStore((state) => state.socket);
  const currentTitle = useShowcaseStore((state) => state.currentTitle);

  const handleExpand = () => setIsExpanded(true);

  const handleShrink = () => {
    if (!buttonClicked) {
      setIsExpanded(false);
    }
  };

  const handleButtonClick = () => {
    const inputValue = inputRef.current.value;

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(inputValue);
    }
    setButtonClicked(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        handleShrink();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [buttonClicked]);

  const startRecognition = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'ko-KR';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setRecognizing(true);
    };

    recognition.onresult = (event) => {
      const speechResult = event.results[0][0].transcript;
      inputRef.current.value = speechResult;
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(speechResult);
      }
      setRecognizing(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setRecognizing(false);
    };

    recognition.onend = () => {
      setRecognizing(false);
    };

    recognition.start();
  };

  return (
    <div className="text-center lg:w-2/5 md:w-1/2 w-full">
      <p
        className="mt-8 bg-gray-100 p-4 rounded-t-lg shadow-inner text-xl font-medium text-gray-800 cursor-pointer"
        onMouseDown={() => setButtonClicked(true)} // p 태그 클릭 시 onBlur 방지
        onClick={() => { handleExpand(); setButtonClicked(false); }} // 클릭 후 상태 리셋
        onTouchStart={handleExpand} // 모바일에서 터치로 확장
      >
        {currentTitle}
      </p>
      <input
        type="text"
        id="message"
        name="message"
        ref={inputRef}
        className={`w-full lg:w-100 mx-auto bg-white rounded-b-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 leading-8 transition-all duration-300 ease-in-out mb-6 ${
          isExpanded ? 'max-h-40 opacity-100 py-2 px-4' : 'max-h-0 opacity-0 py-0 px-0'
        }`}
        placeholder="보건소에서 무료로 백신을 접종한다고 한다."
        onFocus={handleExpand}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) {
            setTimeout(handleShrink, 0);
          }
        }}
      />
      <div className="flex justify-center space-x-4">
        <button
          className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105"
          onClick={startRecognition}
          disabled={recognizing}
        >
          음성
        </button>
        <button
          className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105"
          onMouseDown={() => setButtonClicked(true)}
          onClick={() => {
            handleExpand();
            handleButtonClick();
          }}
        >
          문자
        </button>
      </div>
    </div>
  );
};

export default TextInput;
