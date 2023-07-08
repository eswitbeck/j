<script setup lang="ts">
import { computed } from 'vue';
import Question from './question.vue';
import { asyncSetCategory } from '../utils/getCategory';
import { useQuestionStore } from '../stores/questionsSlice';

const props = defineProps({
  questionList: Object,
  secondIndex: Number
});

const { setCategoryToLoad } = useQuestionStore();
const handleReload = () => {
  const { index } = props.questionList;
  console.log(index, props.secondIndex);
  setCategoryToLoad.value(index);
  asyncSetCategory(index);
}

</script>

<template>
  <div class="question-column">
    <div class="box category">
      <p>
        {{ props.questionList.title.toUpperCase() }}
      </p>
      <button @click="handleReload">
        reset
      </button>
    </div>
    <div>
      <Question v-for="clue in props.questionList.clues" :clue="clue"/>
    </div>
  </div>
</template>

<style lang="scss">
@use '../variables.scss' as *;

.box.category button {
  position: absolute;
  top: 5px;
  left: calc($boxWidth - 70px);
}

.box {
  height: $boxHeight;
  width: $boxWidth;
  max-width: $maxQuestion;
  margin: $internalMargin;
  border: $border; 
  padding: $internalPadding;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $lightBlue;
  color: $yellow;
  font-size: 2em;
  font-weight: 900;
}

.box.category {
  margin-bottom: $internalMargin;
  color: $primaryWhite;
  position: relative;
  p {
    text-align: center;
    font-family: sans-serif;
    font-size: 1.25rem;
  }
}

</style>
