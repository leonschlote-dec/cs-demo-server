const request = require('request')

var socket = request.post('http://raspberrypi.local/keylogger'),
file = fs.createReadStream(__dirname+'/test.txt')

file.pipe(socket)
