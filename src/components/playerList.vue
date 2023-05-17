<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { Player } from '../types';

const mockPlayers: Ref<Player[]> = ref([
  {
    name: 'Me',
    winnings: 200,
    position: 1,
    id: 'sss',
  },
  {
    name: 'Eric',
    winnings: 2000,
    position: 0,
    id: 'scs',
  }
]);
</script>
<template>
  <div id="player-list">
    <div class="player" v-for="player in mockPlayers">
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
