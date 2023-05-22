import create from 'vue-zustand';

export const useQuestionStore = create(set => ({
  questions: {
    0: null,
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  },
  setQuestion: (question, index) => set(state => ({
    questions: {
      ...state.questions,
      [index]: question,
    }
  })),
}));

