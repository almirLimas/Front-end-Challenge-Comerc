<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container bg-white rounded-lg p-2">
      <div class="container flex justify-end mt-1 mb-1">
        <button
          class="p-3 bg-green-400 rounded-lg text-white"
          @click="router.push({ path: '/registerClient' })"
        >
          <i class="fa-solid fa-user-plus mr-4"></i> Novo Cliente
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
    </div>
  </div>
</template>
<script lang="ts" setup>
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridVue } from "ag-grid-vue3"; // Vue Grid Logic
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useClientStore } from "@/stores/client";
const client = useClientStore();

const rowData = ref([
  {
    id: 1,
    name: "Carto",
    surName: "polo",
    cpf: "1121123123",
    email: "polo@polo.com",
    phone: "11 1313123",
    cep: "09890833",
    street: "Rua polo",
    neighborhood: "Bairro Polo",
    city: "São Paulo",
    uf: "SP",
    status: "ativo",
  },
]);

rowData.value = client.clientData;

// Column Definitions: Defines & controls grid columns.
const colDefs = ref([
  { field: "id", sortable: true, filter: true },
  { field: "name", sortable: true, filter: true },
  { field: "surName", sortable: true, filter: true },
  { field: "cpf", sortable: true, filter: true },
  { field: "email", sortable: true, filter: true },
  { field: "phone", sortable: true, filter: true },
  { field: "cep", sortable: true, filter: true },
  { strfieldeet: "street", sortable: true, filter: true },
  { field: "neighborhood", sortable: true, filter: true },
  { field: "city", sortable: true, filter: true },
  { field: "uf", sortable: true, filter: true },
  { field: "status", sortable: true, filter: true },
]);

const cellWasClicked = (event: any) => {
  console.log(event);
};
const router = useRouter();
</script>
