import React from 'react';
import useShowcaseStore from './store';
import Pipicon from '@assets/pipicon.svg?react';

const ControlPanel = () => {
  const { isLooping, setIsLooping, videoRef } = useShowcaseStore((state) => ({
    isLooping: state.isLooping,
    setIsLooping: state.setIsLooping,
    videoRef: state.videoRef,
  }));

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
    }
  };

  return (
    <div className="lg:w-2/5 md:w-1/2 w-full flex justify-center">
      <button
        className={`shadow-lg w-1/2 h-1/2 inline-flex items-center justify-center text-white ${isLooping ? 'bg-gray-100' : 'bg-blue-500'} hover:bg-indigo-600 border-0 py-2 px-4 focus:outline-none hover:${isLooping ? 'bg-red-600' : 'bg-gray-600'} rounded-bl-lg text-lg`}
        onClick={toggleLooping}
      >
        {isLooping ? '🔁' : '⏭️'}
      </button>
      <button
        className="shadow-lg w-1/2 inline-flex items-center justify-center text-white bg-gray-100 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded-br-lg text-lg"
        onClick={handlePip}
      >
        <Pipicon />
      </button>
    </div>
  );
};

export default ControlPanel;
