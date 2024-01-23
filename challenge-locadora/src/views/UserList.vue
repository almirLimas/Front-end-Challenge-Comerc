<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container bg-white rounded-lg p-2">
      <div class="container flex justify-end mt-1 mb-1">
        <button
          :disabled="disableButton"
          class="p-3 bg-red-500 rounded-lg text-white m-1"
          @click="deleteUser"
        >
          <i class="fa-solid fa-trash"></i> Excluir
        </button>
        <button
          :disabled="disableButton"
          class="p-3 bg-blue-500 rounded-lg text-white m-1"
          @click="update"
        >
          <i class="fa-solid fa-pen"></i> Editar
        </button>
        <button
          class="p-3 bg-green-400 rounded-lg text-white m-1"
          @click="addNew"
        >
          <i class="fa-solid fa-user-plus"></i> Novo
        </button>
      </div>
      <ag-grid-vue
        class="ag-theme-quartz"
        :rowData="rowData"
        :columnDefs="colDefs"
        checkboxSelection="false"
        rowSelection="single"
        style="height: 30rem; width: auto"
        @cellClicked="cellWasClicked"
      >
      </ag-grid-vue>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridVue } from "ag-grid-vue3"; // Vue Grid Logic
import { ref, inject } from "vue";
import { useUserStore } from "@/stores/user";

const swal: any = inject("$swal");
const user = useUserStore();
const router = useRouter();
const disableButton = ref(true);
const idUser = ref(0);
const rowData = ref([
  { id: 0, nome: "almir", documento: "1123", senha: "1231", status: "ativo" },
]);

rowData.value = user.userData;
const colDefs = ref([
  { field: "id", sortable: true, filter: true, flex: 1 },
  { field: "nome", sortable: true, filter: true, flex: 1 },
  { field: "documento", sortable: true, filter: true, flex: 1 },
  { field: "status", sortable: true, filter: true, flex: 1 },
]);

const cellWasClicked = (event: any) => {
  idUser.value = event.data.id;
  disableButton.value = false;
  user.updateUserSet(event.data);
};

const addNew = () => {
  user.isUpdateUserSet(false);
  router.push({ path: "/registerUser" });
};

const update = () => {
  user.isUpdateUserSet(true);
  router.push({ path: "/registerUser" });
};
const deleteUser = () => {
  swal
    .fire({
      title: "Atenção!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "cancelar",
      text: "Tem certeza que deseja excluir esse usuário?",
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        user.deleteUser(idUser.value).then((res) => {
          if (res) {
            swal
              .fire({
                title: "Tudo Certo!",
                icon: "success",
                confirmButtonText: "Ok",
                text: "Usuário excluido com sucesso!",
              })
              .then((result: any) => {
                window.location.reload();
              });
          }
        });
      }
    });
};
</script>
