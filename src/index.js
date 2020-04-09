require('dotenv').config()
const restify = require('restify')
const server = restify.createServer()

server.get('/health', async (req, res, next) => {
    try {
        
        res.send({status: 'ok'})
        next()
    }
    catch (err) {
        res.send(err)
        next()
    }

})

server.listen('5000')

console.log('started on port 5000')