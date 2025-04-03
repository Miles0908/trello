<script setup lang="ts">
const selectedDate = ref("");
const selectedTime = ref("");

const selectedDateTime = computed(
  () => new Date(`${selectedDate.value}T${selectedTime.value}`)
);

const isToday = computed(() => {
  const now = new Date();
  return selectedDateTime.value.toDateString() === now.toDateString();
});
</script>

<template>
  <div
    class="px-2 rounded flex align-center w-max"
    :class="{
      'bg-background-date-error text-date-error': isToday,
      'bg-background-date-neutral text-date-neutral': !isToday,
    }"
  >
    <div class="flex items-center font-bold">
      <UIcon name="material-symbols:calendar-today-outline-rounded" size="12" />
      <input
        type="date"
        v-model="selectedDate"
        class="py-2 px-2 rounded text-xs"
        required
      />
    </div>

    <div class="flex items-center font-bold">
      <UIcon name="tabler:clock-hour-4" size="12" />
      <input
        type="time"
        v-model="selectedTime"
        class="py-2 px-2 rounded text-xs"
        required
      />
    </div>
  </div>
</template>
<style scoped>
input[type="date"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
input[type="time"]::-webkit-calendar-picker-indicator {
  display: none;
  -webkit-appearance: none;
}
</style>
