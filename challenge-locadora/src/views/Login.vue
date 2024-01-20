<template>
  <section class="flex justify-center items-center h-screen bg-white">
    <div class="w-96 h-1/2 rounded-2xl shadow-xl p-10 bg-slate-50">
      <figure class="flex justify-center">
        <img src="../assets/Icons/Movie.svg" alt="" class="w-24" />
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
