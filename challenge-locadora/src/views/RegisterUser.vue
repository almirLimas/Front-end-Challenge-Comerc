<template>
  <div class="flex justify-center">
    <div class="container mt-4 text-cyan-600 font-bold ml-4">
      <i class="fa-solid fa-users text-2xl"></i>
      <span class="ml-5">Cadastro de Usuários</span>
    </div>
  </div>
  <div class="flex justify-center items-center mt-4">
    <div class="container bg-white rounded-lg p-10">
      <form>
        <div class="grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-2">
          <div class="mb-4">
            <InputText
              :label-name="'Nome'"
              :iput-name="'Nome'"
              v-model:model-value="userdata.nome"
              :place-holder="'Digite seu nome'"
            />
          </div>
          <div class="mb-4">
            <InputText
              :label-name="'Documento'"
              :iput-name="'Documento'"
              v-model:model-value="userdata.documento"
              :place-holder="'Digite seu documento'"
            />
          </div>
          <div class="mb-4">
            <InputPassword
              :label-name="'Senha'"
              :iput-name="'Senha'"
              v-model:model-value="userdata.senha"
              :place-holder="'Digite sua senha'"
            />
          </div>
          <div class="mb-4">
            <SelectComponent
              :title="'Status'"
              v-model:model-value="userdata.status"
            />
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button
            v-if="user.isUpdateUser === false"
            @click="validForm"
            type="button"
            class="bg-green-500 text-white px-4 py-2 rounded-md"
          >
            Salvar
          </button>
          <button
            v-else
            @click="update"
            type="button"
            class="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Editar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from "vue";
import InputText from "@/components/InputText.vue";
import InputPassword from "@/components/InputPassword.vue";
import SelectComponent from "@/components/SelectComponent.vue";
import { useUserStore } from "@/stores/user";
import router from "@/router";
import ButtonBack from "@/components/ButtonBack.vue";
const user = useUserStore();
const swal: any = inject("$swal");
const isUpdateUser = ref(false);
const userdata = ref({
  id: Math.random(),
  nome: "",
  documento: "",
  senha: "",
  status: "ativo",
});

onMounted(() => {
  isUpdateUser.value = JSON.parse(localStorage.getItem("isUpdateUser") || "{}");
  if (isUpdateUser.value) {
    userdata.value = JSON.parse(
      localStorage.getItem("userDataUpdatde") || "{}"
    );
  }
});

const submitForm = () => {
  user.createUser(userdata.value).then((res) => {
    if (res) {
      swal
        .fire({
          title: "Tudo Certo!",
          icon: "success",
          text: "Cadastro realizado com sucesso!",
        })
        .then((result: any) => {
          if (result.isConfirmed) {
            router.push({ path: "/userList" });
          }
        });
    }
  });
};

const validForm = () => {
  let formValue = Object.values(userdata.value);
  let count = 0;
  formValue.forEach((formValue) => {
    if (formValue === "") {
      count++;
      swal.fire({
        title: "Atenção!",
        icon: "warning",
        text: "Preencha todos os campos",
      });
    }
  });

  if (count === 0) {
    submitForm();
  }
};

const update = () => {
  user.updateUser(userdata.value).then((res) => {
    if (res) {
      swal
        .fire({
          title: "Tudo Certo!",
          icon: "success",
          text: "Dados alterados com sucesso!",
        })
        .then((result: any) => {
          router.push({ path: "/userList" });
        });
    }
  });
};
</script>
