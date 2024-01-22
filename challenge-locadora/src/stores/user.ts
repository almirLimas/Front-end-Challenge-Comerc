import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage } from "@vueuse/core";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    userData: useStorage("userData", []),
    isLogged: false,
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
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
