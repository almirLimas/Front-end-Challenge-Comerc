<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container bg-white rounded-lg p-10">
      <form>
        <div v-if="step === 1">
          <h2 class="text-lg font-semibold mb-4 col-span-12">
            Informações Pessoais
          </h2>
          <div class="grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-2">
            <div class="mb-4">
              <InputText
                :label-name="'Nome'"
                :iput-name="'Nome'"
                v-model:model-value="name"
              />
            </div>

            <div class="mb-4">
              <InputText
                :label-name="'Sobrenome'"
                :iput-name="'SobreNome'"
                v-model:model-value="surName"
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
              <ToogleComponent :title="'Status'" v-model:model-value="status" />
            </div>
          </div>
        </div>

        <div v-if="step === 2">
          <h2 class="text-lg font-semibold mb-4">Contatos</h2>
          <div class="grid xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-2">
            <div class="mb-4">
              <InputEmail
                :label-name="'E-mail'"
                :iput-name="'Email'"
                v-model:model-value="email"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Celular'"
                :iput-name="'Celular'"
                v-model:model-value="phone"
              />
            </div>
          </div>
        </div>

        <div v-if="step === 3">
          <h2 class="text-lg font-semibold mb-4">Endereço</h2>
          <div class="grid xl:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-2">
            <div class="mb-4">
              <InputText
                :label-name="'Cep'"
                :iput-name="'Cep'"
                v-model:model-value="cep"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Logradouro'"
                :iput-name="'Logradouro'"
                v-model:model-value="street"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Bairro'"
                :iput-name="'Bairro'"
                v-model:model-value="neighborhood"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Cidade'"
                :iput-name="'Cidade'"
                v-model:model-value="city"
              />
            </div>
            <div class="mb-4">
              <div class="mb-4">
                <ToogleComponent :title="'Uf'" v-model:model-value="uf" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button
            v-if="step > 1"
            @click.prevent="previousStep"
            class="bg-gray-500 text-white px-4 py-2 rounded-md"
          >
            Anterior
          </button>
          <button
            v-if="step < 3 && validarEtapaAtual"
            @click.prevent="nextStep"
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Próximo
          </button>
          <button
            @click="submitForm"
            v-if="step === 3 && validarEtapaAtual"
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
import InputEmail from "@/components/InputEmail.vue";
import ToogleComponent from "@/components/ToogleComponent.vue";
const step = ref(1);
const name = ref("");
const surName = ref("");
const cpf = ref("");
const email = ref("");
const phone = ref("");
const cep = ref("");
const street = ref("");
const neighborhood = ref("");
const city = ref("");
const uf = ref("");
const status = ref("");

const validarEtapaAtual = computed(() => {
  if (step.value === 1) {
    return name.value !== "" && surName.value !== "" && cpf.value !== "";
  } else if (step.value === 2) {
    return email.value !== "" && phone.value !== "";
  } else if (step.value === 3) {
    return (
      cep.value !== "" &&
      street.value !== "" &&
      neighborhood.value !== "" &&
      city.value !== "" &&
      uf.value !== ""
    );
  } else {
    return true;
  }
});

const nextStep = () => {
  if (validarEtapaAtual) {
    step.value++;
  }
};

const previousStep = () => {
  step.value--;
};

const submitForm = () => {
  console.log("Formulário enviado:");
};
</script>
