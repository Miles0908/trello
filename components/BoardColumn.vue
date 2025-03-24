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
  event.dataTransfer.setData("type", "task");
  event.dataTransfer.setData("from-column-index", fromColumnIndex);
  event.dataTransfer.setData("from-task-index", fromTaskIndex);
};
const dropItem = (event, toColumnIndex) => {
  //Is getting the data that are passed in the pickupTask function
  const type = event.dataTransfer.getData("type");
  const fromColumnIndex = event.dataTransfer.getData("from-column-index");

  if (type === "task") {
    const fromTaskIndex = event.dataTransfer.getData("from-task-index");

    boardStore.moveTask({
      taskIndex: fromTaskIndex,
      fromColumnIndex,
      toColumnIndex,
    });
  } else if (type === "column") {
    boardStore.moveColumn({
      fromColumnIndex,
      toColumnIndex,
    });
  }
};
const pickupColumn = (event, fromColumnIndex) => {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("type", "column");
  event.dataTransfer.setData("from-column-index", fromColumnIndex);
};
</script>
<template>
  <UContainer
    class="column"
    draggable="true"
    @dragstart.self="pickupColumn($event, columnIndex)"
    @dragenter.prevent
    @dragover.prevent
    @drop.stop="dropItem($event, columnIndex)"
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
