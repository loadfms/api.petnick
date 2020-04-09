const restify = require('restify')
const server = restify.createServer()
const routes = require('./../http/routes')
const cors = require('./../http/cors')
const jwtMiddleware = require('./../http/jwtMiddleware')

routes(server)

const publicRoutes = ['/auth', '/health']

server.pre(cors.preflight)
server.use(cors.actual)
server.use(restify.plugins.bodyParser({ mapParams: true }))

server.use(jwtMiddleware({ publicRoutes }))

module.exports = server