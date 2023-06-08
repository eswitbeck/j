/*
 * Randomly select and query 5 categories, rejecting any that don't include a
 * minimum of 5 questions and only selecting a subset of 5 from larger sets
 * getCategory :: () -> Category
 */


import { useGameStore } from '../stores/gameSlice';
import { useQuestionStore } from '../stores/questionsSlice';
const { boardState } = useGameStore();
const { setCategory } = useQuestionStore();

const getRandomCategory = (): number => Math.round(Math.random() * 28163);
const url = (num: number): string => `https://jservice.io/api/category?id=${ num.toString() }`;
const getQuestionData = async (url: string) => (
  await fetch(url, {
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json())
);

const getCategory = async () => {
  const category = await getQuestionData(url(getRandomCategory()));
  if (category.clues_count < 5) return getCategory();
  else if (category.clues_count === 5) return category;
  else if (category.clues_count % 5 === 0) {
    const categoryCount = (category.clues_count / 5);
    const startIndex = Math.round(Math.random() * (categoryCount - 1)) * 5; 
    return { ...category, clues: category.clues.slice(startIndex, startIndex + 5) };
  } else return getCategory();
}

export const asyncSetCategory = async (i) => {
  const category = await getCategory();
  category.clues = category.clues.slice()
    // standardize value
    .map((clue, j) => ({
      ...clue,
      value: (j + 1) * 200 * (boardState.value === "select_double" ? 2 : 1),
      complete: false,
      categoryIndex: i,
      questionIndex: j,
    }));
  setCategory.value(category, i);
}
