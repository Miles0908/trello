<script setup>
const boardStore = useBoardStore();

const route = useRoute();

const router = useRouter();

const isModalOpen = computed(() => route.name === "index-tasks-id");

const closeModal = () => {
  router.push("/board");
};
</script>
<template>
  <div class="board-wrapper">
    <div class="text-xl text-inverted my-6 flex items-center">
      <UIcon
        class="hover:text-neutral duration-200"
        @click="() => router.push('/')"
        name="material-symbols:arrow-back-ios-rounded"
        size="28"
      />
      <strong class="hover:text-neutral duration-200 text-3xl">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          {{ boardStore.board.name }}
        </a></strong
      >
    </div>
    <main class="board overflow-auto w-full flex gap-2.5">
      <BoardColumn
        v-for="(column, columnIndex) in boardStore.board.columns"
        :key="column.id"
        class="column"
        :column="column"
        :columnIndex="columnIndex"
      />
      <AddNewList />
    </main>
    <div v-show="isModalOpen" class="task-bg" @click.self="closeModal">
      <NuxtPage :key="route.fullPath" />
    </div>
  </div>
</template>
