import { create } from 'zustand';
// need vanilla declaration
import { nanoid } from 'nanoid';

const usePlayerStore = create((set) => ({
  players: [],
  addPlayer: (name: string) => set((state) => ({ 
    players: state.players.concat({
      name: name,
      winnings: 0,
      position: state.players.length,
      id: nanoid(),
    })
  })),
}));

