<template>
  <div class="flex justify-start">
    <div class="container mt-4 text-cyan-600 font-bold">
      <button
        @click="back"
        class="bg-yellow-300 pt-3 pb-3 pl-7 pr-7 rounded-lg text-white"
      >
        <i class="fa-solid fa-arrow-left mr-2"></i>Voltar
      </button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
const emit = defineEmits(["clickBack"]);
const router = useRouter();

const back = () => {
  //@ts-ignore
  router.push({ path: routerBack.value });
};

const props = defineProps({
  routerBack: {
    type: String,
    required: true,
  },
});

const routerBack = ref(props.routerBack);
</script>
