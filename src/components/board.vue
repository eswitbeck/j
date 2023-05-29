<script setup lang="ts">
import { computed, watch } from 'vue';
import { useGameStore } from '../stores/gameSlice';
import { useQuestionStore } from '../stores/questionsSlice';
import { getCategory } from '../utils/getCategory';
import QuestionColumn from './questionColumn.vue';
import QuestionDisplay from './questionDisplay.vue';

const { boardState } = useGameStore();
const { categories, setCategory } = useQuestionStore();

const asyncSetCategory = async (i) => {
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

// retrieve and set six categories
for (let i = 0; i < 6; i++) {
  asyncSetCategory(i);
}

const categoryArray = computed(() => Object.values(categories.value));

</script>

<template>
  <div id="board">
    <div class="board-frame">
      <QuestionColumn
        v-if="boardState === 'select_single' || boardState === 'select_double'"
        v-for="questionList in categoryArray"
        :questionList="questionList"
        :key="questionList.index"
      />
      <QuestionDisplay v-else-if="boardState === 'reading'" />
    </div>
  </div>
</template>

<style scoped lang="scss">

#board {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.board-frame {
  display: flex;
  padding: 15px;
  justify-content: center;
  border: black 1px solid;
}
</style>
