<template>
  <div class="flex justify-center items-center lg:mt-40 xl:mt-40 sm:mt-16">
    <div class="container">
      <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-4">
        <Card
          :title-card="'Usuário'"
          :icon-card="'fa-solid fa-user'"
          @click-card="router.push({ path: '/userList' })"
        />
        <Card
          :title-card="'Clientes'"
          :icon-card="'fa-solid fa-users'"
          @click-card="router.push({ path: '/clientList' })"
        />
        <Card
          :title-card="'Filmes'"
          :icon-card="'fa-solid fa-clapperboard'"
          @click-card="router.push({ path: '/filmList' })"
        />
        <Card
          :title-card="'Locação'"
          :icon-card="'fa-solid fa-video'"
          @click-card="router.push({ path: '/locationList' })"
        />
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
