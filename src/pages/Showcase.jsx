import React, { useRef, useEffect, useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import preimage from '../assets/preimage.lottie';

const Showcase = () => {
  const videoRef = useRef(null); // videoRef 추가
  const [socket, setSocket] = useState(null);
  const [response, setResponse] = useState('');
  const [videoData, setVideoData] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentTitle, setCurrentTitle] = useState('입력을 통해 번역 시작');
  const [isLooping, setIsLooping] = useState(true);

  useEffect(() => {
    // WebSocket connection setup
    const ws = new WebSocket('ws://127.0.0.1:8000/ws/123');

    ws.onopen = () => {
      console.log('WebSocket is connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received:', data);
        setResponse(data);

        // Assuming data is an array of video URLs and titles
        if (Array.isArray(data)) {
          setVideoData(data);
          setCurrentVideoIndex(0); // Reset to the first video
          if (data.length > 0) {
            setCurrentTitle(data[0].title);
          }
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    };

    ws.onclose = () => {
      console.log('WebSocket is closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return (
    <section className="text-gray-700 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <VideoPlayer 
          videoData={videoData} 
          currentVideoIndex={currentVideoIndex} 
          setCurrentVideoIndex={setCurrentVideoIndex} 
          currentTitle={currentTitle} 
          setCurrentTitle={setCurrentTitle} 
          isLooping={isLooping} 
          videoRef={videoRef} 
        />
        <ControlPanel 
          isLooping={isLooping} 
          setIsLooping={setIsLooping} 
          videoRef={videoRef} 
        />
        <TextInput socket={socket} currentTitle={currentTitle} />
        <ServerResponse response={response} />
      </div>
    </section>
  );
}

const ControlPanel = ({ isLooping, setIsLooping, videoRef }) => {
  const toggleLooping = () => {
    setIsLooping(!isLooping);
  };

  const handlePip = () => {
    if (document.pictureInPictureEnabled && !videoRef.current.disablePictureInPicture) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        videoRef.current.requestPictureInPicture();
      }
    }
  };

  return (
    <div className="lg:w-2/5 md:w-1/2 w-full flex justify-center">
      <button
        className={`w-1/2 h-1/2 inline-flex items-center justify-center text-white ${isLooping ? 'bg-gray-500' : 'bg-red-500'} border-0 py-2 px-4 focus:outline-none hover:${isLooping ? 'bg-red-600' : 'bg-gray-600'} rounded-bl-lg text-lg`}
        onClick={toggleLooping}
      >
        {isLooping ? '🔁' : '⏭️'}
      </button>
      <button
        className="w-1/2 inline-flex items-center justify-center text-white bg-blue-500 border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded-br-lg text-lg"
        onClick={handlePip}
      >
        <Pipicon />
      </button>
    </div>
  );
};

const VideoPlayer = ({ videoData, currentVideoIndex, setCurrentVideoIndex, currentTitle, setCurrentTitle, isLooping, videoRef }) => {
  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => {
      let nextIndex = (prevIndex + 1);
      if (nextIndex >= videoData.length) {
        if (isLooping) {
          nextIndex %= videoData.length;
        } else {
          videoRef.current.pause();
          return prevIndex;
        }
      }
      setCurrentTitle(videoData[nextIndex].title);
      return nextIndex;
    });
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.playbackRate = 1.5; // Set playback rate to 1.5
    }
  }, [currentVideoIndex, videoData]);

  const _css = "lg:w-2/5 md:w-1/2 w-full object-cover object-center rounded-t-lg shadow-lg aspect-square";

  return (
    videoData.length > 0 ? (
      <video
        ref={videoRef}
        className={_css}
        alt="hero"
        src={videoData[currentVideoIndex].url}
        onEnded={handleVideoEnded}
        controls
        autoPlay
      />
    ) : (
      <div className={_css}>
        <DotLottieReact
          src={preimage}
          loop
          autoplay
        />
      </div>
    )
  );
};

const ServerResponse = ({ response }) => (
  <div className="mt-8 bg-gray-100 p-4 rounded-lg shadow-inner">
    <h2 className="text-lg font-medium text-gray-800">서버 응답:</h2>
    <pre className="text-left text-sm text-gray-700 whitespace-pre-wrap">{JSON.stringify(response, null, 2)}</pre>
  </div>
);

const TextInput = ({ socket, currentTitle }) => {
  const inputRef = useRef(null);

  const handleButtonClick = () => {
    const inputValue = inputRef.current.value;
    console.log('Sending:', inputValue);

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(inputValue);
    }
  };

  return (
    <div className="text-center lg:w-2/5 md:w-1/2w-full">
      <p className="mt-8 bg-gray-100 p-4 rounded-lg shadow-inner text-xl font-medium text-gray-800">{currentTitle}</p>
      <input
        type="text"
        id="message"
        name="message"
        ref={inputRef}
        className="w-full lg:w-100 mx-auto bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-4 leading-8 transition-colors duration-200 ease-in-out mb-6"
        placeholder="보건소에서 무료로 백신을 접종한다고 한다."
      />
      <div className="flex justify-center space-x-4">
        <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105">음성</button>
        <button
          className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded-lg text-lg transition duration-200 ease-in-out transform hover:scale-105"
          onClick={handleButtonClick}
        >
          문자
        </button>
      </div>
    </div>
  );
};

const Pipicon = () => (
  <svg
    dataencoreid="icon"
    role="img"
    aria-hidden="true"
    viewBox="0 0 16 16"
    fill="white"
    width="24"
    height="24"
  >
    <path d="M16 2.45c0-.8-.65-1.45-1.45-1.45H1.45C.65 1 0 1.65 0 2.45v11.1C0 14.35.65 15 1.45 15h5.557v-1.5H1.5v-11h13V7H16V2.45z"></path>
    <path d="M15.25 9.007a.75.75 0 0 1 .75.75v4.493a.75.75 0 0 1-.75.75H9.325a.75.75 0 0 1-.75-.75V9.757a.75.75 0 0 1 .75-.75h5.925z"></path>
  </svg>
);

export default Showcase;
