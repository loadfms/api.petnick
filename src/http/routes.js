const db = require('../services/mysql')
const registerTaskRoutes = require('./task/task')
const registerAuthRoutes = require('./auth/auth')
const registerEmployeeRoutes = require('./employee/employee')
const registerUserRoutes = require('./user/user')
const registerTaskEmloyeeRoutes = require('./taskemployee/taskemployee')

const routes = (server) => {
    server.get('/', (req, res, next) => {
        next()
    })

    registerTaskRoutes({server, db})
    registerAuthRoutes({server, db})
    registerEmployeeRoutes({server, db})
    registerUserRoutes({server, db})
    registerTaskEmloyeeRoutes({server, db})
}

module.exports = routes