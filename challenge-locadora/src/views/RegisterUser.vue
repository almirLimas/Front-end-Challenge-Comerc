<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container bg-white rounded-lg p-10">
      <form @submit.prevent="submitForm">
        <div v-if="etapa === 1" class="grid grid-cols-1 gap-2">
          <h2 class="text-lg font-semibold mb-4 col-span-12">
            Etapa 1: Informações Pessoais
          </h2>
          <div class="mb-4 lg:col-span-6 md:col-span-12 sm:col-span-12">
            <InputText :label-name="'Nome'" :iput-name="'Nome'" />
          </div>

          <div class="mb-4 lg:col-span-6 md:col-span-12 sm:col-span-12">
            <InputText :label-name="'Documento'" :iput-name="'Documento'" />
          </div>
          <div class="mb-4 lg:col-span-6 md:col-span-12 sm:col-span-12">
            <InputPassword :label-name="'Documento'" :iput-name="'Documento'" />
          </div>
          <div class="mb-4 lg:col-span-6 md:col-span-12 sm:col-span-12">
            <ToogleComponent :title="'Ativo'" />
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
const etapa = ref(1);
const nome = ref("");
const email = ref("");
const endereco = ref("");

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

const validarEtapaAtual = computed(() => {
  if (etapa.value === 1) {
    return nome.value !== "" && email.value !== "";
  } else if (etapa.value === 2) {
    return endereco.value !== "";
  } else {
    return true; // Para a última etapa
  }
});

const proximoEtapa = () => {
  if (validarEtapaAtual) {
    etapa.value++;
  }
};

const anteriorEtapa = () => {
  etapa.value--;
};

const submitForm = () => {
  console.log("Formulário enviado:");
};
// computed: {
//     validarEtapaAtual() {
//       if (this.etapa === 1) {
//         return this.nome !== "" && this.email !== "";
//       } else if (this.etapa === 2) {
//         return this.endereco !== "";
//       } else {
//         return true; // Para a última etapa
//       }
//     },
//   },
//   methods: {
//     proximoEtapa() {
//       if (this.validarEtapaAtual) {
//         this.etapa++;
//       }
//     },
//     anteriorEtapa() {
//       this.etapa--;
//     },
//     submitForm() {
//       // Lógica para lidar com o envio do formulário
//       console.log("Formulário enviado:", this.nome, this.email, this.endereco);
//     },
//   },
</script>
