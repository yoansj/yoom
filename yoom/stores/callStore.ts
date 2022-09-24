import create from 'zustand';
import getRandomInt from '../utils/getRandomNumber';

interface CallState {
  uid: number;
  participantsUids: number[];
  pushUid: (uid: number) => void;
  removeUid: (uid: number) => void;
  resetUids: () => void;
}

export const useCallStore = create<CallState>((set, get) => ({
  uid: getRandomInt(),
  participantsUids: [],
  pushUid: (uid: number) => {
    const {participantsUids} = get();
    // remove duplicates
    set({
      participantsUids: [...participantsUids, uid].filter(
        (v, i, a) => a.indexOf(v) === i,
      ),
    });
  },
  removeUid: (uid: number) => {
    const {participantsUids} = get();
    set({
      participantsUids: participantsUids.filter(
        participantUid => participantUid !== uid,
      ),
    });
  },
  resetUids: () => set({participantsUids: []}),
}));