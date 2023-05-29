<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from '../stores/gameSlice';
const { setBoardState, setCurrentQuestion } = useGameStore();
const props = defineProps({
  clue: Object
});

const handleClick = () => {
  setBoardState.value("reading");
  setCurrentQuestion.value(props.clue);
  console.log(props.clue);
};
</script>

<template>
  <div @click="handleClick" class="box question">
    {{ props.clue.complete ? '' : '$' + props.clue.value }}
  </div>
</template>

<style scoped lang="scss">
.box {
  height: 90px;
  width: 150px;
  margin: 5px;
  border: solid 1px black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box.question {
}

</style>
