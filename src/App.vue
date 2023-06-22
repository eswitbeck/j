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
    Built with Vue + Zustand
  </footer>
</template>

<style lang="scss">
@use 'variables' as *;

body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

#app {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15% 1fr 10%;
  height: 100%;
}

header {
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: $darkBlue;
  color: $primaryWhite;
  * {
    margin: $internalMargin;
  }
}

main {
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 60%  1fr;
  background-color: $tertiaryGrey;
}

footer {
  padding: $externalPadding;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $secondaryGrey;
}

</style>
