<script setup lang="ts">
const boardStore = useBoardStore();
const router = useRouter();
const newTaskName = ref("");

const props = defineProps({
  column: {
    type: Object,
    required: true,
  },
  columnIndex: {
    type: Number,
    required: true,
  },
});
const editNameState = ref(false);
const deleteColumn = (columnIndex) => {
  boardStore.deleteColumn(columnIndex);
};
const goToTask = (taskID) => {
  router.push(`/tasks/${taskID}`);
};
const addTask = () => {
  boardStore.addTask({
    taskName: newTaskName.value,
    columnIndex: props.columnIndex,
  });
  newTaskName.value = "";
};
const pickupTask = (event, { fromColumnIndex, fromTaskIndex }) => {
  // console.log("pickup event",event)
  // The effect that we are allowing is to move
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  //take a key and a value that can be setted and acces later on
  event.dataTransfer.setData("from-column-index", fromColumnIndex);
  event.dataTransfer.setData("from-task-index", fromTaskIndex);
};
const dropTask = (event, toColumnIndex) => {
  //Is getting the data that are passed in the pickupTask function
  const fromColumnIndex = event.dataTransfer.getData("from-column-index");
  const fromTaskIndex = event.dataTransfer.getData("from-task-index");

  boardStore.moveTask({
    taskIndex: fromTaskIndex,
    fromColumnIndex,
    toColumnIndex,
  });
};
</script>
<template>
  <UContainer
    class="column"
    @dragenter.prevent
    @dragover.prevent
    @drop.stop="dropTask($event, columnIndex)"
  >
    <div class="column-header mb-4">
      <div>
        <UInput
          v-if="editNameState"
          v-model="column.name"
          type="text"
          placeholder="edit column name"
        />
        <h2 v-else class="mb-4">{{ column.name }}</h2>
      </div>
      <div>
        <UButton
          class="bg-emerald-500 mr-2"
          icon="mdi:pencil-box"
          @click="editNameState = !editNameState"
        />
        <UButton
          class="bg-red-500"
          icon="mdi:trash-can"
          @click="deleteColumn(columnIndex)"
        />
      </div>
    </div>
    <ul>
      <li v-for="(task, taskIndex) in column.tasks" :key="task.id">
        <UCard
          class="mb-4 bg-white"
          @click="goToTask(task.id)"
          draggable="true"
          @dragstart="
            pickupTask($event, {
              fromColumnIndex: columnIndex,
              fromTaskIndex: taskIndex,
            })
          "
        >
          <strong>{{ task.name }}</strong>
          <p>{{ task.description }}</p>
        </UCard>
      </li>
    </ul>
    <UInput
      v-model="newTaskName"
      type="text"
      placeholder="create new task"
      icon="mdi:plus-circle"
      @keyup.enter="addTask"
    />
  </UContainer>
</template>
