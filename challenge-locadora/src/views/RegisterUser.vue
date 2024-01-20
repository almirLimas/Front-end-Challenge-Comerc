<template>
  <div class="max-w-xl mx-auto mt-4 p-6 bg-white rounded-md shadow-md">
    <form @submit.prevent="submitForm">
      <div v-if="etapa === 1">
        <h2 class="text-lg font-semibold mb-4">
          Etapa 1: Informações Pessoais
        </h2>
        <div class="mb-4">
          <label for="nome" class="block text-gray-700 text-sm font-bold mb-2"
            >Nome:</label
          >
          <input
            v-model="nome"
            type="text"
            id="nome"
            name="nome"
            required
            class="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >Email:</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            name="email"
            required
            class="w-full p-2 border border-gray-300 rounded-md"
          />
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
</template>

<script>
export default {
  data() {
    return {
      etapa: 1,
      nome: "",
      email: "",
      endereco: "",
    };
  },
  computed: {
    validarEtapaAtual() {
      if (this.etapa === 1) {
        return this.nome !== "" && this.email !== "";
      } else if (this.etapa === 2) {
        return this.endereco !== "";
      } else {
        return true; // Para a última etapa
      }
    },
  },
  methods: {
    proximoEtapa() {
      if (this.validarEtapaAtual) {
        this.etapa++;
      }
    },
    anteriorEtapa() {
      this.etapa--;
    },
    submitForm() {
      // Lógica para lidar com o envio do formulário
      console.log("Formulário enviado:", this.nome, this.email, this.endereco);
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do componente, se necessário */
</style>
