<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Player } from '../types';
import { usePlayerStore } from '../stores/playerSlice';

const { players, setPlayerGuessStatus } = usePlayerStore();
const handleCorrect = id => setPlayerGuessStatus.value('correct', id);
const handleIncorrect = id => setPlayerGuessStatus.value('incorrect', id);
</script>

<template>
  <div id="player-list">
    <div class="player" v-for="player in Object.values(players)">
      <button @click="() => handleCorrect(player.id)" setPlayer>&check;</button>
      <button @click="() => handleIncorrect(player.id)">x</button>
      <p>${{ player.winnings }}</p>
      <p>{{ player.name }}</p>
    </div>
  </div>
</template>

<style lang="scss">
#player-list {
}

.player {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
}

.player:nth-of-type(even) {
  background-color: lightgrey;
}
</style>
