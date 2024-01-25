<template>
  <div>
    <div class="border bg-white rounded-lg p-2 w-80 h-80">
      <div>
        <i class="fa-solid fa-film text-cyan-500 text-lg"></i>
      </div>

      <label class="text-slate-500 text-sm font-bold">Titulo:</label>
      <p class="text-gray-600 text-sm font-bold">{{ ` ${title}` }}</p>
      <label class="text-slate-500 text-sm font-bold">Ano:</label>
      <p class="text-gray-600 text-sm font-bold">{{ `${year}` }}</p>
      <div class="mt-2">
        <button
          @click="clickLocation"
          v-if="isLocation === false && delivered === false"
          type="button"
          class="bg-cyan-500 text-white px-4 py-1 rounded-md"
        >
          Alugar
        </button>

        <div
          v-if="isLocation && delivered === false"
          type="button"
          class="bg-yellow-100 text-gray-600 text-sm font-bold p-2 rounded-lg mt-1"
        >
          Alugado - {{ dateLocation }}
        </div>

        <div
          v-if="delivered"
          type="button"
          class="bg-green-300 text-gray-600 text-sm font-bold p-2 rounded-lg mt-1"
        >
          Entregue - {{ format(new Date(), "dd/MM/yyyy") }}
        </div>
        <div
          v-if="isLocation && delivered === false"
          type="button"
          class="text-gray-600 text-sm font-bold p-2 rounded-lg mt-1"
        >
          Cliente - {{ client }}
        </div>
        <button
          @click="isDelivered"
          v-if="dateLocation && delivered === false"
          type="button"
          class="bg-cyan-500 text-white px-4 py-1 rounded-md"
        >
          Já foi Entregue?
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from "vue";
const swal: any = inject("$swal");
const emit = defineEmits(["clickLocation", "clickDerived"]);
import { format } from "date-fns";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  client: {
    type: String,
  },
  isDelivered: {
    type: Boolean,
    default: false,
  },
  isLocation: {
    type: Boolean,
    default: false,
  },
  dateLocation: {
    type: String,
  },

  dateDelivered: {
    type: String,
    default: format(new Date(), "dd/MM/yyyy"),
  },
});
const delivered = ref(false);

const clickLocation = () => {
  emit("clickLocation");
};
const isDelivered = () => {
  swal
    .fire({
      title: "Atenção!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sim",
      cancelButtonText: "cancelar",
      text: "Esse filme já foi entregue?",
    })
    .then((result: any) => {
      if (result.isConfirmed) {
        delivered.value = true;
      }
    });
};
const title = ref(props.title);
const year = ref(props.year);
</script>
