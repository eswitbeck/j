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
        <button @click="handleClick">Add</button>
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
  justify-content: center;
  padding: $externalPadding;
  border: none;
  box-sizing: border-box;
  height: 100%;

  .inner {
    height: calc($displayHeight + 2 * $externalPadding);
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
    > span {
     flex-direction: row;
     justify-content: space-between;
     input {
       width: 100%;
     }
   }
  }


}
</style>
