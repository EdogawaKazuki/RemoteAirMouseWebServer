# Remote Air Mouse Web Server

This project uses Vue and Express and still in progress.

The '[deviceorientation](https://developer.mozilla.org/en-US/docs/Web/API/Device_orientation_events/Detecting_device_orientation)' event is used to get the device orientation. 

[Websocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) is used to communicate through the client and server.

[ROBOTJS](https://robotjs.io/) is used to simulate the input device on the srever.

The code would be a mess because its still on proof of concept state.

Only tested in Windows 11 + Android Edge.

# Execute

## Compile front-end

1. Change the websocket serverIP address in src/components/MoveMouse.vue
2. npm run build
3. Move the file in dist to server/public

## Execute

1. cd server
2. npm start
