<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import type { Ref } from 'vue';
import type { Player } from '../types';
import { usePlayerStore } from '../stores/playerSlice';
import { useGameStore } from '../stores/gameSlice';

const { players, setPlayerGuessStatus, setFinalBet } = usePlayerStore();
const { boardState } = useGameStore();

const props = defineProps({
  player: Object
});

const status = computed(() => players.value[props.player.id].guessStatus);
const finalBet = computed(() => players.value[props.player.id].finalBet);
const winnings = computed(() => players.value[props.player.id].winnings);

const handleCorrect = id => {
  if (status.value === 'correct') setPlayerGuessStatus.value('abstain', id);
  else setPlayerGuessStatus.value('correct', id);
}
const handleIncorrect = id => {
  if (status.value === 'incorrect') setPlayerGuessStatus.value('abstain', id);
  else setPlayerGuessStatus.value('incorrect', id);
}

// computed for legal state for correct/not
const inputting = computed(() => (boardState.value === 'reading' ||
                                 boardState.value === 'final'));

const bet = ref(0);

const handleInput = (e) => {
  const newBet = e.target.value;
  if (Number(newBet) <= 0 || winnings.value < 0) {
    bet.value = 0;
  } else if (Number(newBet) > winnings.value) {
    bet.value = winnings.value;
  } else {
    bet.value = e.target.value;
  }
  setFinalBet.value(Number(bet.value), props.player.id)
  e.target.value = bet.value;
}

</script>

<template>
  <div :class="{
    player: true,
    reading: boardState === 'reading',
    final: boardState === 'final'
  }">
    <button
      v-if="inputting"
      @click="() => handleCorrect(props.player.id)"
      :class="{ correct: status === 'correct' }"
    >
      &check;
    </button>
    <button
      v-if="inputting"
      @click="() => handleIncorrect(props.player.id)"
      :class="{ incorrect: status === 'incorrect' }"
    >
      x
    </button>
    <input
      v-if="boardState === 'final'"
      type="number"
      min=0
      max="winnings"
      value="bet"
      @input="handleInput"
    >
    <p class="amount">${{ props.player.winnings }}</p>
    <p class="name">{{ props.player.name }}</p>
  </div>
</template>

<style scoped lang="scss">
@use '../variables.scss' as *;

.player {
  display: grid;
  gap: $internalMargin;
  grid-template-areas: ". . . . amount amount name name name name";
  align-items: center;
  padding: $internalMargin;
  p {
    text-align: center;
  }
  .name {
    grid-area: name;
  }
  .amount {
    grid-area: amount;
  }
  button, button.correct, button.incorrect {
    padding: $internalPadding;
    border: none;
  }
  button.correct {
    grid-area: correct;
    background-color: $green;
  }
  button.incorrect {
    grid-area: incorrect;
    background-color: $red;
  }
  input {
    grid-area: "input";
  }
}

.player {
  background-color: $primaryGrey;
}
.player:nth-of-type(even) {
  background-color: $tertiaryGrey;
}

.player.reading {
  grid-template-areas: "correct incorrect . . amount amount name name name name";
}

.player.final {
  grid-template-areas: "correct incorrect input input amount amount name name name name";
}

</style>
