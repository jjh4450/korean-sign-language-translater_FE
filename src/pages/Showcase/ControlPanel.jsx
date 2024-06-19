import React from 'react';
import useShowcaseStore from './store';
import Pipicon from '@assets/pipicon.svg?react';
import { useEffect } from 'react';

/**
 * ControlPanel 컴포넌트는 비디오 컨트롤을 제어하는 패널을 렌더링합니다.
 */
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
        title={isLooping ? '반복 재생 비활성화' : '반복 재생 활성화'}
      >
        {isLooping ? '🔁' : '⏭️'}
      </button>
      <button
        className="shadow-lg w-1/2 inline-flex items-center justify-center text-white bg-gray-100 border-0 py-2 px-4 focus:outline-none rounded-br-lg text-lg hover:bg-gray-200 bg-gray-100"
        onClick={handlePip}
        aria-label="Toggle Picture in Picture"
        title="영상을 상단에 고정하기"
      >
        <Pipicon />
      </button>
    </div>
  );
};

export default ControlPanel;
