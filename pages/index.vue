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
    <div class="bg-background-light rounded flex gap-5 flex-col p-5">
      <h1><strong>NEW BOARD</strong></h1>
      <p class="text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer viverra
        venenatis accumsan.
      </p>
      <div class="flex gap-3 flex-col">
        <p>Name*</p>
        <input
          v-model="boardName"
          :class="{
            'input-create-board': true,
            'border-error! placeholder:text-error!': error,
          }"
          type="text"
          placeholder="Board name"
          @keyup.enter="createBoard"
        />
        <p v-if="error" class="text-error text-xs">Is required to fill the field</p>
        <p class="text-xs">Please, give a name to your new board</p>
      </div>

      <button class="button ml-0!" @click="createBoard">Create</button>
    </div>
  </div>
</template>
