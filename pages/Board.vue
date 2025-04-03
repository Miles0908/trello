<script setup>
const boardStore = useBoardStore();

const router = useRouter();
</script>
<template>
  <div class="board-wrapper">
    <!-- HEADER -->
    <div class="text-xl text-inverted my-6 flex items-center">
      <UIcon
        class="hover:text-neutral duration-200"
        @click="() => router.push('/')"
        name="material-symbols:arrow-back-ios-rounded"
        size="26"
      />
      <strong class="hover:text-neutral duration-200 text-3xl">
        <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          {{ boardStore.board.name }}
        </a></strong
      >
    </div>
    <!-- Column -->
    <main class="scrollbar board custom overflow-auto h-dvh w-full flex gap-4">
      <BoardColumn
        v-for="(column, columnIndex) in boardStore.board.columns"
        :key="column.id"
        class="column"
        :column="column"
        :columnIndex="columnIndex"
      />
      <AddNewList />
    </main>
  </div>
</template>

<style scoped>
.scrollbar::-webkit-scrollbar {
  display: none;
}

.scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.custom {
  margin-left: calc(-1 * var(--spacing) * 16);
  margin-right: calc(-1 * var(--spacing) * 12);
  padding-left: calc(var(--spacing) * 16);
  padding-right: calc(var(--spacing) * 12);
  width: calc(100% + (var(--spacing) * 28));
  box-sizing: border-box;
}
</style>
