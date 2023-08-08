const WebSocket = require('ws');

// Create a Websocket server
const wss = new WebSocket.Server({ port: 8080 });

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

console.log('Websocket server running on port 8080');
