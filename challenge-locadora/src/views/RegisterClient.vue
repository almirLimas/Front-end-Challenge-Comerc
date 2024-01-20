<template>
  <form
    @submit.prevent="submitForm"
    class="max-w-2xl mx-auto mt-28 p-6 bg-white rounded-md shadow-md grid grid-cols-12 gap-4"
  >
    <div class="mb-4 col-span-2">
      <label for="id" class="block text-gray-700 text-sm font-bold mb-2"
        >ID:</label
      >
      <input
        v-model="id"
        type="text"
        id="id"
        name="id"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>

    <div class="mb-4 col-span-5">
      <label for="nome" class="block text-gray-700 text-sm font-bold mb-2"
        >Nome:</label
      >
      <input
        v-model="nome"
        type="text"
        id="nome"
        name="nome"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>

    <div class="mb-4 col-span-5">
      <label for="documento" class="block text-gray-700 text-sm font-bold mb-2"
        >Sobrenome:</label
      >
      <input
        v-model="documento"
        type="text"
        id="documento"
        name="documento"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>
    <div class="mb-4 col-span-5">
      <label for="documento" class="block text-gray-700 text-sm font-bold mb-2"
        >cpf:</label
      >
      <input
        v-model="documento"
        type="text"
        id="documento"
        name="documento"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>
    <div class="mb-4 col-span-5">
      <label for="documento" class="block text-gray-700 text-sm font-bold mb-2"
        >email:</label
      >
      <input
        v-model="documento"
        type="text"
        id="documento"
        name="documento"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>
    <div class="mb-4 col-span-5">
      <label for="documento" class="block text-gray-700 text-sm font-bold mb-2"
        >celular:</label
      >
      <input
        v-model="documento"
        type="text"
        id="documento"
        name="documento"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>
    <div class="mb-4 col-span-5">
      <label for="documento" class="block text-gray-700 text-sm font-bold mb-2"
        >cep:</label
      >
      <input
        v-model="documento"
        type="text"
        id="documento"
        name="documento"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>
    <div class="mb-4 col-span-5">
      <label for="documento" class="block text-gray-700 text-sm font-bold mb-2"
        >logradouro:</label
      >
      <input
        v-model="documento"
        type="text"
        id="documento"
        name="documento"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>

    <div class="mb-4 col-span-5">
      <label for="documento" class="block text-gray-700 text-sm font-bold mb-2"
        >Bairro:</label
      >
      <input
        v-model="documento"
        type="text"
        id="documento"
        name="documento"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>
    <div class="mb-4 col-span-5">
      <label for="documento" class="block text-gray-700 text-sm font-bold mb-2"
        >Cidade:</label
      >
      <input
        v-model="documento"
        type="text"
        id="documento"
        name="documento"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>
    <div class="mb-4 col-span-5">
      <label for="documento" class="block text-gray-700 text-sm font-bold mb-2"
        >Uf:</label
      >
      <input
        v-model="documento"
        type="text"
        id="documento"
        name="documento"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      />
    </div>

    <div class="mb-4 col-span-12">
      <label for="status" class="block text-gray-700 text-sm font-bold mb-2"
        >Status:</label
      >
      <select
        v-model="status"
        id="status"
        name="status"
        required
        class="w-full p-2 border border-gray-200 rounded-md"
      >
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
      </select>
    </div>

    <button
      type="submit"
      class="bg-blue-500 text-white px-4 py-2 rounded-md col-span-4"
    >
      Enviar
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      nome: "",
      documento: "",
      senha: "",
      status: "ativo",
    };
  },
  methods: {
    submitForm() {
      // Lógica para lidar com o envio do formulário
      console.log(
        "Formulário enviado:",
        this.id,
        this.nome,
        this.documento,
        this.senha,
        this.status
      );
    },
  },
};
</script>

<style scoped>
/* Estilos específicos do componente, se necessário */
</style>
