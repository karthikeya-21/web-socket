const express=require('express')
var app = express();
const path=require('path')
var http = require( 'http' ).createServer( app );
var io = require( 'socket.io' )( http );

const PORT = process.env.PORT || 3050;

// app.get( '/', function( req, res ) {
// res.sendFile( __dirname + '/public/index.html' );
// });
app.use(express.static(path.join(__dirname,'public')))

http.listen( PORT, function() {
console.log( 'listening on *:' + PORT );
});

io.on( 'connection', function( socket ) {
console.log( 'a user has connected!' );
// console.log(io.sockets.sockets.size);
io.emit('totalclients',io.sockets.sockets.size)


socket.on( 'disconnect', function() {
console.log( 'user disconnected' );
// console.log(io.sockets.sockets.size);
io.emit('totalclients',io.sockets.sockets.size)
});

socket.on('send_message',(data)=>{
  socket.broadcast.emit('message',data);
});

});

