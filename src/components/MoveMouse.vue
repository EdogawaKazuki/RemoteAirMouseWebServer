
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const socket = new WebSocket('wss://192.168.50.107:3001/socket.io');
const orientation = ref({
  alpha: 0, // Yaw
  beta: 0,  // Pitch
  gamma: 0  // Roll
});
function calibration() {
  var msg = JSON.stringify({
    type: 'calibration',
    data: {
        alpha: orientation.value.alpha,
        beta: orientation.value.beta,
        gamma: orientation.value.gamma
    }
  });
  socket.send(msg);
}
function rightClick() {
  var msg = JSON.stringify({
    type: 'rightClick',
  });
  socket.send(msg);
}
function leftClick() {
  var msg = JSON.stringify({
    type: 'leftClick',
  });
  socket.send(msg);
}
const updateOrientation = (event: DeviceOrientationEvent) => {
  orientation.value.alpha = Math.round(event.alpha? event.alpha : 0);
  orientation.value.beta = Math.round(event.beta? event.beta : 0);
  orientation.value.gamma = Math.round(event.gamma? event.gamma : 0);
    
  const orientationData = {
    alpha: event.alpha,
    beta: event.beta,
    gamma: event.gamma
  };
  var msg = JSON.stringify({
    type: 'orientation',
    data: orientationData
  });
  socket.send(msg);
};


onMounted(() => {
  window.addEventListener('deviceorientation', (event) => {
    updateOrientation(event);
  })
});

onUnmounted(() => {
  window.removeEventListener('deviceorientation', (event) => {
    updateOrientation(event);
  });
});

</script>

<template>
    <div>
      <button type="button" name="button" v-on:click="leftClick">Left Click</button>
      <button type="button" name="button" v-on:click="rightClick">Right Click</button>
    </div>
    <div>
      <p>Alpha (Yaw): {{ orientation.alpha }}</p>
      <p>Beta (Pitch): {{ orientation.beta }}</p>
      <p>Gamma (Roll): {{ orientation.gamma }}</p>
      <button type="button" name="button" v-on:click="calibration">Reset</button>
    </div>
  </template>
  