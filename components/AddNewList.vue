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
  <UContainer
    class="rounded bg-background-extra-light hover:bg-background-light m-0! p-0 px-0! w-[500px] max-w-fit duration-200"
  >
    <div class="flex items-center relative m-4 w-[470px]">
      <UIcon
        v-if="!isEditing"
        class="absolute ml-1"
        name="material-symbols:add-rounded"
        size="24"
      />
      <input
        :class="{
          'input-column': true,
          'input-column-error pl-1!': error && isEditing,
          'border! border-accent! pl-1! ': isEditing && !error,
        }"
        v-model="newColumnName"
        type="text"
        :placeholder="isEditing ? '' : 'Add another list'"
        @focus="((showAddButton = true), (error = false), (isEditing = true))"
        @blur="((showAddButton = false), (error = false), (isEditing = false))"
        @keyup.enter="addColumn"
      />
    </div>
    <CustomButton
      v-if="showAddButton"
      button-class="button mb-2.5"
      :prevent-default="true"
      @click="addColumn"
    >
      Add
    </CustomButton>
    <div v-if="error">
      <p class="ml-6 mb-2 text-error bg-background-light rounded opacity-70">
        Please enter at least one character
      </p>
    </div>
  </UContainer>
</template>
