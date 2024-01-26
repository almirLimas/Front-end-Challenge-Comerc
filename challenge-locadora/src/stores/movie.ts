import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage, useLocalStorage } from "@vueuse/core";
import axios from "axios";

export const useMovieStore = defineStore({
  id: "movie",

  state: () => ({
    movie: useStorage("movie", []),
    movieLocation: useStorage("movieLocation", [] as any[]),
    localStorageMovies: useLocalStorage("movie", []),
    movieLocationID: useStorage("movieLocation", []),
    localStorageMoviesLocationID: useLocalStorage(
      "localStorageMoviesLocationID",
      []
    ),
    localStorageMoviesLocation: useLocalStorage("movieLocation", [] as any[]),
  }),

  actions: {
    async listMovies(title: string = "Marvel", year?: string) {
      try {
        const response = await axios.get(
          `https://www.omdbapi.com/?s=${title}&y=${year}&apikey=bd21b62d&type=movie&page=10`
        );
        this.localStorageMovies = response.data.Search;
        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMovieStore, import.meta.hot));
}
