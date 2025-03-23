<script setup>
import { UContainer , UInput} from "#components";

const boardStore = useBoardStore()
const newColumnName = ref('')

const addColumn = () => {
    boardStore.addColumn(newColumnName.value)
    newColumnName.value = ''
} 

</script>
<template>
    <div class="board-wrapper">
    <main class="board">
        <BoardColumn v-for="(column, columnIndex) in boardStore.board.columns" :key="column.id" class="column" :column="column"
        :columnIndex="columnIndex"
        />
        <UContainer class="column">
          <UInput v-model="newColumnName" type="text" placeholder="create new column" icon="mdi:plus-circle" @keyup.enter="addColumn" />
        </UContainer>
    </main>   
  </div>
</template>