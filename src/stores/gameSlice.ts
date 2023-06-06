import create from 'vue-zustand';

type BoardState = | "select_single"
                  | "select_double"
                  | "reading"
                  | "final"
type Mode = | "single"
            | "double"
            | "final"
export const useGameStore = create(set => ({
  mode: "single",
  boardState: "select_single",
  setBoardState: (boardState: BoardState) => set(state => ({
    boardState: boardState
  })),
  setMode: (mode: Mode) => set(state => ({
    mode: mode
  })),
  currentQuestion: {
    question: '',
    answer: '',
    value: 0
  },
  setCurrentQuestion: question => set(state => ({
    currentQuestion: question
  })),
}));
