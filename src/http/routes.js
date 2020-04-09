
const registerHealthRoutes = require('./health/health')

const routes = (server) => {
    server.get('/', (req, res, next) => {
        next()
    })

    registerHealthRoutes({server})
    // registerTaskRoutes({server, db})
    // registerAuthRoutes({server, db})
    // registerEmployeeRoutes({server, db})
    // registerUserRoutes({server, db})
    // registerTaskEmloyeeRoutes({server, db})
    // registerCustomerRoutes({server, db})
    // registerAppointmentRoutes({server, db})
}

module.exports = routes