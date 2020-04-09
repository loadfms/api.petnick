const db = require('../services/mysql')
const registerTaskRoutes = require('./task/task')
const registerAuthRoutes = require('./auth/auth')
const registerEmployeeRoutes = require('./employee/employee')
const registerUserRoutes = require('./user/user')
const registerTaskEmloyeeRoutes = require('./taskemployee/taskemployee')
const registerCustomerRoutes = require('./customer/customer')
const registerAppointmentRoutes = require('./appointment/appointment')
const registerHealthRoutes = require('./health/health')

const routes = (server) => {
    server.get('/', (req, res, next) => {
        next()
    })

    registerHealthRoutes({server})
    registerTaskRoutes({server, db})
    registerAuthRoutes({server, db})
    registerEmployeeRoutes({server, db})
    registerUserRoutes({server, db})
    registerTaskEmloyeeRoutes({server, db})
    registerCustomerRoutes({server, db})
    registerAppointmentRoutes({server, db})
}

module.exports = routes