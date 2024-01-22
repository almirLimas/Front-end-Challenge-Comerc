<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container bg-white rounded-lg p-10">
      <form>
        <div class="grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-2">
          <div class="mb-4">
            <InputText
              :label-name="'Nome'"
              :iput-name="'Nome'"
              v-model:model-value="userdata.name"
            />
          </div>
          <div class="mb-4">
            <InputText
              :label-name="'Documento'"
              :iput-name="'Documento'"
              v-model:model-value="userdata.doc"
            />
          </div>
          <div class="mb-4">
            <InputPassword
              :label-name="'Senha'"
              :iput-name="'Senha'"
              v-model:model-value="userdata.password"
            />
          </div>
          <div class="mb-4">
            <ToogleComponent
              :title="'Status'"
              v-model:model-value="userdata.status"
            />
          </div>
        </div>

        <div class="flex justify-between mt-8">
          <button
            @click="validForm"
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
import InputPassword from "@/components/InputPassword.vue";
import ToogleComponent from "@/components/ToogleComponent.vue";
import { useUserStore } from "@/stores/user";
const user = useUserStore();
const swal: any = inject("$swal");

const userdata = ref({
  name: "",
  doc: "",
  password: "",
  status: "ativo",
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
          clearForm();
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
const clearForm = () => {
  window.location.reload();
};
</script>
