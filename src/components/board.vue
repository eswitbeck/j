<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import { useGameStore } from '../stores/gameSlice';
import QuestionColumn from './questionColumn.vue';
import QuestionDisplay from './questionDisplay.vue';

import { getCategory } from '../utils/getCategory';
(() => getCategory().then(d => console.log(d)))();

const questionLists = ref(new Array(6));

const { boardState } = useGameStore();
</script>

<template>
  <div id="board">
    <div class="board-frame">
      <QuestionColumn
        v-if="boardState === 'select_single'"
        v-for="questionList in questionLists"
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
