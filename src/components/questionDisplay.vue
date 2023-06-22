<script setup lang="ts">
import { ref, watch } from 'vue';
import { useGameStore } from '../stores/gameSlice';
import { usePlayerStore } from '../stores/playerSlice';
import { useQuestionStore } from '../stores/questionsSlice';

import { getDouble } from '../utils/getCategory';

const { boardState, setBoardState, mode, setMode, currentQuestion } = useGameStore();
const { players, includeWinnings, setPlayerGuessStatus } = usePlayerStore();
const { categories, completeClue } = useQuestionStore();

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
  completeClue.value(currentQuestion.value.categoryIndex,
               currentQuestion.value.questionIndex);

  // reset for next question
  correct.concat(incorrect).map(({ id }) => setPlayerGuessStatus.value('abstain', id));
  // either set to single or, if done, double
  const flatClues = Object.values(categories.value).map(c => c.clues).flat();
  if (flatClues.some(c => !c.complete)) setBoardState.value(mode.value);
  else {
    if (mode.value === 'select_single') { // from single to double
      getDouble();
      setMode.value('select_double');
    } else {
      setMode.value('final');
    }
  }
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
@use '../variables.scss' as *;

.question-display {
  height: $displayHeight;
  width: $displayWidth;
  border: $border;
  margin: $internalMargin;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: $internalPadding;
  box-sizing: border-box;
  color: $secondaryWhite;
  background-color: $lightBlue;
  
  p {
    text-align: center;
  }
}
</style>

