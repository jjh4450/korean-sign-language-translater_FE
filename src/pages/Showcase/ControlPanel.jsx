import React from 'react';
import useShowcaseStore from './store';
import Pipicon from '@assets/pipicon.svg?react';
import { useEffect } from 'react';

const ControlPanel = () => {
  const { isLooping, setIsLooping, videoRef, setShowControl } = useShowcaseStore((state) => ({
    isLooping: state.isLooping,
    setIsLooping: state.setIsLooping,
    videoRef: state.videoRef,
    setShowControl: state.setShowControl,
  }));

  useEffect(() => {
    setShowControl(true);
  }, [document.pictureInPictureElement]);

  const toggleLooping = () => {
    setIsLooping(!isLooping);
  };

  const handlePip = () => {
    if (document.pictureInPictureEnabled && videoRef && !videoRef.disablePictureInPicture) {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        videoRef.requestPictureInPicture();
      }
      videoRef.cureent.play();
    }
  };

  return (
    <div className="lg:w-2/5 md:w-1/2 w-full flex justify-center">
      <button
        className={`shadow-lg w-1/2 h-1/2 inline-flex items-center justify-center text-white border-0 py-2 px-4 focus:outline-none text-lg rounded-bl-lg ${isLooping ? 'hover:bg-gray-200 bg-gray-100' : 'hover:bg-indigo-600 bg-indigo-500'}`}
        onClick={toggleLooping}
        aria-label="Toggle Looping"
      >
        {isLooping ? '🔁' : '⏭️'}
      </button>
      <button
        className="shadow-lg w-1/2 inline-flex items-center justify-center text-white bg-gray-100 border-0 py-2 px-4 focus:outline-none rounded-br-lg text-lg hover:bg-gray-200 bg-gray-100"
        onClick={handlePip}
        aria-label="Toggle Picture in Picture"
      >
        <Pipicon />
      </button>
    </div>
  );
};

export default ControlPanel;
