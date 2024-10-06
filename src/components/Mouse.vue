<script setup lang="ts">
import { onMounted, onUnmounted, ref, inject } from 'vue';

const socket = inject('socket') as WebSocket;
const orientation = ref({
  alpha: 0, // Yaw
  beta: 0,  // Pitch
  gamma: 0  // Roll
});
var isRotation = false;

function reset() {
  var msg = JSON.stringify({
    type: 'reset',
    data: {
      orientation: orientation.value
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
  if (isRotation){
    orientation.value.alpha = event.alpha ?? 0;
    orientation.value.beta = event.beta ?? 0;
    orientation.value.gamma = event.gamma ?? 0;
    var msg = JSON.stringify({
      type: 'orientation',
      data: orientation.value
    });
    socket.send(msg);
  }
};

const startRotation = () => {
  isRotation = true;
}

const stopRotation = () => {
  isRotation = false;
}

function keyDown(key: string) {
  var msg = JSON.stringify({
    type: 'keyDown',
    data: {
      key: key
    }
  });
  socket.send(msg);
}
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
      <button type="button" name="button" v-on:click="keyDown('q')">q</button>
      <button type="button" name="button" v-on:click="keyDown('w')">w</button>
      <button type="button" name="button" v-on:click="keyDown('e')">e</button>
      <button type="button" name="button" v-on:click="keyDown('r')">r</button>
      <button type="button" name="button" v-on:click="keyDown('t')">t</button>
      <button type="button" name="button" v-on:click="keyDown('y')">y</button>
      <button type="button" name="button" v-on:click="keyDown('u')">u</button>
      <button type="button" name="button" v-on:click="keyDown('i')">i</button>
      <button type="button" name="button" v-on:click="keyDown('o')">o</button>
      <button type="button" name="button" v-on:click="keyDown('p')">p</button>
    </div>
    <div>
      <button type="button" name="button" v-on:click="keyDown('a')">a</button>
      <button type="button" name="button" v-on:click="keyDown('s')">s</button>
      <button type="button" name="button" v-on:click="keyDown('d')">d</button>
      <button type="button" name="button" v-on:click="keyDown('f')">f</button>
      <button type="button" name="button" v-on:click="keyDown('g')">g</button>
      <button type="button" name="button" v-on:click="keyDown('h')">h</button>
      <button type="button" name="button" v-on:click="keyDown('j')">j</button>
      <button type="button" name="button" v-on:click="keyDown('k')">k</button>
      <button type="button" name="button" v-on:click="keyDown('l')">l</button>
    </div>
    <div>
      <button type="button" name="button" v-on:click="keyDown('z')">z</button>
      <button type="button" name="button" v-on:click="keyDown('x')">x</button>
      <button type="button" name="button" v-on:click="keyDown('c')">c</button>
      <button type="button" name="button" v-on:click="keyDown('v')">v</button>
      <button type="button" name="button" v-on:click="keyDown('b')">b</button>
      <button type="button" name="button" v-on:click="keyDown('n')">n</button>
      <button type="button" name="button" v-on:click="keyDown('m')">m</button>
    </div>
    <div>
      <p>Rotation Control</p>
      <button type="button" name="button" v-on:click="startRotation">Start</button>
      <button type="button" name="button" v-on:click="reset">Reset</button>
      <button type="button" name="button" v-on:click="stopRotation">Stop</button>
    </div>
    <div>
      <button type="button" name="button" v-on:click="leftClick">Left Click</button>
      <button type="button" name="button" v-on:click="rightClick">Right Click</button>
    </div>

  </template>
