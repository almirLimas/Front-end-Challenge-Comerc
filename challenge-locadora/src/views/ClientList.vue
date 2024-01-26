<template>
  <div class="flex justify-center">
    <div class="container mt-4 text-cyan-600 font-bold ml-4">
      <i class="fa-solid fa-users text-2xl"></i>
      <span class="ml-5">Lista de Clientes</span>
    </div>
  </div>
  <div class="flex justify-center items-center mt-4">
    <div class="container bg-white rounded-lg p-2">
      <div class="container flex justify-end mt-1 mb-1">
        <button
          :disabled="disableButton"
          class="p-3 bg-red-500 rounded-lg text-white m-1"
          @click="deleteClient"
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
        style="height: 40rem; width: auto"
        @cellClicked="cellWasClicked"
      >
      </ag-grid-vue>
      <ButtonBack :routerBack="'/home'" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridVue } from "ag-grid-vue3";
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { useClientStore } from "@/stores/client";
import ButtonBack from "@/components/ButtonBack.vue";
const swal: any = inject("$swal");
const client = useClientStore();
const router = useRouter();
const disableButton = ref(true);
const idClient = ref(0);
const rowData = ref([
  {
    id: 0,
    nome: "Carto",
    sobreNome: "polo",
    cpf: "1121123123",
    email: "polo@polo.com",
    celular: "11 1313123",
    cep: "09890833",
    logradouro: "Rua polo",
    bairro: "Bairro Polo",
    cidade: "São Paulo",
    uf: "SP",
    status: "ativo",
  },
]);

rowData.value = client.clientData;

const colDefs = ref([
  { field: "id", sortable: true, filter: true },
  { field: "nome", sortable: true, filter: true },
  { field: "sobreNome", sortable: true, filter: true },
  { field: "cpf", sortable: true, filter: true },
  { field: "email", sortable: true, filter: true },
  { field: "celular", sortable: true, filter: true },
  { field: "cep", sortable: true, filter: true },
  { field: "logradouro", sortable: true, filter: true },
  { field: "bairro", sortable: true, filter: true },
  { field: "cidade", sortable: true, filter: true },
  { field: "uf", sortable: true, filter: true },
]);

const cellWasClicked = (event: any) => {
  idClient.value = event.data.id;
  disableButton.value = false;
  client.updateClientSet(event.data);
};

const addNew = () => {
  client.isUpdateClientSet(false);
  router.push({ path: "/registerClient" });
};

const update = () => {
  client.isUpdateClientSet(true);
  router.push({ path: "/registerClient" });
};
const deleteClient = () => {
  swal
    .fire({
      title: "Atenção!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "cancelar",
      text: "Tem certeza que deseja excluir esse cliente?",
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        client.deleteClient(idClient.value).then((res) => {
          if (res) {
            swal
              .fire({
                title: "Tudo Certo!",
                icon: "success",
                confirmButtonText: "Ok",
                text: "Cliente excluido com sucesso!",
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
