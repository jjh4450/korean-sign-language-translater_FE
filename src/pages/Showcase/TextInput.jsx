import React, { useRef, useEffect, useState } from 'react';
import useShowcaseStore from './store';

const TextInput = () => {
  const inputRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

  const socket = useShowcaseStore((state) => state.socket);
  const currentTitle = useShowcaseStore((state) => state.currentTitle);

  const handleExpand = () => {
    setIsExpanded(true);
  };

  const handleShrink = () => {
    if (!buttonClicked) {
      setIsExpanded(false);
    }
  };

  const handleButtonClick = () => {
    const inputValue = inputRef.current.value;
    // console.log('Sending:', inputValue);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(inputValue);
    }
    setButtonClicked(false); // 클릭 처리 후 리셋
  };

  const handleTextInputExpand = () => {
    setIsExpanded(true);
    inputRef.current.focus();
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

  return (
    <div className="text-center lg:w-2/5 md:w-1/2 w-full">
      <p
        className="mt-8 bg-gray-100 p-4 rounded-t-lg shadow-inner text-xl font-medium text-gray-800 cursor-pointer"
        onClick={handleExpand}
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
            setTimeout(handleShrink, 0); // 포커스를 잃었을 때 축소
          }
        }}
      />
      <div className="flex justify-center space-x-4">
        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105">음성</button>
        <button
          className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105"
          onMouseDown={() => setButtonClicked(true)} // 문자 버튼 클릭 시 onBlur 방지
          onClick={() => { handleTextInputExpand(); handleButtonClick(); }} // 문자 버튼 클릭 시 텍스트 입력 필드 확장 및 전송
        >
          문자
        </button>
      </div>
    </div>
  );
};

export default TextInput;
