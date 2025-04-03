<script setup lang="ts">
const priorities = [
  {
    label: "low priority",
    textClass: "text-status-low",
    bgClass: "bg-background-status-low",
  },
  {
    label: "medium priority",
    textClass: "text-status-medium",
    bgClass: "bg-background-status-medium",
  },
  {
    label: "high priority",
    textClass: "text-status-high",
    bgClass: "bg-background-status-high",
  },
  {
    label: "highest priority",
    textClass: "text-status-highest",
    bgClass: "bg-background-status-highest",
  },
];

const selectedPriority = ref<string | null>(null);

const togglePriority = (label: string) => {
  selectedPriority.value = selectedPriority.value === label ? null : label;
};
</script>

<template>
  <div class="flex space-x-2">
    <button
      v-for="priority in priorities"
      :key="priority.label"
      @click="togglePriority(priority.label)"
      class="py-[2px] px-2 rounded-xs font-semibold text-[10px]"
      :class="[
        priority.textClass,
        priority.bgClass,
        {
          hidden:
            selectedPriority !== null && selectedPriority !== priority.label,
        },
      ]"
    >
      {{ priority.label }}
    </button>
  </div>
</template>
