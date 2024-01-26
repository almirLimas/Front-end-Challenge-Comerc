<template>
  <div>
    <label :for="iputName" class="block text-gray-700 text-sm font-bold mb-2">{{
      labelName
    }}</label>
    <input
      :value="props.modelValue"
      @input="updateValue"
      @blur="updateValueBlur"
      :id="iputName"
      type="text"
      :name="iputName"
      required
      class="w-full p-2 border border-gray-200"
      :class="isSearch ? '' : 'rounded-md'"
      :placeholder="placeHolder"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const isSearch = ref(false);

const props = defineProps({
  labelName: {
    type: String,
    required: true,
  },
  placeHolder: {
    type: String,
  },
  iputName: {
    type: String,
    required: true,
  },
  isSearch: {
    type: Boolean,
  },
  modelValue: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "blurEvent"]);
const labelName = ref(props.labelName);
const iputName = ref(props.iputName);

const updateValue = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
const updateValueBlur = (e: Event) => {
  emit("blurEvent", (e.target as HTMLInputElement).value);
};
</script>
