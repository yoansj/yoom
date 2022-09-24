import create from 'zustand';

interface CallState {
  uid: number;
  setUid: (uid: number) => void;
  participantsUids: number[];
  setParticipantsUids: (participantsUids: number[]) => void;
}

export const useCallStore = create<CallState>(set => ({
  uid: 0,
  setUid: uid => set({uid}),
  participantsUids: [],
  setParticipantsUids: participantsUids => set({participantsUids}),
}));
