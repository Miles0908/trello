<script setup lang="ts">
const boardStore = useBoardStore();
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

const deleteColumn = (columnIndex) => {
  boardStore.deleteColumn(columnIndex);
};

const addTask = () => {
  boardStore.addTask({
    taskName: newTaskName.value,
    columnIndex: props.columnIndex,
  });
  newTaskName.value = "";
};

const pickupColumn = (event, fromColumnIndex) => {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("type", "column");
  event.dataTransfer.setData("from-column-index", fromColumnIndex);
};

const dropItem = (event, { toColumnIndex, toTaskIndex }) => {
  const type = event.dataTransfer.getData("type");
  const fromColumnIndex = event.dataTransfer.getData("from-column-index");

  if (type === "task") {
    const fromTaskIndex = event.dataTransfer.getData("from-task-index");
    boardStore.moveTask({
      fromTaskIndex,
      toTaskIndex,
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

const pickupTask = (event, { fromColumnIndex, fromTaskIndex }) => {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("type", "task");
  event.dataTransfer.setData("from-column-index", fromColumnIndex);
  event.dataTransfer.setData("from-task-index", fromTaskIndex);
};

const deleteTask = (taskId: string) => {
  boardStore.deleteTask(taskId);
};
</script>

<template>
  <UContainer
    class="column mx-0!"
    draggable="true"
    @dragstart.self="pickupColumn($event, columnIndex)"
    @dragenter.prevent
    @dragover.prevent
    @drop.stop="dropItem($event, { toColumnIndex: columnIndex })"
  >
    <!-- HEADER COLUMN -->
    <div class="column-header mb-4">
      <div>
        <h2 class="my-2">{{ column.name }}</h2>
      </div>
      <div>
        <UButton
          class="bg-transparent text-neutral hover:bg-background-status-highest"
          icon="mdi:trash-can"
          @click="deleteColumn(columnIndex)"
        />
      </div>
    </div>
    <!-- TASKS -->
    <ul>
      <Task
        v-for="(task, taskIndex) in column.tasks"
        :key="task.id"
        :task="task"
        :from-column-index="columnIndex"
        :from-task-index="taskIndex"
        @pickup-task="pickupTask"
        @drop-item="dropItem"
        @delete-task="deleteTask"
      />
    </ul>
    <!-- ADD TASK -->
    <div>
      <CustomInput
        v-model="newTaskName"
        input-class="input-task"
        placeholder="Add another task"
        icon="material-symbols:add-rounded"
        @enter="addTask"
      />
    </div>
  </UContainer>
</template>
