<template>
  <div class="vl-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    />
  </div>
  <div class="flex justify-center mt-6">
    <div class="container bg-white rounded-lg p-10 mt-6">
      <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2"
      >
        <InputText
          :label-name="'Filtar por cliente:'"
          :iput-name="'titleSearch'"
          v-model:model-value="title"
        />

        <InputText
          :label-name="'Filtrar data de locação:'"
          :iput-name="'dataSearch'"
          v-model:model-value="year"
        />
        <InputText
          :label-name="'Filtrar data de entrega:'"
          :iput-name="'dataSearch'"
          v-model:model-value="year"
        />
      </div>

      <div
        class="grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-2 justify-center mt-6"
      >
        <CardMovie
          v-for="result in filteredResults"
          :key="result.imdbID"
          :title="result.Title"
          :year="result.Year"
          :is-delivered="result.isDelivered"
          :is-location="result.isLocation"
          @click-location="location"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, inject } from "vue";
import InputText from "@/components/InputText.vue";
import CardMovie from "@/components/CardMovie.vue";
import { useMovieStore } from "@/stores/movie";
import { useClientStore } from "@/stores/client";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
const isLoading = ref(false);
const title = ref("");
const year = ref("");
const dateDelivered = ref("");
const dateLocation = ref("");
const clientName = ref("");
const movieList = useMovieStore();
const client = useClientStore();
const clientInoutOption = ref();
console.log(movieList.localStorageMoviesLocation);
isLoading.value = false;
const swal: any = inject("$swal");

clientInoutOption.value = client.localStorageClient.reduce((acc, item) => {
  acc[item.id] = item.nome;
  return acc;
}, {});

const location = () => {
  swal
    .fire({
      title: "Está quase lá!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Pronto",
      cancelButtonText: "cancelar",
      text: "Selecione o cliente que deseja alugar!",
      input: "select",
      inputOptions: clientInoutOption.value,
      inputValidator: (value: any) => {
        console.log(value, "esse é");
        // return new Promise((resolve) => {
        //   if (value === "oranges") {
        //     resolve();
        //   } else {
        //     resolve("You need to select oranges :)");
        //   }
        // });
      },
    })
    .then((result: any) => {
      if (result.isConfirmed) {
      }
    });
};
const filteredResults = computed(() => {
  const titleValue = title?.value?.toLowerCase();
  const yearValue = year?.value;
  const clientValue = clientName?.value?.toLowerCase();
  const dateLocationValue = dateLocation?.value;
  const dateDeliveredValue = dateDelivered?.value;

  return movieList.localStorageMoviesLocation.filter(
    (item: any) =>
      item.Title.toLowerCase().includes(titleValue) &&
      item.Year.includes(yearValue) &&
      item.dateLocation.includes(dateLocationValue) &&
      item.dateDelivered.includes(dateDeliveredValue) &&
      item.client.includes(clientValue)
  );
});
</script>
