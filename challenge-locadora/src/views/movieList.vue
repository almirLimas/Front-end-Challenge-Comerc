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
      </div>

      <div
        class="grid xl:grid-cols-4 lg:grid-cols-2 sm:grid-cols-1 gap-2 justify-center mt-6"
      >
        <CardMovie
          v-for="result in filteredResults"
          :key="result.imdbID"
          :title="result.Title"
          :year="result.Year"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
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
// const searchArray = [
//   {
//     Title: "Making Comics the Marvel Way",
//     Year: "2007",
//     imdbID: "tt5462942",
//     Type: "movie",
//     Poster: "N/A",
//   },
//   {
//     Title: "Marvel vs DC",
//     Year: "2018",
//     imdbID: "tt5619680",
//     Type: "movie",
//     Poster: "N/A",
//   },
//   {
//     Title: "Marvel TV's Exclusive in the House with Joe Quesada",
//     Year: "2007",
//     imdbID: "tt5688194",
//     Type: "movie",
//     Poster: "N/A",
//   },
//   {
//     Title: "Marvel Man",
//     Year: "1964",
//     imdbID: "tt4434030",
//     Type: "movie",
//     Poster: "N/A",
//   },
//   {
//     Title: "Iron Man: Shield - Protecting the Marvel Universe",
//     Year: "2013",
//     imdbID: "tt3387254",
//     Type: "movie",
//     Poster: "N/A",
//   },
//   {
//     Title: "The Badly Animated Marvel Christmas Carol",
//     Year: "2014",
//     imdbID: "tt3617078",
//     Type: "movie",
//     Poster: "N/A",
//   },
//   {
//     Title: "Marvel Tales to Astonish: Civil War",
//     Year: "2014",
//     imdbID: "tt3587710",
//     Type: "movie",
//     Poster: "N/A",
//   },
//   {
//     Title: "Ham and the Masked Marvel",
//     Year: "1916",
//     imdbID: "tt0311247",
//     Type: "movie",
//     Poster: "N/A",
//   },
//   {
//     Title: "Nadji the Hindoo Marvel",
//     Year: "1903",
//     imdbID: "tt0462444",
//     Type: "movie",
//     Poster: "N/A",
//   },
//   {
//     Title: "Max Marvel Show",
//     Year: "1999",
//     imdbID: "tt0810669",
//     Type: "movie",
//     Poster: "N/A",
//   },
// ];
isLoading.value = true;
movieList
  .listMovies()
  .then((res) => {
    movies.value.push(...res?.data.Search);
  })
  .finally(() => {
    isLoading.value = false;
  });

const filteredResults = computed(() => {
  const titleValue = title?.value?.toLowerCase();
  const yearValue = year?.value;

  return movies.value.filter(
    (item: any) =>
      item.Title.toLowerCase().includes(titleValue) &&
      item.Year.includes(yearValue)
  );
});
</script>
