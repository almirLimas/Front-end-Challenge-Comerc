<template>
  <div>
    <label :for="iputName" class="block text-gray-700 text-sm font-bold mb-2">{{
      labelName
    }}</label>
    <input
      :id="iputName"
      type="password"
      :name="iputName"
      required
      class="w-full p-2 border border-gray-200 rounded-md"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  labelName?: string;
  iputName?: string;
}>();

const labelName = ref(props.labelName);
const iputName = ref(props.iputName);
</script>
