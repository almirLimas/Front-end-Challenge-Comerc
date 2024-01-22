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
                v-model:model-value="clientData.name"
              />
            </div>

            <div class="mb-4">
              <InputText
                :label-name="'Sobrenome'"
                :iput-name="'SobreNome'"
                v-model:model-value="clientData.surName"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Cpf'"
                :iput-name="'Cpf'"
                v-model:model-value="clientData.cpf"
              />
            </div>

            <div class="mb-4">
              <SelectComponent
                :title="'Status'"
                v-model:model-value="clientData.status"
              />
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
                v-model:model-value="clientData.email"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Celular'"
                :iput-name="'Celular'"
                v-model:model-value="clientData.phone"
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
                v-model:model-value="clientData.cep"
                @blur-event="searchCep"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Logradouro'"
                :iput-name="'Logradouro'"
                v-model:model-value="clientData.street"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Bairro'"
                :iput-name="'Bairro'"
                v-model:model-value="clientData.neighborhood"
              />
            </div>
            <div class="mb-4">
              <InputText
                :label-name="'Cidade'"
                :iput-name="'Cidade'"
                v-model:model-value="clientData.city"
              />
            </div>
            <div class="mb-4">
              <div class="mb-4">
                <SelectComponent
                  :title="'Uf'"
                  v-model:model-value="clientData.uf"
                />
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
            type="button"
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
import { computed, inject, ref } from "vue";
import InputText from "@/components/InputText.vue";
import InputEmail from "@/components/InputEmail.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import { useClientStore } from "@/stores/client";
const client = useClientStore();
const swal: any = inject("$swal");
const step = ref(1);

const clientData = ref({
  name: "",
  surName: "",
  cpf: "",
  email: "",
  phone: "",
  cep: "",
  street: "",
  neighborhood: "",
  city: "",
  uf: "",
  status: "ativo",
});

const validarEtapaAtual = computed(() => {
  if (step.value === 1) {
    return (
      clientData.value.name !== "" &&
      clientData.value.surName !== "" &&
      clientData.value.cpf !== ""
    );
  } else if (step.value === 2) {
    return clientData.value.email !== "" && clientData.value.phone !== "";
  } else if (step.value === 3) {
    return (
      clientData.value.cep !== "" &&
      clientData.value.street !== "" &&
      clientData.value.neighborhood !== "" &&
      clientData.value.city !== "" &&
      clientData.value.uf !== ""
    );
  } else {
    return true;
  }
});

const submitForm = () => {
  client.createClient(clientData.value).then((res) => {
    if (res) {
      swal
        .fire({
          title: "Tudo Certo!",
          icon: "success",
          text: "Cadastro realizado com sucesso!",
        })
        .then((result: any) => {
          clearForm();
        });
    }
  });
};

const searchCep = () => {
  client.searchCep(clientData.value.cep).then((res) => {
    clientData.value.neighborhood = res?.data.bairro;
    clientData.value.city = res?.data.localidade;
    clientData.value.street = res?.data.logradouro;
    clientData.value.uf = res?.data.uf;
  });
};

const nextStep = () => {
  if (validarEtapaAtual) {
    step.value++;
  }
};

const previousStep = () => {
  step.value--;
};
const clearForm = () => {
  window.location.reload();
};
</script>
