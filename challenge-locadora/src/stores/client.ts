import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage } from "@vueuse/core";
import axios from "axios";

export const useClientStore = defineStore({
  id: "client",
  state: () => ({
    clientData: useStorage("clientData", []),
  }),

  actions: {
    async createClient(client: any) {
      //@ts-ignore
      this.clientData.push(client);

      return true;
    },

    async searchCep(cep: string) {
      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json`
        );

        return response;
      } catch (error) {
        console.error(error);
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot));
}
