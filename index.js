const express=require("express")
const app=express()
const http=require('http')
const path=require("path");
const PORT=process.env.PORT || 4000
const WebSocket = require('ws');
const cors = require('cors');
app.use(cors());
const server = http.createServer(app); // Create an HTTP server using Express app
const io = new WebSocket.Server({ port:4050 });


app.listen(PORT,()=>console.log(`Server Running on port ${PORT}`))

app.use(express.static(path.join(__dirname,'public')))

io.on('connection',(ws)=>{
    console.log("Connected")
    io.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            var data={
                type:"count",
                count:io.clients.size.toString()
            }
          client.send(JSON.stringify(data));
        }
      });

    ws.on('message',(message)=>{
        var data=JSON.parse(message)
        // console.log(data)
            io.clients.forEach(client => {
                if (client!=ws && client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify(data));
                }
              });
    })

    ws.on('close',(ws)=>{
    console.log("Dis-Connected")
    io.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            var data={
                type:"count",
                count:io.clients.size.toString()
            }
          client.send(JSON.stringify(data));
        }
      });
})

})