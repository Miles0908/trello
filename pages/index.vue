<script setup>
const route = useRouter();
const boardStore = useBoardStore();
const boardName = ref("");
const error = ref(false);
const createBoard = () => {
  if (boardName.value === "") {
    error.value = true;
    return;
  } else {
    error.value = false;
    boardStore.createNewBoard(boardName.value);
    route.push("/board");
  }
};

watch(boardName, (newValue) => {
  if (newValue !== "") error.value = false;
});
</script>
<template>
  <div class="flex justify-center items-center h-full">
    <div class="bg-background-neutral rounded flex gap-5 flex-col p-6">
      <h1 class="text-2xl"><strong>New Board</strong></h1>
      <p class="text-md">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra
        venenatis accumsan.
      </p>
      <div class="flex gap-2 flex-col">
        <p><strong>Name*</strong></p>
        <CustomInput
          v-model="boardName"
          input-class="input-create-board"
          :error="error"
          placeholder="Board name"
          @enter="createBoard"
        />
        <p v-if="error" class="text-error text-xs duration-200">
          Is required to fill the field
        </p>
        <p class="text-xs font-semibold">
          Please, give a name to your new board
        </p>
      </div>

      <CustomButton button-class="button mt-8 ml-0!" @click="createBoard">
        Create
      </CustomButton>
    </div>
  </div>
</template>
