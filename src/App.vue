<script setup lang="ts">
import Board from './components/board/board.vue';
</script>

<template>
<header>
  <h1>j</h1>
  <h2>
    (The j stands for jService (the j stands for J! Archive (the J! stands for
    Jeopardy!)))
  </h2>
</header>
<main>
  <Board />
  <div id="players">
    <input name="name" value="" placeholder="Name" />
    <button>Add Player</button>
    <div id="player-list">
    </div>
  </div>
</main>
<footer>
</footer>

</template>

<style lang="scss">

body {
  margin: 0;
  padding: 0;
}

header {
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px black;
}

main {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 3fr 1fr;
}

#players {
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
