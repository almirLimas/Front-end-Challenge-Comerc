import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    userData: useStorage("userData", []),
    isLogged: false,
    userMock: [
      {
        id: 1,
        name: "Stalone Pereeira",
        doc: "12345",
        password: "123",
        status: "ativo",
      },
      {
        id: 2,
        name: "Ribeiro dos Pinhais",
        doc: "1234",
        password: "123",
        status: "ativo",
      },
      {
        id: 3,
        name: "Lian Silva",
        doc: "12345",
        password: "123",
        status: "ativo",
      },
      {
        id: 4,
        name: "Junio Junior",
        doc: "12345",
        password: "123",
        status: "ativo",
      },
      {
        id: 5,
        name: "Carlos Santos",
        doc: "12345",
        password: "123",
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
      console.log(user, "esse entrouuuu");
      //@ts-ignore
      this.userData.push(user);

      return true;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
