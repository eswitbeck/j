<script setup lang="ts">
import { ref } from 'vue';
import { useGameStore } from '../stores/gameSlice';
const { setBoardState, setCurrentQuestion } = useGameStore();
const props = defineProps({
  clue: Object
});
// let status = ref(0);
// const toggle = () => status.value = (status.value + 1) % 3;
const handleClick = () => {
  setBoardState.value("reading");
  setCurrentQuestion.value(props.clue);
};
</script>

<template>
  <!--<div v-if="status === 1" @click="toggle" class="box question">
    {{ props.clue.question }}
  </div>
  <div v-else-if="status === 2" @click="toggle" class="box question">
    {{ props.clue.answer }}
  </div>-->
  <div @click="handleClick" class="box question">
    {{ '$' + props.clue.value }}
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
