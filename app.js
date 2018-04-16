const express = require('express'),
tcp = require('net'),
app = express(),
httpPort = 80,
tcpPort = 8081

app.use('/files', express.static(__dirname+'/public'))

/*app.get('*', (req, res)=>{
  console.log('http request')
  res.send('success')
})*/

app.listen(httpPort, ()=>{
  console.log('HTTP Server started, listening on Port ' + (httpPort))
})




var server = tcp.createServer((socket)=>{
  app.get('/test', (req, res)=>{
    res.send('test worked')
  })

  process.stdin.on('data', (data)=>{
    socket.write(data)  
  })

  /*client.on('data', (buffer)=>{
    var response = buffer.toString('utf8')
    if(!response.match(/HTTP\/1\.1 400 Bad Request/)){
      socket.write(response);
      socket.end()
    }
  })*/
});



server.listen(tcpPort, ()=>{
  console.log('TCP Server started, listening on Port ' + (tcpPort))
});
