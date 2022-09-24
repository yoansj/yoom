import create from "zustand";

interface UserState {
  name: string;
  setName: (name: string) => void;
  roomId: string;
  setRoomId: (roomId: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  name: "",
  setName: (name) => set({ name }),
  roomId: "",
  setRoomId: (roomId) => set({ roomId }),
}));
