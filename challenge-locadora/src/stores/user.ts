import { defineStore, acceptHMRUpdate } from "pinia";
import { useStorage } from "@vueuse/core";

/**
 * Simulate a login
 */
function apiLogin(a: string, p: string) {
  if (a === "admin" && p === "admin") return Promise.resolve({ isAdmin: true });
  if (p === "ed") return Promise.resolve({ isAdmin: false });
  return Promise.reject(new Error("invalid credentials"));
}

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    name: "Eduardo",
    isAdmin: false,
  }),

  actions: {
    logout() {
      this.$patch({
        name: "",
        isAdmin: false,
      });

      // we could do other stuff like redirecting the user
    },

    /**
     * Attempt to login a user
     */
    async login(user: string, password: string) {
      console.log("bla bla blsa");
      useStorage("my-store", { hello: "hi", greeting: "Hello" });
      const userData = await apiLogin(user, password);

      this.$patch({
        name: user,
        ...userData,
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
