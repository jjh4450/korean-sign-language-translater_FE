import { create } from 'zustand';

const useShowcaseStore = create((set) => ({
  socket: null,
  response: '',
  videoData: [],
  currentVideoIndex: 0,
  currentTitle: '입력을 통해 번역 시작',
  isLooping: true,
  videoRef: null,
  showControl: false,
  setSocket: (socket) => set({ socket }),
  setResponse: (response) => set({ response }),
  setVideoData: (videoData) => set({ videoData }),
  setCurrentVideoIndex: (updater) => set((state) => ({
    currentVideoIndex: typeof updater === 'function' ? updater(state.currentVideoIndex) : updater
  })),
  setCurrentTitle: (currentTitle) => set({ currentTitle }),
  setIsLooping: (isLooping) => set({ isLooping }),
  setVideoRef: (videoRef) => set({ videoRef }),
  setShowControl: (updater) => set((state) => ({
    showControl: typeof updater === 'function' ? updater(state.showControl) : updater
  })),
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
