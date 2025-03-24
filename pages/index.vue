<script setup>
import { UContainer, UInput } from "#components";

const boardStore = useBoardStore();

const route = useRoute();

const router = useRouter();

const newColumnName = ref("");

const isModalOpen = computed(() => route.name === "index-tasks-id");

const addColumn = () => {
  boardStore.addColumn(newColumnName.value);
  newColumnName.value = "";
};
const closeModal = () => {
  router.push("/");
};
</script>
<template>
  <div class="board-wrapper">
    <main class="board overflow-auto">
      <BoardColumn
        v-for="(column, columnIndex) in boardStore.board.columns"
        :key="column.id"
        class="column"
        :column="column"
        :columnIndex="columnIndex"
      />
      <UContainer class="column">
        <UInput
          v-model="newColumnName"
          type="text"
          placeholder="create new column"
          icon="mdi:plus-circle"
          @keyup.enter="addColumn"
        />
      </UContainer>
    </main>
    <div v-show="isModalOpen" class="task-bg" @click.self="closeModal">
      <NuxtPage :key="route.fullPath" />
    </div>
  </div>
</template>
