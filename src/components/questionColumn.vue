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

.question-column {
}

.box {
  height: 90px;
  width: 150px;
  margin: 5px;
  border: solid 1px black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box.category {
  margin-bottom: 15px;

  p {
    text-align: center;
    font-family: sans-serif;
  }
}

</style>
