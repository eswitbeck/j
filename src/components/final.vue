<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGameStore } from '../stores/gameSlice';
import { usePlayerStore } from '../stores/playerSlice';
import { useQuestionStore } from '../stores/questionsSlice';

import { getFinal } from '../utils/getCategory';

const { boardState, setBoardState, mode, setMode, currentQuestion } = useGameStore();
const { players, includeWinnings, setPlayerGuessStatus } = usePlayerStore();
const { final } = useQuestionStore();

// set final category
getFinal();

let status = ref(0);
// 0 is display category
// 1 is display question
// 2 is display answer
// 3 is return to board and reset
const toggle = () => status.value = (status.value + 1) % 3;

const handleQuestionEnd = () => {
  const playersArray = Object.values(players.value);
  const correct = playersArray.filter(p => p.guessStatus === 'correct');
  const incorrect = playersArray.filter(p => p.guessStatus === 'incorrect');
  // add to correct guesses
  correct.map(p => {
    includeWinnings.value(p.finalBet, p.id);
  });
  // subtract from incorrect
  incorrect.map(p => {
    includeWinnings.value((-1) * p.finalBet, p.id);
  });
  // reset for next question
  correct.concat(incorrect).map(({ id }) => setPlayerGuessStatus.value('abstain', id));
 // TODO include final standings
}

watch(status, () => {
  if(status.value === 2) handleQuestionEnd();
});

</script>

<template>
<div class="question-display" @click="toggle">
  <p v-if="!final">
    Loading...
  </p>
  <p v-else-if="status === 0">
    {{ final.category.title }}
  </p>
  <p v-else-if="status === 1">
    {{ final.question }}
  </p>
  <p v-else-if="status === 2">
    {{ final.answer }}
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

