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
          :label-name="'Filtar por titulo:'"
          :iput-name="'titleSearch'"
          v-model:model-value="title"
        />

        <InputText
          :label-name="'Filtrar por ano:'"
          :iput-name="'dataSearch'"
          v-model:model-value="year"
        />
        <button @click="searchMovie">Pesquisar</button>
      </div>

      <div
        class="grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-2 justify-center mt-6"
      >
        <CardMovie
          v-for="result in filteredResults"
          :key="result.imdbID"
          :title="result.Title"
          :year="result.Year"
          @click-location="
            location(
              result.Title,
              result.Year,
              result.imdbID,
              format(new Date(), 'dd/MM/yyyy')
            )
          "
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
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
const isLoading = ref(false);
const title = ref("");
const year = ref("");
const movieList = useMovieStore();
const movies = ref([] as any);
const clientInputOption = ref();
const nameClient = ref();
import { useClientStore } from "@/stores/client";
const client = useClientStore();
const swal: any = inject("$swal");
import { format } from "date-fns";

clientInputOption.value = client.clientData.reduce((acc, item) => {
  acc[item.id] = item.nome;
  return acc;
}, {});

const searchMovie = () => {
  isLoading.value = true;
  movieList
    .listMovies(title.value)
    .then((res) => {
      movies.value = res?.data.Search;
    })
    .finally(() => {
      isLoading.value = false;
    });
};
const location = (
  title: string,
  year: string,
  imdbID: string,
  date: string
) => {
  swal
    .fire({
      title: "Está quase lá!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Pronto",
      cancelButtonText: "cancelar",
      text: "Selecione o cliente que deseja alugar!",
      input: "select",
      inputOptions: clientInputOption.value,
      inputValidator: (idClient: any) => {
        const clientObject = client.clientData.find(
          (item) => item.id === parseInt(idClient)
        );
        if (clientObject) {
          nameClient.value = clientObject.nome;
        }
      },
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        movieList.localStorageMoviesLocation.push({
          Title: title,
          Year: year,
          imdbID: imdbID,
          Type: "movie",
          Poster: "N/A",
          client: nameClient.value,
          dateDelivered: "",
          dateLocation: date,
          isDelivered: false,
          isLocation: true,
        });
      }
    });
};

// const contemId = (array: any, idProcurado: any) => {
//   console.log(array);
//   return array.some((item: any) => item.imdbID === idProcurado);
// };

// const teste = movies.value.forEach((item: any) => {
//   const estaPresenteNoPrimeiroArray = contemId(movies.value, item.imdbID);
//   const estaPresenteNoSegundoArray = contemId(
//     movieList.movieLocation,
//     item.imdbID
//   );
//   if (estaPresenteNoPrimeiroArray && estaPresenteNoSegundoArray) {
//     console.log(`O ID ${item.imdbID} está presente em ambos os arrays.`);
//   } else {
//     console.log(`O ID ${item.imdbID} não está presente em ambos os arrays.`);
//   }
// });

const filteredResults = computed(() => {
  const yearValue = year?.value;

  return movies.value.filter((item: any) => item.Year.includes(yearValue));
});
</script>
