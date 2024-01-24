import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage, useLocalStorage } from "@vueuse/core";
import axios from "axios";

export const useClientStore = defineStore({
  id: "client",
  state: () => ({
    clientData: useStorage("clientData", [] as any[]),
    clientDataUpdatde: useStorage("clientDataUpdatde", {}),
    isUpdateClient: useStorage("isUpdateClient", false),
    localStorageClient: useLocalStorage("clientData", [
      {
        id: 1,
        nome: "Paulo",
        sobreNome: "Lio",
        cpf: "123123400",
        email: "paulo@paulo.com",
        celular: "11 54678976",
        cep: "08972-098",
        logradouro: "Rusa silva",
        bairro: "sao Jose",
        cidade: "São Paulo",
        uf: "SP",
      },
      {
        id: 2,
        nome: "Plinio",
        sobreNome: "peres",
        cpf: "123123409",
        email: "paulo@paulo.com",
        celular: "11 54678976",
        cep: "08972-098",
        logradouro: "Rusa silva",
        bairro: "sao Jose",
        cidade: "São Paulo",
        uf: "SP",
      },
      {
        id: 3,
        nome: "Batista",
        sobreNome: "Santos",
        cpf: "123123411",
        email: "paulo@paulo.com",
        celular: "11 54678976",
        cep: "08972-098",
        logradouro: "Rusa silva",
        bairro: "sao Jose",
        cidade: "São Paulo",
        uf: "SP",
      },
      {
        id: 4,
        nome: "Carmelita",
        sobreNome: "silva",
        cpf: "123093456",
        email: "paulo@paulo.com",
        celular: "11 54678976",
        cep: "08972-098",
        logradouro: "Rusa silva",
        bairro: "sao Jose",
        cidade: "São Paulo",
        uf: "SP",
      },
      {
        id: 5,
        nome: "Plenio",
        sobreNome: "Reis",
        cpf: "12317456",
        email: "paulo@paulo.com",
        celular: "11 54678976",
        cep: "08972-098",
        logradouro: "Rusa silva",
        bairro: "sao Jose",
        cidade: "São Paulo",
        uf: "SP",
      },
    ] as any[]),
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
    isUpdateClientSet(update: any) {
      this.isUpdateClient = update;
    },
    updateClientSet(client: any) {
      this.clientDataUpdatde = client;
    },
    async updateClient(client: any) {
      const objectUpdate = this.clientData.find((obj) => obj.id === client.id);

      if (objectUpdate) {
        objectUpdate.nome = client.nome;
        objectUpdate.sobreNome = client.sobreNome;
        objectUpdate.cpf = client.cpf;
        objectUpdate.celular = client.celular;
        objectUpdate.logradouro = client.logradouro;
        objectUpdate.bairro = client.bairro;
        objectUpdate.cidade = client.cidade;
        objectUpdate.uf = client.uf;

        // Atualizar dados no localStorage
        this.localStorageClient = this.clientData;
        return true;
      } else {
        console.error("Objeto não encontrado para editar.");
        return false;
      }
    },

    async deleteClient(clientId: number) {
      const index = this.clientData.findIndex(
        (client) => client.id === clientId
      );

      if (index !== -1) {
        this.clientData.splice(index, 1);

        this.localStorageClient = this.clientData;

        return true;
      } else {
        return false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useClientStore, import.meta.hot));
}
