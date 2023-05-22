<script setup lang="ts">
import { computed, watch } from 'vue';
import { useGameStore } from '../stores/gameSlice';
import { useQuestionStore } from '../stores/questionsSlice';
import { getCategory } from '../utils/getCategory';
import QuestionColumn from './questionColumn.vue';
import QuestionDisplay from './questionDisplay.vue';

const { boardState } = useGameStore();
const { categories, setCategory } = useQuestionStore();

const asyncSet = async (i) => {
  setCategory.value(await getCategory(), i);
  console.log(categories.value);
}

for (let i = 0; i < 6; i++) {
  asyncSet(i);
}

const categoryArray = computed(() => Object.values(categories.value));
watch(categoryArray, () => console.log(categoryArray.value));


</script>

<template>
  <div id="board">
    <div class="board-frame">
      <QuestionColumn
        v-if="boardState === 'select_single'"
        v-for="questionList in categoryArray"
        :questionList="questionList"
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
}
