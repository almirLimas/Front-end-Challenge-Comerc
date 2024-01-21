<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container bg-white rounded-lg p-10">
      <form @submit.prevent="submitForm">
        <div v-if="etapa === 1">
          <h2 class="text-lg font-semibold mb-4 col-span-12">
            Etapa 1: Informações Pessoais
          </h2>
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
                :label-name="'Sobrenome'"
                :iput-name="'SobreNome'"
                v-model:model-value="sobreNome"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Cpf'"
                :iput-name="'Cpf'"
                v-model:model-value="cpf"
              />
            </div>

            <div class="mb-4">
              <ToogleComponent :title="'Ativo'" />
            </div>
          </div>
        </div>

        <div v-if="etapa === 2">
          <h2 class="text-lg font-semibold mb-4">
            Etapa 2: Informações Adicionais
          </h2>
          <div class="mb-4">
            <label
              for="endereco"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Endereço:</label
            >
            <input
              v-model="endereco"
              type="text"
              id="endereco"
              name="endereco"
              required
              class="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <div v-if="etapa === 3">
          <h2 class="text-lg font-semibold mb-4">Etapa 3: Confirmar</h2>
          <p>Confirme suas informações antes de enviar.</p>
          <div class="mb-4">
            <strong>Nome:</strong> {{ nome }} <br />
            <strong>Email:</strong> {{ email }} <br />
            <strong>Endereço:</strong> {{ endereco }} <br />
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button
            v-if="etapa > 1"
            @click.prevent="anteriorEtapa"
            class="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Anterior
          </button>
          <button
            v-if="etapa < 3 && validarEtapaAtual"
            @click.prevent="proximoEtapa"
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Próximo
          </button>
          <button
            v-if="etapa === 3 && validarEtapaAtual"
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
const sobreNome = ref("");
const cpf = ref("");
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
  console.log("kkkk", nome.value);
  if (etapa.value === 1) {
    return nome.value !== "" && sobreNome.value !== "" && cpf.value !== "";
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
