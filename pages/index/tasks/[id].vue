<script setup lang="ts">
const boardStore = useBoardStore()
const task = computed(() => boardStore.getTask(route.params.id))
const route = useRoute()
</script>

<template>
  <div class="task-wrapper">
   <div class="task-view">
    <h1>Task:{{ task.name }}</h1>
    <p>Description:{{ task?.description }}</p>
   </div>
  </div>    
</template>