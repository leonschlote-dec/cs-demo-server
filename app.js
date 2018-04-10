const express = require('express'),
app = express()

app.use('/files', express.static(__dirname+'/public'))

app.get('*', (req, res)=>{
  res.send('success')
})


app.listen(process.env.PORT, ()=>{
  console.log('Server started, listening on Port ' + process.env.PORT)
})
