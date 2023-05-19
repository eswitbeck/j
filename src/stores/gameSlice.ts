import create from 'vue-zustand';

type BoardState = | "select_single"
                  | "select_double"
                  | "reading"
                  | "final"
export const useGameStore = create(set => ({
  boardState: "select_single",
  setBoardState: (boardState: BoardState) => set(state => ({
    boardState: boardState
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
