
<script setup lang="ts">
import { ref, defineEmits, inject } from 'vue';

const socket = inject('socket') as WebSocket;
const emit = defineEmits(['updateServerAddress']);

var serverAddress = ref('192.168.50.107');
var screenDistance = ref(50);
var screenSize = ref(50);
var controlAngleHorizontal = ref(90);
var controlAngleVertical = ref(90/16*9);
var screenRatio = ref("16:9");

function setControlAngle() {
  var msg = JSON.stringify({
    type: 'calibration',
    data: {
      controlAngleHorizontal: controlAngleHorizontal.value,
      controlAngleVertical: controlAngleVertical.value,
    }
  });
  socket.send(msg);
}

function onScreenDistanceChange(event: Event) {
  screenDistance.value = parseFloat((event.target as HTMLInputElement).value);
  controlAngleHorizontal.value = Math.round(Math.atan(screenSize.value  * 2.54 / (2 * screenDistance.value )) * 2 * 57.2958);
  controlAngleVertical.value = controlAngleHorizontal.value / 16 * 9;
  setControlAngle();
}

function onScreenSizeChange(event: Event) {
  screenSize.value = parseFloat((event.target as HTMLInputElement).value);
  controlAngleHorizontal.value = Math.round(Math.atan(screenSize.value  * 2.54 / (2 * screenDistance.value )) * 2 * 57.2958);
  controlAngleVertical.value = controlAngleHorizontal.value / 16 * 9;
  setControlAngle();
}

function onScreenRatioChange(event: Event) {
  screenRatio.value = (event.target as HTMLInputElement).value;
  if (screenRatio.value === "16:9") {
    controlAngleVertical.value = controlAngleHorizontal.value / 16 * 9;
  } else if (screenRatio.value === "4:3") {
    controlAngleVertical.value = controlAngleHorizontal.value / 4 * 3;
  }
  setControlAngle();
}

function onControlAngleHorizontalChange(event: Event) {
  controlAngleHorizontal.value = parseFloat((event.target as HTMLInputElement).value);
  controlAngleVertical.value = controlAngleHorizontal.value / 16 * 9;
  screenDistance.value = screenSize.value * 2.54 / (2 * Math.tan(controlAngleHorizontal.value * Math.PI / 180));
  setControlAngle();
}
function onServerAddressChange(event: Event) {
  serverAddress.value = (event.target as HTMLInputElement).value;
  emit('updateServerAddress', serverAddress.value);
}
</script>

<template>
    <div>
        <p>Server address: {{ serverAddress }}</p>
        <input type="text" v-model="serverAddress" v-on:change="onServerAddressChange" />
        <p>Screen Ratio</p>
        <input type="radio" name="screenRatio" value="16:9" v-model="screenRatio" v-on:change="onScreenRatioChange" checked/>16:9
        <input type="radio" name="screenRatio" value="4:3" v-model="screenRatio" v-on:change="onScreenRatioChange"/>4:3
        <p>Screen Distance (cm): {{ screenDistance }}</p>
        <input type="range" min="50" max="300" v-model="screenDistance" v-on:change="onScreenDistanceChange" />
        <p>Screen Size (inches): {{ screenSize }}</p>
        <input type="range" min="20" max="100" v-model="screenSize" v-on:change="onScreenSizeChange" />
        <p>Control Angle (deg): {{ controlAngleHorizontal }}</p>
        <input type="range" min="0" max="180" v-model="controlAngleHorizontal" v-on:change="onControlAngleHorizontalChange" />
    </div>
</template>
  