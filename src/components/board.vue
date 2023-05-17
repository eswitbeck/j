<script setup lang="ts">
import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import QuestionColumn from './questionColumn.vue';
const getRandomCategory: () => number = () => Math.round(Math.random() * 28163);

const categories: number[] = Array(6).fill(null)
  .map(() => getRandomCategory());

/* TODO debug this interface */
interface queryStorage {
  queryString: string | undefined;
  queryFn?: <TData extends unknown>() => Promise<TData>;
  data?: object;
  isLoading?: Ref<false> | Ref<true>;
  isError?: Ref<false> | Ref<true>;
  isSuccess?: Ref<false> | Ref<true>;
}

const queryKeys: Map<number, queryStorage> = new Map();
categories.map(categoryKey => { 
  queryKeys.set(
    categoryKey,
    {
      queryString: 'https://jservice.io/api/category?id=' + categoryKey.toString()
    })
  });

Array.from(queryKeys.entries()).map(([categoryKey,{ queryString }]) => {
  const queryFn = async () => {
    const data = await fetch(queryString, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return await data.json();
  }
  const { data, isLoading, isError, isSuccess } = useQuery(
    [categoryKey.toString()],
    queryFn
  );
  queryKeys.set(categoryKey, {
    ...queryKeys.get(categoryKey),
    data,
    isLoading,
    isError,
    isSuccess
  });
});

const questionLists = ref(Array.from(queryKeys.values()));
</script>

<template>
  <div id="board">
    <div class="board-frame">
      <QuestionColumn
        v-for="questionList in questionLists"
        :questionList="questionList"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

#board {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.board-frame {
  display: flex;
  padding: 15px;
  justify-content: center;
  border: black 1px solid;
}
</style>
}
