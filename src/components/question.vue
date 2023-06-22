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
};
</script>

<template>
  <div
    v-if="props.clue?.value"
    @click="handleClick"
    class="box question"
  >
    {{ props.clue.complete ? '' : '$' + props.clue.value }}
  </div>
  <div v-else class="box question">
  </div>
</template>
