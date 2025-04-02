<script setup lang="ts">
import { ref } from "vue";

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

const handlePriorityClick = (priority: { label: string }) => {
  if (selectedPriority.value === priority.label) {
    selectedPriority.value = null;
  } else {
    selectedPriority.value = priority.label;
  }
};
</script>

<template>
  <div class="flex space-x-2">
    <button
      v-for="priority in priorities"
      :key="priority.label"
      @click="handlePriorityClick(priority)"
      class="py-[2px] px-2 rounded-xs font-semibold text-[10px]"
      :class="[
        priority.textClass,
        { [priority.bgClass]: priority.label },
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

<style scoped>
/* Aggiungi eventuali stili personalizzati qui */
</style>
