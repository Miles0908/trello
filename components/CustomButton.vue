<script setup lang="ts">
const emit = defineEmits(["click"]);

const props = defineProps({
  buttonClass: {
    type: String,
    default: "button",
  },
  preventDefault: {
    type: Boolean,
    default: false,
  },
});

const handleClick = (event: MouseEvent) => {
  if (props.preventDefault) {
    event.preventDefault();
  }
  emit("click", event);
};
</script>

<template>
  <button
    :class="buttonClass"
    @click="handleClick"
    @mousedown="props.preventDefault ? $event.preventDefault() : null"
  >
    <slot />
  </button>
</template>
