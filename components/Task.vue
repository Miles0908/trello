<script setup lang="ts">
const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  fromColumnIndex: {
    type: Number,
    required: true,
  },
  fromTaskIndex: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["pickup-task", "drop-item", "delete-task"]);

const pickupTask = (event: DragEvent) => {
  emit("pickup-task", event, {
    fromColumnIndex: props.fromColumnIndex,
    fromTaskIndex: props.fromTaskIndex,
  });
};

const dropItem = (event: DragEvent) => {
  emit("drop-item", event, {
    toColumnIndex: props.fromColumnIndex,
    toTaskIndex: props.fromTaskIndex,
  });
};

const deleteTask = () => {
  emit("delete-task", props.task.id);
};
</script>

<template>
  <li class="group relative rounded shadow-[0_2px_2px_0_rgba(0,0,0,0.1)]">
    <UCard
      class="mb-4 bg-white relative"
      draggable="true"
      @dragstart="pickupTask($event)"
      @drop.stop="dropItem($event)"
    >
      <div class="inline-block items-center justify-between">
        <TagPriority />
        <div class="flex gap-3 flex-col mt-4 mb-4">
          <strong class="text-xl">{{ task.name }}</strong>
          <p class="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati,
            odio?
          </p>
        </div>
        <!-- X button -->
        <UButton
          class="absolute shadow -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity p-0 text-placeholder hover:bg-background-neutral border rounded-2xl bg-background-neutral border-neutral"
          icon="basil:cross-solid"
          @click.stop="deleteTask"
        />
        <DatePicker />
      </div>
    </UCard>
  </li>
</template>
