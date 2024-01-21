<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container bg-white rounded-lg p-10">
      <form @submit.prevent="submitForm">
        <div class="grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-2">
          <div class="mb-4">
            <InputText
              :label-name="'Nome'"
              :iput-name="'Nome'"
              v-model:model-value="nome"
            />
          </div>
          <div class="mb-4">
            <InputText
              :label-name="'Documento'"
              :iput-name="'Documento'"
              v-model:model-value="documento"
            />
          </div>
          <div class="mb-4">
            <InputPassword
              :label-name="'Senha'"
              :iput-name="'Senha'"
              v-model:model-value="senha"
            />
          </div>
          <div class="mb-4">
            <ToogleComponent :title="'Status'" v-model:model-value="status" />
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button
            type="submit"
            class="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import InputText from "@/components/InputText.vue";
import InputPassword from "@/components/InputPassword.vue";
import ToogleComponent from "@/components/ToogleComponent.vue";

const nome = ref("");
const documento = ref("");
const senha = ref("");
const status = ref("");

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

const teste = computed(() => {
  console.log("kkkk", status.value);
});

const submitForm = () => {
  console.log("Formulário enviado:");
};
</script>
