<template>
  <div class="vl-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="true"
      :is-full-page="true"
    />
  </div>
  <div class="flex justify-center">
    <div class="container mt-4 text-cyan-600 font-bold ml-4">
      <i class="fa-solid fa-clipboard-list text-2xl"></i>
      <span class="ml-5">Lista de Filmes</span>
    </div>
  </div>
  <div class="flex justify-center mt-4">
    <div class="container bg-white rounded-lg p-10 mt-6">
      <div
        class="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-2"
      >
        <InputText
          :label-name="'Filtar por titulo:'"
          :iput-name="'titleSearch'"
          v-model:model-value="title"
          class="mr-0"
          :place-holder="'Pesquise por titulo'"
        />
        <button
          class="bg-blue-500 p-2 m-0 text-white h-10 lg:mt-7 sm:mt-1 mr-2 rounded-lg w-40"
          @click="searchMovie"
        >
          Pesquisar titulo
        </button>

        <InputText
          :label-name="'Filtrar por ano:'"
          :iput-name="'dataSearch'"
          v-model:model-value="year"
          :place-holder="'Pesquise por ano'"
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
      <ButtonBack :routerBack="'/home'" />
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
import ButtonBack from "@/components/ButtonBack.vue";
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
import router from "@/router";

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
      if (res?.data.Response === "False") {
        swal.fire({
          title: "Erro",
          icon: "error",
          text: "Filme não encontrado.",
          confirmButtonText: "Ok",
        });
      }
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
        console.log(parseInt(idClient));
        const clientObject = client.clientData.find(
          (item) => item.id == idClient
        );
        if (clientObject) {
          nameClient.value = clientObject.nome;
        }
        console.log(nameClient.value);
      },
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        movieList.movieLocation.push({
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
        swal
          .fire({
            title: "Tudo Certo!",
            icon: "success",
            text: "Filme alugado com sucesso, está na área de locação. deseja ir até lá agora?",
            showCancelButton: true,
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
          })
          .then((result: any) => {
            if (result.isConfirmed) {
              router.push({ path: "/locationList" });
            }
          });
      }
    });
};

const filteredResults = computed(() => {
  const yearValue = year?.value;

  return movies.value?.filter((item: any) => item.Year.includes(yearValue));
});
</script>
