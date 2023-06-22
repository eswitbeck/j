<script setup lang="ts">
import { usePlayerStore } from '../stores/playerSlice';
import PlayerBox from './player.vue';

const { players } = usePlayerStore();
</script>

<template>
  <div id="player-list">
    <PlayerBox
      v-for="player in Object.values(players)"
      :player="player"
    />
  </div>
</template>

<style lang="scss">
#player-list {
}
</style>
