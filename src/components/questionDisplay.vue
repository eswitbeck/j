<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGameStore } from '../stores/gameSlice';
const { setBoardState, currentQuestion } = useGameStore();
let status = ref(0);
const toggle = () => status.value = (status.value + 1) % 3;
// watch status to fire setBoardState
watch(status, () => status.value === 2 ? setBoardState.value("select_single") : null);
</script>

<template>
<div class="question-display" @click="toggle">
  <p v-if="status === 0">
    {{ currentQuestion.question }}
  </p>
  <p v-else-if="status === 1">
    {{ currentQuestion.answer }}
  </p>
</div>
</template>

<style scoped lang="scss">
.question-display {
  --margin: 5px;
  --extra-margin: 15px;
  --height: 90px;
  --width: 150px;
  height: calc(6 * var(--height) + 3 * var(--margin));
  width: calc(6 * (var(--width) + var(--margin)));
  border: solid black 1px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}
</style>

