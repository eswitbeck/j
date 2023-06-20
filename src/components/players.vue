<script setup lang="ts">
import { ref } from 'vue';
import { nanoid } from 'nanoid';
import PlayerList from './playerList.vue';
const playerName: Ref<string> = ref('');
import { usePlayerStore } from '../stores/playerSlice';

const { players, addPlayer } = usePlayerStore();
const handleClick = () => {
  if (!playerName.value) return;
  addPlayer.value(playerName.value, nanoid());
  playerName.value = '';
}

</script>
<template>
  <div id="players">
    <div class="inner">
      <span> 
        <input v-model="playerName" placeholder="Name" />
        <button @click="handleClick">Add Player</button>
      </span>
      <PlayerList />
    </div>
  </div>
</template>
<style lang="scss">
@use '../variables.scss' as *;

#players {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $externalPadding;
  margin: $externalMargin;
  border: $border;

  .inner {
    width: 100%;
    border: $border;
    > * {
      display: flex;
      flex-direction: column;
      align-items: space-evenly;
      margin: $internalMargin;
      > * {
        margin: $internalMargin;
      }
    }
  }


}
</style>
