<template>
  <section class="flex justify-center items-center h-screen">
    <div class="w-96 m-5 rounded-2xl shadow-xl p-10 bg-white">
      <figure class="flex justify-center">
        <i class="fa-solid fa-g text-6xl text-cyan-500"></i>
      </figure>
      <form class="mt-16" @submit.prevent="submitForm">
        <InputText :label-name="'Documento'" :iput-name="'documento'" />
        <InputPassword :label-name="'Senha'" iput-name="'password'" />
        <button
          type="submit"
          class="bg-blue-500 text-white px-4 py-2 rounded-md w-full mt-6"
        >
          Entrar
        </button>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import InputText from "@/components/InputText.vue";
import InputPassword from "@/components/InputPassword.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const submitForm = () => {
  router.push({ path: "/home" });
  console.log("clicouu");
};
</script>
