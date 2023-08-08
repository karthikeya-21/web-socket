const express=require("express");
const app=express();

app.set("view engine","ejs");

const WebSocket = require('ws');


app.get("/",(req,res)=>{
  res.render("socket_client");
});

// Create a Websocket server
const wss = new WebSocket.Server({ port: 8000 });

// Set up event listeners for server interactions
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Listen for messages from clients
  ws.on('message', (message) => {
    // Broadcast the message to all clients
    wss.clients.forEach(client => {
        // console.log(client);
      if (client.readyState === WebSocket.OPEN) {
        client.send(`User said: ${message}`);
      }
    });
  });

  // Listen for the connection close event
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const port=8000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
