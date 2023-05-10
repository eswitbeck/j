<script setup lang="ts">
import QuestionColumn from '../questionColumn/questionColumn.vue';
</script>

<template>
  <div id="board">
    <QuestionColumn />
    <QuestionColumn />
    <QuestionColumn />
    <QuestionColumn />
    <QuestionColumn />
    <QuestionColumn />
  </div>
</template>

<style scoped lang="scss">
#board {
  display: flex;
  padding: 15px;
  justify-content: center;
  border: black 1px solid;
}
</style>
