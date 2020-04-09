require('dotenv').config()
const server = require('./server/index')

server.listen('5000')

console.log('started on port 5000')