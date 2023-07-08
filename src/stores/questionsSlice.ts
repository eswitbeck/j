import create from 'vue-zustand';

const loaderCategory = {
  title: 'loading...',
  clues: new Array(5).fill({ clue: null, complete: true }),
}

export const useQuestionStore = create(set => ({
  categories: {
    0: loaderCategory,
    1: loaderCategory,
    2: loaderCategory,
    3: loaderCategory,
    4: loaderCategory,
    5: loaderCategory,
    6: loaderCategory,
    7: loaderCategory,
    8: loaderCategory,
    9: loaderCategory,
    10: loaderCategory,
    11: loaderCategory,
  },
  setCategory: (category, index) => set(state => ({
    categories: {
      ...state.categories,
      [index]: {
        ...category,
        index,
        locked: false,
      },
    }
  })),
  setCategoryToLoad: (index) => set(state => ({
      categories: {
        ...state.categories,
        [index]: {
          ...loaderCategory,
          index
        }
      }
  })),
  toggleCategoryLock: (index) => set(state => ({
    categories: {
      ...state.categories,
      [index]: {
        ...state.categories[index],
        locked: true,
      },
    }
  })),
  completeClue: (categoryIndex: number, questionIndex: number) => set(state => ({
    categories: {
      ...state.categories,
      [categoryIndex]: {
        ...state.categories[categoryIndex],
        clues:
          questionIndex === 0 
          // put item at front
            ? [{ ...state.categories[categoryIndex].clues[questionIndex], complete: true }]
                .concat(state.categories[categoryIndex].clues.slice(1))
            : questionIndex === state.categories[categoryIndex].clues.length - 1
              // put item last
                ? state.categories[categoryIndex].clues.slice(0, questionIndex)
                    .concat([{ ...state.categories[categoryIndex].clues[questionIndex], complete: true }])
              // put item in middle
                : state.categories[categoryIndex].clues.slice(0, questionIndex)
                    .concat(
                      [{ ...state.categories[categoryIndex].clues[questionIndex], complete: true }],
                      state.categories[categoryIndex].clues.slice(questionIndex + 1)
                    ),
      },
    },
  })),
  final: null,
  setFinal: (final) => set(state => ({
    final: final,
  })),
}));

