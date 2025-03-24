<script setup lang="ts">
const boardStore = useBoardStore();
const route = useRoute();
const router = useRouter();
const toast = useToast()
const task = computed(() => boardStore.getTask(route.params.id));

const deleteTask = () => (
 toast.add({
  title: "Task Deleted",
  description: `${task.value.name} has been deleted`,
  icon: "mdi:trash-can",
  color: "error",
 }), boardStore.deleteTask(route.params.id), router.push("/")
);

</script>

<template>
  <div class="task-wrapper">
    <div v-if="task" class="task-view">
      <UFormField label="Name" class="w-full mb-4">
        <UInput
          v-model="task.name"
          class="w-full"
          type="text"
          placeholder="edit task name"
        />
      </UFormField>
      <UFormField label="Description" class="w-full mb-4">
        <UTextarea
          v-model="task.description"
          class="w-full"
          placeholder="edit task description"
        />
      </UFormField>
      <UButton class="bg-red-500" icon="mdi:trash-can" @click="deleteTask"
        >Delete Task</UButton
      >
    </div>
    <div v-else>
      <h1>Task not found</h1>
    </div>
  </div>
</template>
