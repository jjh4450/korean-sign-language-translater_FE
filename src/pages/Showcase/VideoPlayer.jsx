import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import preimage from '@assets/preimage.lottie';
import useShowcaseStore from './store';

const VideoPlayer = ({ videoRef }) => {
  const {
    videoData,
    currentVideoIndex,
    setCurrentVideoIndex,
    setCurrentTitle,
    isLooping,
  } = useShowcaseStore((state) => ({
    videoData: state.videoData,
    currentVideoIndex: state.currentVideoIndex,
    setCurrentVideoIndex: state.setCurrentVideoIndex,
    setCurrentTitle: state.setCurrentTitle,
    isLooping: state.isLooping,
  }));

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => {
      let nextIndex = prevIndex + 1;
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
      videoRef.current.playbackRate = 1.5; // 재생 속도 설정
    }
  }, [currentVideoIndex, videoRef]);

  const _css = "lg:w-2/5 md:w-1/2 w-full object-cover object-center rounded-t-lg shadow-lg aspect-square";

  if (!videoData || videoData.length === 0) {
    return (
      <div className={_css}>
        <DotLottieReact
          src={preimage}
          loop
          autoplay
        />
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      className={_css}
      alt="hero"
      src={videoData[currentVideoIndex]?.url || ''}
      onEnded={handleVideoEnded}
      controls
      autoPlay
    />
  );
};

export default VideoPlayer;
