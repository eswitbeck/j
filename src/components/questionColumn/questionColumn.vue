<script setup lang="ts">
</script>

<template>
  <div class="question-column">
    <div class="box category">
      Title
    </div>
    <div class="questions">
      <div class="box question">
        $200
      </div>
      <div class="box question">
        $400
      </div>
      <div class="box question">
        $600
      </div>
      <div class="box question">
        $800
      </div>
      <div class="box question">
        $1000
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
  margin: 5px;
  border: solid 1px black;
  display: flex;
  align-items: center;
  justify-content: center;
  
}

.box.question {
}

.box.category {
  margin-bottom: 15px;
}

</style>
