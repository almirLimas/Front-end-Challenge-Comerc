<template>
  <div
    class="bg-white rounded-lg p-8 m-3 hover:shadow-2xl cursor-pointer transition"
    @click="clickCard"
  >
    <div class="grid lg:grid-cols-12 gap-2">
      <div class="col-span-12 flex justify-center items-center">
        <i :class="iconCard" class="text-cyan-400 text-2xl"></i>
      </div>
      <div class="col-span-12 flex justify-center">
        <p class="text-gray-600 font-bold">{{ titleCard }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const emit = defineEmits(["clickCard"]);
const props = defineProps({
  titleCard: {
    type: String,
    required: true,
  },
  iconCard: {
    type: String,
    required: true,
  },
});

const clickCard = () => {
  emit("clickCard");
};

const titleCard = ref(props.titleCard);
const iconCard = ref(props.iconCard);
</script>
