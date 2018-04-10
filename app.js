const express = require('express'),
app = express(),

app.get('*', (req, res)=>{
  res.write('success')
})

app.listen(process.env.PORT, ()=>{
  console.log('Server started, listening on Port ' + process.env.PORT)
})
