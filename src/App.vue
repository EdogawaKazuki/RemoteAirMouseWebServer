<script setup lang="ts">
import { ref, provide } from 'vue';
import Setting from './components/Setting.vue'
import MoveMouse from './components/Mouse.vue'

var socket = new WebSocket('wss://192.168.50.107:3001/socket.io');
var serverAddress = ref('192.168.50.107');
provide('socket', socket);

const currentPage = ref('setting');

function switchPage(page: string) {
  currentPage.value = page;
}
function updateServerAddress(event: Event) {
  serverAddress.value = (event.target as HTMLInputElement).value;
  socket.close();
  socket = new WebSocket('wss://' + serverAddress.value + ':3001/socket.io');
  provide('socket', socket);
}

</script>

<template>
  <nav>
    <button @click="switchPage('setting')">Settings</button>
    <button @click="switchPage('mouse')">Mouse</button>
  </nav>
  <Setting v-if="currentPage === 'setting'" @updateServerAddress="updateServerAddress" />
  <MoveMouse v-if="currentPage === 'mouse'" />
  <!-- <OrientationChart /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
