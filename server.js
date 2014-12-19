var express = require('express')
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static(__dirname + '/'));

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('update', function(msg) {
    console.log('message: ' + msg.length);
    io.emit('update', msg);
  });
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});
