<template>
  <section class="flex justify-center items-center h-screen">
    <div class="w-96 m-5 rounded-2xl shadow-xl p-10 bg-white">
      <figure class="flex justify-center">
        <i class="fa-solid fa-g text-6xl text-cyan-500"></i>
      </figure>
      <form class="mt-16">
        <InputText
          :label-name="'Documento'"
          :iput-name="'documento'"
          v-model:model-value="documento"
        />
        <InputPassword
          :label-name="'Senha'"
          iput-name="'password'"
          v-model:model-value="senha"
        />
        <button
          @click.prevent="AddTodo"
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
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
const user = useUserStore();

const AddTodo = () => {
  user.login("admin", "admin").then((res) => {
    router.push({ path: "/home" });
  });
};

const documento = ref("");
const senha = ref("");
const router = useRouter();

const submitForm = () => {
  router.push({ path: "/home" });
  console.log("clicouu");
};
</script>
