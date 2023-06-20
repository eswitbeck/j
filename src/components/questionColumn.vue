<script setup lang="ts">
import { computed } from 'vue';
import Question from './question.vue';
const props = defineProps({
  questionList: Object
});
</script>

<template>
  <div class="question-column">
    <div class="box category">
      <p>
        {{ props.questionList.title.toUpperCase() }}
      </p>
    </div>
    <div>
      <Question v-for="clue in props.questionList.clues" :clue="clue"/>
    </div>
  </div>
</template>

<style lang="scss">
@use '../variables.scss' as *;

.box {
  height: $boxHeight;
  width: $boxWidth;
  margin: $internalMargin;
  border: $border; 
  padding: $internalPadding;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $lightBlue;
  color: $yellow;
}

.box.category {
  margin-bottom: $internalMargin;
  color: $primaryWhite;
  p {
    text-align: center;
    font-family: sans-serif;
  }
}

</style>
