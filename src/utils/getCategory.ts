import { useQuestionStore } from '../stores/questionsSlice.ts';

const getRandomCategory = (): number => Math.round(Math.random() * 28163);
const url = (num: number): string => `https://jservice.io/api/category?id=${ num.toString() }`;
const getQuestionData = async (url: string) => (
  await fetch(url, {
    headers: {
      "content-type": "application/json"
    }
  }).then(res => res.json())
);

export const getCategory = async () => {
  const category = await getQuestionData(url(getRandomCategory()));
  if (category.clues_count < 5) return getCategory();
  else if (category.clues_count === 5) return category;
  else if (category.clues_count % 5 === 0) {
    const categoryCount = (category.clues_count / 5);
    const startIndex = Math.round(Math.random() * (categoryCount - 1)) * 5; 
    return { ...category, clues: category.clues.slice(startIndex, startIndex + 5) };
  } else return getCategory();
}
