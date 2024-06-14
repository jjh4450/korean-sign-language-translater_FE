import { create } from 'zustand';

// Zustand 스토어를 생성합니다.
const useShowcaseStore = create((set) => ({
  socket: null, // 소켓 객체
  response: '', // 응답 데이터
  videoData: [], // 비디오 데이터 배열
  currentVideoIndex: 0, // 현재 비디오 인덱스
  currentTitle: '입력을 통해 번역 시작', // 현재 제목
  isLooping: true, // 루프 여부
  videoRef: null, // 비디오 참조
  showControl: false, // 컨트롤 표시 여부

  // 소켓 객체 설정 함수
  setSocket: (socket) => set({ socket }),

  // 응답 데이터 설정 함수
  setResponse: (response) => set({ response }),

  // 비디오 데이터 설정 함수
  setVideoData: (videoData) => set({ videoData }),

  // 현재 비디오 인덱스 설정 함수
  setCurrentVideoIndex: (updater) => set((state) => ({
    currentVideoIndex: typeof updater === 'function' ? updater(state.currentVideoIndex) : updater
  })),

  // 현재 제목 설정 함수
  setCurrentTitle: (currentTitle) => set({ currentTitle }),

  // 루프 여부 설정 함수
  setIsLooping: (isLooping) => set({ isLooping }),

  // 비디오 참조 설정 함수
  setVideoRef: (videoRef) => set({ videoRef }),

  // 컨트롤 표시 여부 설정 함수
  setShowControl: (updater) => set((state) => ({
    showControl: typeof updater === 'function' ? updater(state.showControl) : updater
  })),

  // 스토어 초기화 함수
  resetShowcase: () => set({
    socket: null,
    response: '',
    videoData: [],
    currentVideoIndex: 0,
    currentTitle: '입력을 통해 번역 시작',
    isLooping: true,
    videoRef: null,
    showControl: false,
  })
}));

export default useShowcaseStore;
