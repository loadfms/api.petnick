const restify = require('restify')
const server = restify.createServer()
const routes = require('./../http/routes')
const cors = require('./../http/cors')
const jwtMiddleware = require('./../http/jwtMiddleware')

try {
    routes(server)

    const publicRoutes = ['/auth', '/health']
    console.log("teste")


    server.pre(cors.preflight)
    server.use(cors.actual)
    server.use(restify.plugins.bodyParser({ mapParams: true }))

    server.use(jwtMiddleware({ publicRoutes }))

} catch (err) {
    console.log(err)
}
module.exports = server
