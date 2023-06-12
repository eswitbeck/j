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
    >
    <p>${{ props.player.winnings }}</p>
    <p>{{ props.player.name }}</p>
  </div>
</template>

<style scoped lang="scss">
.player {
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr; /* grid template names? */
  align-items: center;
  padding: 5px;
  p {
    text-align: center;
  }
  button {
    border-radius: 5px;
  }
  button.correct {
    background-color: green;
  }
  button.incorrect {
    background-color: red;
  }
}

.player:nth-of-type(even) {
  background-color: lightgrey;
}

.player.reading {
  grid-template-columns: 1fr 1fr 2fr 4fr;
}

.player.final {
  grid-template-columns: 1fr 1fr 2fr 2fr 4fr;
}


</style>
