<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Navbar from "./views/Navbar.vue";
import { initFlowbite } from "flowbite";
initFlowbite();
</script>

<template>
  <header>
    <Navbar />
    <!-- <RouterLink to="/">Home</RouterLink> -->
    <!-- <RouterLink to="/about">About</RouterLink> -->
  </header>

  <RouterView />
</template>

<style scoped></style>
