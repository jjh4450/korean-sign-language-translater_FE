import React, { useRef, useEffect, useState, useCallback } from 'react';
import useShowcaseStore from './store';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import preimage from '@assets/sound_wave2.lottie';

/**
 * TextInput 컴포넌트는 사용자로부터 텍스트를 입력받는 입력 필드를 제공합니다.
 * 입력된 텍스트를 서버로 전송하거나 음성 인식 기능을 사용할 수 있습니다.
 */
const TextInput = () => {
  const inputRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [isAppleDevice, setIsAppleDevice] = useState(false);

  const socket = useShowcaseStore((state) => state.socket);
  const currentTitle = useShowcaseStore((state) => state.currentTitle);

  const handleExpand = () => setIsExpanded(true);
  const handleShrink = useCallback(() => !buttonClicked && setIsExpanded(false), [buttonClicked]);

  const handleSendText = (text) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(text);
    }
  };

  const handleButtonClick = () => {
    handleSendText(inputRef.current.value);
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
  }, [handleShrink]);

  useEffect(() => {
    // 애플 기기 (iOS와 macOS) 감지
    setIsAppleDevice(/iPhone|iPad|iPod|Macintosh/.test(navigator.userAgent));
  }, []);

  const isRecognizing = () => {
    return recognition !== null;
  }

  const stopRecognition = () => {
    if (recognition) {
      recognition.stop();
      setRecognition(null);
    }
  };

  const abortRecognition = () => {
    if (recognition) {
      recognition.abort();
      setRecognition(null);
    }
  };

  const initializeRecognition = () => {
    inputRef.current.value = '';
    if (isAppleDevice) {
      alert('키보드에서 🎙️아이콘을 눌러 받아쓰기 기능을 이용해 주세요! 이후 "문자"버튼을 눌러 주시면 됩니다~');
      inputRef.current.focus();
      return;
    }

    const error_message = '음성 인식에 실패했습니다.';
    const recognitionInstance = new window.webkitSpeechRecognition();
    recognitionInstance.lang = 'ko-KR';
    recognitionInstance.interimResults = true;
    recognitionInstance.maxAlternatives = 1;

    recognitionInstance.onresult = (event) => {
      inputRef.current.value = event.results[0][0].transcript;
    };

    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      inputRef.current.value = error_message;
      setRecognition(null);
    };

    recognitionInstance.onend = () => {
      if (inputRef.current.value === error_message) {
        return;
      }
      handleSendText(inputRef.current.value);
      setRecognition(null);
    };

    recognitionInstance.start();
    setRecognition(recognitionInstance);
  };

  const toggleRecognition = () => {
    if (isRecognizing()) {
      stopRecognition();
    } else {
      initializeRecognition();
    }
  }

  return (
    <div className="text-center lg:w-2/5 md:w-1/2 w-full">
      <p
        className="mt-8 bg-gray-100 p-4 rounded-t-lg shadow-inner text-xl font-medium text-gray-800 cursor-pointer"
        onMouseDown={() => setButtonClicked(true)}
        onClick={() => {
          handleExpand();
          setButtonClicked(false);
        }}
        onTouchStart={handleExpand}
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
      <div className="flex justify-center space-x-4 relative">
        <button
          className="relative inline-flex items-center justify-center text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105 overflow-hidden"
          onMouseDown={() => setButtonClicked(true)}
          onDoubleClick={() => setRecognition(null)}
          onClick={() => {
            toggleRecognition();
            handleExpand();
          }}
        >
          <span className={`relative z-10 ${isRecognizing() ? 'text-transparent' : 'text-white'}`}>음성</span>
          {isRecognizing() && (
            <div className="absolute inset-0 flex justify-center items-center z-0">
              <DotLottieReact src={preimage} loop autoplay className="w-full h-full" />
            </div>
          )}
        </button>
        <button
          className="inline-flex items-center justify-center text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105"
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
