<script setup lang="ts">
import Board from './components/board.vue';
import Players from './components/players.vue';
</script>

<template>
  <header>
    <h1>j</h1>
    <h2>
      (the j stands for jService (the j stands for J! Archive (the J! stands for
      Jeopardy!)))
    </h2>
  </header>
  <main>
    <Board />
    <Players />
  </main>
  <footer>
    Built with Vue, Vue Query, Zustand, and love ❤️
  </footer>
</template>

<style lang="scss">
@use 'variables' as *;

body {
  margin: 0;
  padding: 0;
}

header {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: $border; 
  * {
    margin: $internalMargin;
  }
}

main {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 60%  1fr;
}

footer {
  border-top: $border;
  padding: $externalPadding;
  display: flex;
  align-items: center;
  justify-content: center;
}

</style>
