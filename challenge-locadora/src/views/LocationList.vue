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
          v-model:model-value="clientName"
        />

        <InputText
          :label-name="'Filtrar data de locação:'"
          :iput-name="'dataSearch'"
          v-model:model-value="dateLocation"
        />
        <InputText
          :label-name="'Filtrar data de entrega:'"
          :iput-name="'dataSearch'"
          v-model:model-value="dateDelivered"
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
          :is-delivered="teste"
          :is-location="result.isLocation"
          :date-location="result.dateLocation"
          :date-delivered="result.dateDelivered"
          :client="result.client"
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
const swal: any = inject("$swal");
const client = useClientStore();
const teste = ref(false);

isLoading.value = false;

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
