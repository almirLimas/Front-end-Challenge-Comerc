<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container bg-white rounded-lg p-2">
      <div class="container flex justify-end mt-1 mb-1">
        <button
          class="p-3 bg-green-400 rounded-lg text-white"
          @click="router.push({ path: '/registerUser' })"
        >
          <i class="fa-solid fa-user-plus mr-4"></i> Novo usuário
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
import { useRouter } from "vue-router";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridVue } from "ag-grid-vue3"; // Vue Grid Logic
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
const user = useUserStore();
const router = useRouter();

const rowData = ref([{ id: 1, name: "almir", doc: "1123", status: "ativo" }]);

rowData.value = user.userData;

// Column Definitions: Defines & controls grid columns.
const colDefs = ref([
  { field: "id", sortable: true, filter: true },
  { field: "name", sortable: true, filter: true },
  { field: "doc", sortable: true, filter: true },
  { field: "status", sortable: true, filter: true },
]);

const cellWasClicked = (event: any) => {
  console.log(event);
};
</script>
