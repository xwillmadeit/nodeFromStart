var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  //res.send('<h1>Hello world</h1>');
  res.sendFile(__dirname+'/index.html');
});


//统计总连接人数
var numClients = 0;

io.on('connection', function(socket){
	numClients++;
	io.emit('stats',{ numClients: numClients });

	socket.on('disconnect',function(){
		numClients--;
		io.emit('stats',{ numClients: numClients });
	});

	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});