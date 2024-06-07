import { create } from 'zustand'

const useStore = create((set) => ({
  socket: null,
  response: '',
  videoData: [],
  currentVideoIndex: 0,
  currentTitle: '입력을 통해 번역 시작',
  isLooping: true,
  setSocket: (socket) => set({ socket }),
  setResponse: (response) => set({ response }),
  setVideoData: (videoData) => set({ videoData }),
  setCurrentVideoIndex: (currentVideoIndex) => set({ currentVideoIndex }),
  setCurrentTitle: (currentTitle) => set({ currentTitle }),
  setIsLooping: (isLooping) => set({ isLooping }),
}));

export default useStore;
