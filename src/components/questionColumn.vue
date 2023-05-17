<script setup lang="ts">
import { computed } from 'vue';
import Question from './question.vue';
const props = defineProps({
  questionList: Object
});

const isLoading = computed(() => props.questionList.isLoading);
const isError = computed(() => props.questionList.isError);
const data = computed(() => props.questionList.data);
</script>

<template>
  <div class="question-column">
    <div class="box category">
      <p v-if="isLoading">
        Loading...
      </p>
      <p v-if="isError">
        Error!
      </p>
      <p v-else-if="data">
        {{ data.title.toUpperCase() }}
      </p>
    </div>
    <div v-if="isLoading" class="questions">
      <div v-for="i in 5" :key="i" class="box question">
        loading...
      </div>
    </div>
    <div v-else-if="isError">
      <div v-for="i in 5" :key="i" class="box question">
        Error!
      </div>
    </div>
    <div v-else-if="data">
      <Question v-for="clue in data.clues" :clue="clue"/>
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
}

</style>
