var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app);
  
require('prototype');

var Chunks = require('./Chunk.js');
var Generator = require('./Generator.js');

var chunk1 = Generator.getChunk(-19, 64, 16);

console.log(chunk1.blocks[0][0][0].type);


app.listen(8080);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
