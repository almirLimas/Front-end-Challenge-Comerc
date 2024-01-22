import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage } from "@vueuse/core";
import axios from "axios";

export const useClientStore = defineStore({
  id: "client",
  state: () => ({
    clientData: useStorage("clientData", []),
    clientMock: [
      {
        id: 1,
        name: "Paulo",
        surName: "Lio",
        cpf: "123123456",
        email: "paulo@paulo.com",
        phone: "11 54678976",
        cep: "08972-098",
        street: "Rusa silva",
        neighborhood: "sao Jose",
        city: "São Paulo",
        uf: "SP",
        status: "ativo",
      },
      {
        id: 2,
        name: "Carllos",
        surName: "Lopess",
        cpf: "123123456",
        email: "calor@calor.com",
        phone: "11 54678976",
        cep: "08972-098",
        street: "Rusa silva",
        neighborhood: "sao Jose",
        city: "Rio De Janeiro",
        uf: "RJ",
        status: "ativo",
      },
      {
        id: 3,
        name: "Fernando ",
        surName: "Cart",
        cpf: "123123456",
        email: "fernando@fernando.com",
        phone: "11 54678976",
        cep: "08972-098",
        street: "Rusa lisboa",
        neighborhood: "sao Jose",
        city: "São Paulo",
        uf: "SP",
        status: "ativo",
      },
      {
        id: 4,
        name: "Catarina",
        surName: "Maria",
        cpf: "123123456",
        email: "maria@maria.com",
        phone: "11 54678976",
        cep: "08972-098",
        street: "Rusa silva",
        neighborhood: "sao Jose",
        city: "São Paulo",
        uf: "SP",
        status: "ativo",
      },
      {
        id: 5,
        name: "Valeria",
        surName: "Gomes",
        cpf: "123123456",
        email: "valeria@valeria.com",
        phone: "11 54678976",
        cep: "08972-098",
        street: "Rusa valentim",
        neighborhood: "sao Jose",
        city: "São Paulo",
        uf: "SP",
        status: "ativo",
      },
    ],
  }),

  actions: {
    async createClient(client: any) {
      console.log(client);
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
