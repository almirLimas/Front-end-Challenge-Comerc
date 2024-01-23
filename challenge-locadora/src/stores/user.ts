import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage, useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    userData: useStorage("userData", []),
    userDataUpdatde: useStorage("userDataUpdatde", {}),
    isUpdateUser: useStorage("isUpdateUser", false),
    isLogged: false,
    localStorageUsers: useLocalStorage("userData"),
    userMock: [
      {
        id: 1,
        nome: "Stalone Pereeira",
        documento: "12345",
        senha: "123",
        status: "ativo",
      },
      {
        id: 2,
        nome: "Ribeiro dos Pinhais",
        documento: "1234",
        senha: "123",
        status: "ativo",
      },
      {
        id: 3,
        nome: "Lian Silva",
        documento: "12345",
        senha: "123",
        status: "ativo",
      },
      {
        id: 4,
        nome: "Junio Junior",
        documento: "12345",
        senha: "123",
        status: "ativo",
      },
      {
        id: 5,
        nome: "Carlos Santos",
        documento: "12345",
        senha: "123",
        status: "desativo",
      },
    ],
  }),

  actions: {
    async logout() {
      useStorage("userData", []);

      this.isLogged = false;
    },

    async login(user: string, password: string) {
      let storedUser = JSON.parse(localStorage.getItem("userData") || "[]");
      let userFound = storedUser.find(function (u: any) {
        return u.name === user && u.password === password;
      });

      if (
        (userFound && userFound.active === "true") ||
        (user === "admin" && password === "admin")
      ) {
        this.isLogged = true;
        //@ts-ignore
        this.userData.push(...this.userMock);

        return true;
      } else {
        return false;
      }
    },

    async createUser(user: any) {
      //@ts-ignore
      this.userData.push(user);

      return true;
    },
    isUpdateUserSet(update: Boolean) {
      this.isUpdateUser = update;
    },
    updateUserSet(user: any) {
      this.userDataUpdatde = user;
    },
    async updateUser(user: any) {
      const objectUpdate = this.userData.find((obj) => obj.id === user.id);

      if (objectUpdate) {
        objectUpdate.nome = user.nome;
        objectUpdate.documento = user.documento;
        objectUpdate.senha = user.senha;
        // Atualizar dados no localStorage
        this.localStorageUsers = this.userData;
        return true;
      } else {
        console.error("Objeto não encontrado para editar.");
        return false;
      }
    },
    async deleteUser(userId: number) {
      // Encontrar o índice do usuário no array
      const index = this.userData.findIndex((user) => user.id === userId);

      console.log(index, "esse é o index");

      if (index !== -1) {
        // Remover o usuário do array
        this.userData.splice(index, 1);

        // Atualizar dados no localStorage
        this.localStorageUsers = this.userData;
        return true;
      } else {
        return false;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
