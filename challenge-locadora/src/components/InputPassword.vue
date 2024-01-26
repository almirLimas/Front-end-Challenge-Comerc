<template>
  <div>
    <label :for="iputName" class="block text-gray-700 text-sm font-bold mb-2">{{
      labelName
    }}</label>
    <input
      :value="props.modelValue"
      @input="updateValue"
      :id="iputName"
      :type="showPassword ? 'text' : 'password'"
      :name="iputName"
      required
      maxlength="8"
      class="w-full p-2 border border-gray-200 rounded-md"
      :placeholder="placeHolder"
    />
    <button type="button" @click="togglePasswordVisibility" class="eyePassword">
      <i
        :class="showPassword ? 'fa-regular fa-eye' : 'fa-regular fa-eye-slash'"
      ></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showPassword = ref(false);
const props = defineProps({
  labelName: {
    type: String,
    required: true,
  },
  iputName: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeHolder: {
    type: String,
  },
});
const emit = defineEmits(["update:modelValue"]);
const labelName = ref(props.labelName);
const iputName = ref(props.iputName);

const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value;
};

const updateValue = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<style scoped>
.eyePassword {
  position: relative;
  top: -1.9rem;
  left: 17rem;
}
@media (max-width: 420px) {
  .eyePassword {
    left: 16rem;
  }
}
@media (max-width: 400px) {
  .eyePassword {
    left: 14rem;
  }
}
@media (max-width: 372px) {
  .eyePassword {
    left: 13rem;
  }
}
@media (max-width: 352px) {
  .eyePassword {
    left: 12rem;
  }
}
@media (max-width: 338px) {
  .eyePassword {
    left: 11rem;
  }
}
@media (max-width: 316px) {
  .eyePassword {
    left: 10rem;
  }
}
@media (max-width: 302px) {
  .eyePassword {
    left: 9rem;
  }
}
@media (max-width: 282px) {
  .eyePassword {
    left: 8rem;
  }
}
</style>
