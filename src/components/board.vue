<script setup lang="ts">
import { computed, watch } from 'vue';
import { useGameStore } from '../stores/gameSlice';
import { useQuestionStore } from '../stores/questionsSlice';
import { asyncSetCategory } from '../utils/getCategory';
import QuestionColumn from './questionColumn.vue';
import QuestionDisplay from './questionDisplay.vue';
import FinalDisplay from './final.vue';

const { boardState } = useGameStore();
const { categories, setCategory } = useQuestionStore();

// retrieve and set six categories
for (let i = 0; i < 6; i++) {
  asyncSetCategory(i);
}

const categoryArray = computed(() => Object.values(categories.value));
const singleCategories = computed(() => Object.values(categories.value).slice(0, 6));
const doubleCategories = computed(() => Object.values(categories.value).slice(6));

</script>

<template>
  <div id="board">
    <div class="board-frame">
      <QuestionColumn
        v-if="boardState === 'select_single' || boardState === 'select_double'"
        v-for="questionList in boardState === 'select_single'
                                ? singleCategories
                                : doubleCategories"
        :questionList="questionList"
        :key="questionList.index"
      />
      <QuestionDisplay v-else-if="boardState === 'reading'" />
      <FinalDisplay v-else-if="boardState === 'final'" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../variables.scss' as *;

#board {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $externalPadding;
}

.board-frame {
  display: flex;
  padding: $internalPadding;
  justify-content: center;
  border: $border; 
}
</style>
