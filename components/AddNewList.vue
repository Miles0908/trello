<script setup lang="ts">
import { UContainer } from "#components";

const boardStore = useBoardStore();

const newColumnName = ref("");

const showAddButton = ref(false);

const error = ref(false);

const isEditing = ref(false);

const addColumn = () => {
  if (newColumnName.value === "") {
    error.value = true;
    return;
  }
  boardStore.addColumn(newColumnName.value.toUpperCase());
  newColumnName.value = "";
  error.value = false;
};
</script>
<template>
  <UContainer class="flex-1 rounded bg-background-light min-w-fit m-0! p-0!">
    <div class="flex items-center relative m-6">
      <UIcon
        v-if="!isEditing"
        class="absolute ml-1"
        name="material-symbols:add-rounded"
        size="24"
      />
      <input
        :class="{
          'input-column': true,
          'input-column-error pl-0!': error && isEditing,
          'border! border-accent! pl-0!': isEditing && !error,
        }"
        v-model="newColumnName"
        type="text"
        :placeholder="isEditing ? '' : 'Add new list'"
        @focus="((showAddButton = true), (error = false), (isEditing = true))"
        @blur="((showAddButton = false), (error = false), (isEditing = false))"
        @keyup.enter="addColumn"
      />
    </div>
    <button
      class="button mb-4"
      v-if="showAddButton"
      @mousedown.prevent
      @click="addColumn"
    >
      Add
    </button>
    <div v-if="error">
      <p class="ml-6 mb-2 text-error bg-background-light rounded opacity-70">
        Please enter at least one character
      </p>
    </div>
  </UContainer>
</template>
