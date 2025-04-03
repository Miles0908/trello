<script setup lang="ts">
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  inputClass: {
    type: String,
    default: "input-default",
  },
  error: {
    type: Boolean,
    default: false,
  },
  icon: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "enter", "blur", "focus"]);

const inputValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newValue) => {
    inputValue.value = newValue;
  }
);

watch(inputValue, (newValue) => {
  emit("update:modelValue", newValue);
});

const handleEnter = () => {
  emit("enter");
};

const handleBlur = () => {
  emit("blur");
};

const handleFocus = () => {
  emit("focus");
};
</script>

<template>
  <div class="relative flex items-center w-full">
    <UIcon v-if="icon" :name="icon" class="absolute ml-1" size="24" />
    <input
      v-model="inputValue"
      :class="[
        inputClass,
        { 'border-error! placeholder:text-error!': error },
        { 'pl-8': icon },
      ]"
      type="text"
      :placeholder="placeholder"
      @keyup.enter="handleEnter"
      @blur="handleBlur"
      @focus="handleFocus"
    />
  </div>
</template>
