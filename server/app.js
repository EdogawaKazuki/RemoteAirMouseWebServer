var express = require('express');
var app = express();
var robot = require('robotjs');
const path = require('path');
// const WebSocketServer = require('ws').Server;
var expressWs = require('express-ws')

// for cross site
var cors = require('cors');
app.use(cors());
// for https
const fs = require('fs');
const https = require('https');
const key = fs.readFileSync('./ssl/key.pem');
const cert = fs.readFileSync('./ssl/cert.pem');

var credentials = {key: key, cert: cert};
var httpsServer = https.createServer(credentials, app);
var vertical_range = 45
var horizontal_range = 45
var screen_width = robot.getScreenSize().width
var screen_height = robot.getScreenSize().height
var screen_width_center = robot.getScreenSize().width / 2
var screen_height_center = robot.getScreenSize().height / 2
app.use(express.static('public'))
var useHttps = true;
if(useHttps){
  expressWs(app, httpsServer);
  httpsServer.listen(3001);
} else {
  expressWs(app);
  app.listen(3001, function () {
    console.log('Example app listening on port 3001!')
  })
}

app.ws('/socket.io', (ws, req) => {
  console.log('socket.io connected');
  var orientation = {alpha: 0, beta: 0, gamma: 0}
  ws.on('message', (msg) => {
    // console.log('message from client: ', JSON.parse(msg));
    var data = JSON.parse(msg)

    if (data.type === "orientation"){
      // console.log(data)
      var mouse = robot.getMousePos();
      // console.log(mouse)
      // Move the mouse to the specified position
      var alpha = data.data.alpha > 180 ? data.data.alpha - 360 : data.data.alpha
      var beta = data.data.beta
      console.log(alpha, beta)
      // console.log("Mouse before: ", mouse.x, mouse.y)
      robot.moveMouse(screen_width_center - screen_width * (alpha - orientation.alpha) / horizontal_range, 
                      screen_height_center - screen_height * (beta - orientation.beta) / vertical_range);
      mouse = robot.getMousePos();
      // console.log('mouse moved:', mouse.x, mouse.y)
    }else if (data.type === "calibration"){
      horizontal_range = data.data.controlAngleHorizontal
      vertical_range = data.data.controlAngleVertical
      console.log("Calibration data updated")
      console.log("Horizontal range: ", horizontal_range)
      console.log("Vertical range: ", vertical_range)
    }else if(data.type === "reset"){
      orientation = data.data.orientation
    }
    else if(data.type === "leftClick"){
      robot.mouseClick()
    }else if(data.type === "rightClick"){
      robot.mouseClick("right")
    }else if(data.type === "keyDown"){
      console.log("keyDown: ", data)
      robot.keyTap(data.data.key)
    }

    ws.send('hello from server');
  })
})
module.exports = app;
