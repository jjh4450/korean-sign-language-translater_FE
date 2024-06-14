import React, { useEffect, useRef } from 'react';
import useShowcaseStore from './store';
import ControlPanel from './ControlPanel';
import ServerResponse from '../../components/ServerResponse';
import TextInput from './TextInput';
import VideoPlayer from './VideoPlayer';

/**
 * Showcase 컴포넌트는 웹소켓을 통해 서버와 통신하고, 비디오 플레이어, 컨트롤 패널, 텍스트 입력 등을 포함한 쇼케이스 페이지를 렌더링합니다.
 */
const Showcase = () => {
  const {
    setSocket,
    setResponse,
    setVideoData,
    setCurrentVideoIndex,
    setCurrentTitle,
    setVideoRef,
    response,
    resetShowcase,
  } = useShowcaseStore((state) => ({
    setSocket: state.setSocket,
    setResponse: state.setResponse,
    setVideoData: state.setVideoData,
    setCurrentVideoIndex: state.setCurrentVideoIndex,
    setCurrentTitle: state.setCurrentTitle,
    setVideoRef: state.setVideoRef,
    response: state.response,
    resetShowcase: state.resetShowcase,
  }));

  const videoRef = useRef(null);
  const websocketUrl = import.meta.env.VITE_WEBSOCKET_URL;
  let ws;

  const connectWebSocket = () => {
    ws = new WebSocket(websocketUrl);

    ws.onopen = () => {
      console.log('WebSocket is connected');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log('Received:', data);
        setResponse(data);

        if (Array.isArray(data)) {
          setVideoData(data);
          setCurrentVideoIndex(0);
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
      reconnectWebSocket();
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };

    setSocket(ws);
  };

  const reconnectWebSocket = () => {
    console.log('Attempting to reconnect WebSocket...');
    setTimeout(() => {
      connectWebSocket();
    }, 5000); // 5초 후 재연결 시도
  };

  useEffect(() => {
    resetShowcase();
    connectWebSocket();

    const checkConnection = setInterval(() => {
      if (ws.readyState === WebSocket.CLOSED) {
        reconnectWebSocket();
      }
    }, 10000); // 10초마다 연결 상태 확인

    return () => {
      clearInterval(checkConnection);
      ws.close();
    };
  }, [setSocket, setResponse, setVideoData, setCurrentTitle, resetShowcase]);

  useEffect(() => {
    if (videoRef.current) {
      setVideoRef(videoRef.current);
    }
  }, [setVideoRef, response]);

  useEffect(() => {
    const scrollStep = 5; // 스크롤 단계 크기
    let currentScroll = 0;
    const targetScroll = window.innerHeight * 0.08;

    const smoothScroll = () => {
      currentScroll += scrollStep;
      window.scrollBy(0, scrollStep);
      if (currentScroll < targetScroll) {
        requestAnimationFrame(smoothScroll);
      }
    };

    requestAnimationFrame(smoothScroll);
  }, []);

  return (
    <section className="text-gray-700 body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <VideoPlayer videoRef={videoRef} />
        <ControlPanel />
        <TextInput />
        <ServerResponse response={response} />
      </div>
    </section>
  );
}

export default Showcase;
