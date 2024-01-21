<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container">
      <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
        <Card
          :title-card="'Usuário'"
          :icon-card="'fa-solid fa-user'"
          @click-card="router.push({ path: '/' })"
        />
        <Card
          :title-card="'Clientes'"
          :icon-card="'fa-solid fa-users'"
          @click-card="clicou('kk')"
        />
        <Card :title-card="'Filmes'" :icon-card="'fa-solid fa-clapperboard'" />
        <Card :title-card="'Locação'" :icon-card="'fa-solid fa-video'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Card from "@/components/Card.vue";
import { useRouter } from "vue-router";
const router = useRouter();

const clicou = (e: any) => {
  console.log(e);
};
</script>
