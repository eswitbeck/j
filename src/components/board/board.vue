<script setup lang="ts">
import QuestionColumn from '../questionColumn/questionColumn.vue';
</script>

<template>
  <div id="board">
    <div class="board-frame">
      <QuestionColumn />
      <QuestionColumn />
      <QuestionColumn />
      <QuestionColumn />
      <QuestionColumn />
      <QuestionColumn />
    </div>
  </div>
</template>

<style scoped lang="scss">

#board {
  display: flex;
  justify-content: center;
  align-items: center;
}

.board-frame {
  display: flex;
  padding: 15px;
  justify-content: center;
  border: black 1px solid;
}
</style>
}
