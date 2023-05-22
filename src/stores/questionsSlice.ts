import create from 'vue-zustand';

const loaderCategory = {
  title: 'loading...',
  clues: []
}

export const useQuestionStore = create(set => ({
  categories: {
    0: loaderCategory,
    1: loaderCategory,
    2: loaderCategory,
    3: loaderCategory,
    4: loaderCategory,
    5: loaderCategory,
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
  toggleCategoryLock: (index) => set(state => ({
    categories: {
      ...state.categories,
      [index]: {
        ...state.categories[index],
        locked: true,
      },
    }
  })),
}));

