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

const deleteColumn = (columnIndex) => {
  boardStore.deleteColumn(columnIndex);
};

const goToTask = (taskID: string) => {
  router.push(`/board/tasks/${taskID}`);
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

const dropItem = (event, { toColumnIndex, toTaskIndex }) => {
  //Is getting the data that are passed in the pickupTask function
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

const pickupColumn = (event, fromColumnIndex) => {
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.setData("type", "column");
  event.dataTransfer.setData("from-column-index", fromColumnIndex);
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
    <ul>
      <li
        v-for="(task, taskIndex) in column.tasks"
        :key="task.id"
        class="group relative rounded shadow-[0_2px_2px_0_rgba(0,0,0,0.1)]"
      >
        <UCard
          class="mb-4 bg-white relative"
          draggable="true"
          @dragstart="
            pickupTask($event, {
              fromColumnIndex: columnIndex,
              fromTaskIndex: taskIndex,
            })
          "
          @drop.stop="
            dropItem($event, {
              toColumnIndex: columnIndex,
              toTaskIndex: taskIndex,
            })
          "
        >
          <div class="inline-block items-center justify-between">
            <TagPriority />
            <div class="flex gap-3 flex-col mt-4 mb-4">
              <strong class="text-xl">{{ task.name }}</strong>
              <p class="text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Obcaecati, odio?
              </p>
            </div>
            <UButton
              class="absolute shadow -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-0 text-placeholder hover:bg-background-neutral border rounded-2xl bg-background-neutral border-neutral"
              icon="basil:cross-solid"
              variant="ghost"
              @click.stop="deleteTask(task.id)"
            />
            <DatePicker />
          </div>
        </UCard>
      </li>
    </ul>
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
