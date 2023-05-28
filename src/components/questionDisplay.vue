<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGameStore } from '../stores/gameSlice';
import { usePlayerStore } from '../stores/playerSlice';
const { setBoardState, currentQuestion } = useGameStore();
const { players, includeWinnings, setPlayerGuessStatus } = usePlayerStore();

let status = ref(0);
// 0 is display question
// 1 is display answer
// 2 is return to board and reset
const toggle = () => status.value = (status.value + 1) % 3;

const handleQuestionEnd = () => {
  const playersArray = Object.values(players.value);
  const correct = playersArray.filter(p => p.guessStatus === 'correct');
  const incorrect = playersArray.filter(p => p.guessStatus === 'incorrect');
  // add to correct guesses
  correct.map(p => {
    includeWinnings.value(currentQuestion.value.value, p.id);
  });
  // subtract from incorrect
  incorrect.map(p => {
    includeWinnings.value((-1) * currentQuestion.value.value, p.id);
  });
  // complete currentQuestion
  console.log(currentQuestion.value);

  // reset for next question
  correct.concat(incorrect).map(({ id }) => setPlayerGuessStatus.value('abstain', id));
  setBoardState.value("select_single");
}

watch(status, () => {
  if(status.value === 2) handleQuestionEnd();
});

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
  
  p {
    text-align: center;
  }
}
</style>

