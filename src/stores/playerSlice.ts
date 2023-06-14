import create from 'vue-zustand';
// need vanilla declaration
import { nanoid } from 'nanoid';

type GuessStatus = 'abstain' | 'correct' | 'incorrect';
export const usePlayerStore = create(set => ({
  players: {},
  addPlayer: (name: string, id: string) => (
    set(state => ({ 
      players: {
        ...state.players,
        [id]: {
          name: name,
          winnings: 0,
          // should permit ties
          position: Object.values(state.players).length,
          id,
          guessStatus: 'abstain',
          finalBet: 0,
        },
      }
    }))
  ),
  setPlayerGuessStatus: (guessStatus: GuessStatus, id: string) => (
    set(state => ({
      players: {
        ...state.players,
        [id]: {
          ...state.players[id],
          guessStatus
        },
      },
    }))
  ),
  includeWinnings: (amount: number, id: string) => (
    set(state => ({
      players: {
        ...state.players,
        [id]: {
          ...state.players[id],
          winnings: state.players[id].winnings + amount,
        },
      },
    }))
  ),
  setFinalBet: (bet: number, id: string) => (
    set(state => ({
      players: {
        ...state.players,
        [id]: {
          ...state.players[id],
          finalBet: bet,
        },
      },
    }))
  ),
}));
