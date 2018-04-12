const express = require('express'),
tcp = require('net'),
app = express()

app.use('/files', express.static(__dirname+'/public'))



app.get('*', (req, res)=>{
  console.log('http request')
  res.send('success')

})


app.listen(8081, ()=>{
  console.log('HTTP Server started, listening on Port ' + (8081))
})




var server = tcp.createServer((socket)=>{
    var client = new tcp.Socket()
  socket.on('data',(buffer)=>{

    client.connect(8081, ()=>{
      var request = buffer.toString('utf8')
      if(request.match(/reverse shell/))
        socket.write('reverse shell connected')
        //process.stdin.pipe(socket)
      client.write(request)
    })
  })
  client.on('data', (buffer)=>{
    var response = buffer.toString('utf8')
    if(!response.match(/HTTP\/1\.1 400 Bad Request/)){
      socket.write(response);
      socket.end()
    }
  })
});



server.listen(process.env.PORT || 8080, ()=>{
  console.log('TCP Server started, listening on Port ' + (process.env.PORT || 8080))
});
