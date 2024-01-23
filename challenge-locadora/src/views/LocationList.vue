<template>
  <div class="flex justify-center items-center mt-40">
    <div class="container bg-white rounded-lg p-2">
      <div class="container flex justify-end mt-1 mb-1">
        <button class="p-3 bg-green-400 rounded-lg text-white">
          <i class="fa-solid fa-user-plus mr-4"></i> Novo usuário
        </button>
      </div>
      <table class="table-fixed border-collapse border border-slate-400 w-full">
        <thead>
          <tr>
            <th class="border border-slate-300 h-14">ID</th>
            <th class="border border-slate-300">Nome</th>
            <th class="border border-slate-300">Documento</th>
            <th class="border border-slate-300">Documento</th>
            <th class="border border-slate-300">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="border border-slate-300 h-9 p-2 text-center">
              Malcolm Lockyer
            </td>
            <td class="border border-slate-300 p-2">Malcolm Lockyer</td>
            <td class="border border-slate-300 p-2">Malcolm Lockyer</td>
            <td class="border border-slate-300">1972</td>
            <td class="border border-slate-300">1972</td>
          </tr>
          <tr>
            <td class="border border-slate-300 h-9 p-2 text-center">
              Witchy Woman
            </td>
            <td class="border border-slate-300">The Eagles</td>
            <td class="border border-slate-300">1972</td>
            <td class="border border-slate-300">1972</td>
            <td class="border border-slate-300">1972</td>
          </tr>
          <tr>
            <td class="border border-slate-300 h-9 p-2 text-center">
              Shining Star
            </td>
            <td class="border border-slate-300">Earth, Wind, and Fire</td>
            <td class="border border-slate-300">1975</td>
            <td class="border border-slate-300">1972</td>
            <td class="border border-slate-300">1972</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>
