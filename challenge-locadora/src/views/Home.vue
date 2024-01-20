<template>
  <div class="flex justify-center items-center h-[85vh]">
    <div class="container bg-black m-8 h-5/6 shadow-xl rounded-lg">
      <div class="grid lg:grid-cols-4 md:grid-cols-1 gap-4 shadow-xl">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Banner from "./Banner.vue";
import FormComponent from "../components/FormComponent.vue";
import Card from "@/components/Card.vue";

export default {
  components: {
    Banner,
    FormComponent,
    Card,
  },
};
</script>
