<script setup lang="ts">
</script>

<template>
  <div class="question-column">
    <div class="box category">
      Title
    </div>
    <div class="questions">
      <div class="box question">
      </div>
      <div class="box question">
      </div>
      <div class="box question">
      </div>
      <div class="box question">
      </div>
      <div class="box question">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.question-column {
}

.box {
  height: 90px;
  width: 150px;
  margin: 2px;
  border: solid 1px black;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.box.question {
}

.box.category {
  margin-top: 25px;
  margin-bottom: 25px;
}

</style>
