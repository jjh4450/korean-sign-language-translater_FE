import React, { useEffect } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import preimage from '@assets/sound_wave.lottie';
import useShowcaseStore from './store';

/**
 * 비디오 플레이어 컴포넌트입니다.
 *
 * @component
 * @param {Object} props - 컴포넌트 속성
 * @param {Object} props.videoRef - 비디오 참조 객체
 * @returns {JSX.Element} VideoPlayer 컴포넌트
 */
const VideoPlayer = ({ videoRef }) => {
  const {
    videoData,
    currentVideoIndex,
    setCurrentVideoIndex,
    setCurrentTitle,
    isLooping,
    showControl,
    setShowControl,
  } = useShowcaseStore((state) => ({
    videoData: state.videoData,
    currentVideoIndex: state.currentVideoIndex,
    setCurrentVideoIndex: state.setCurrentVideoIndex,
    setCurrentTitle: state.setCurrentTitle,
    isLooping: state.isLooping,
    showControl: state.showControl,
    setShowControl: state.setShowControl,
  }));

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => {
      let nextIndex = prevIndex + 1;
      if (nextIndex >= videoData.length) {
        if (isLooping) {
          nextIndex %= videoData.length;
        } else {
          videoRef.current.pause();
          setShowControl(true);
          return prevIndex;
        }
      }
      setCurrentTitle(videoData[nextIndex].title);
      setShowControl(false);
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
      controls={showControl}
      playsInline
      autoPlay
    />
  );
};

export default VideoPlayer;
