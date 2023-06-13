<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Ref } from 'vue';
import type { Player } from '../types';
import { usePlayerStore } from '../stores/playerSlice';
import { useGameStore } from '../stores/gameSlice';

const { players, setPlayerGuessStatus } = usePlayerStore();
const { boardState } = useGameStore();

const props = defineProps({
  player: Object
});

const status = computed(() => players.value[props.player.id].guessStatus);
const finalBet = computed(() => players.value[props.player.id].finalBet);

const handleCorrect = id => {
  if (status.value === 'correct') setPlayerGuessStatus.value('abstain', id);
  else setPlayerGuessStatus.value('correct', id);
}
const handleIncorrect = id => {
  if (status.value === 'incorrect') setPlayerGuessStatus.value('abstain', id);
  else setPlayerGuessStatus.value('incorrect', id);
}

const handleBet = bet => {
// TODO replace with state update
  console.log(bet);
  console.log(finalBet.value);
}

// computed for legal state for correct/not
const inputting = computed(() => (boardState.value === 'reading' ||
                                 boardState.value === 'final'));

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
      v-model="bet"
      @input="() => handleBet(bet)"
    >
    <p class="amount">${{ props.player.winnings }}</p>
    <p class="name">{{ props.player.name }}</p>
  </div>
</template>

<style scoped lang="scss">
.player {
  display: grid;
  gap: 5px;
  grid-template-areas: ". . . . amount amount name name name name";
  align-items: center;
  padding: 5px;
  p {
    text-align: center;
  }
  .name {
    grid-area: name;
  }
  .amount {
    grid-area: amount;
  }
  button.correct {
    grid-area: correct;
    background-color: green;
  }
  button.incorrect {
    grid-area: incorrect;
    background-color: green;
    background-color: red;
  }
  input {
    grid-area: "input";
  }
}

.player:nth-of-type(even) {
  background-color: lightgrey;
}

.player.reading {
  grid-template-areas: "correct incorrect . . amount amount name name name name";
}

.player.final {
  grid-template-areas: "correct incorrect input input amount amount name name name name";
}

</style>
