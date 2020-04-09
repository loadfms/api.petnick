const pgServer = require('pg')
const connection = new pgServer.Client({
    connectionString:  process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.PG_CONNECTION,
})

connection.connect()

const errorHandler = (error, msg, rejectFunction) =>{
    console.log(error)
    rejectFunction({error: msg})
}

console.log('connected on ' + process.env.DATABASE_URL)

const authModule = require('./auth/auth')({ connection, errorHandler })
const tasksModule = require('./task/task')({ connection, errorHandler })
const usersModule = require('./user/user')({ connection, errorHandler })
const employeeModule = require('./employee/employee')({ connection, errorHandler })
const taskEmployeeModule = require('./taskemployee/taskemployee')({ connection, errorHandler })
const customerModule = require('./customer/customer')({ connection, errorHandler })
const appointmentModule = require('./appointment/appointment')({ connection, errorHandler })

module.exports = {
    tasks: () => tasksModule,
    users: () => usersModule,
    auth: () => authModule,
    employees: () => employeeModule,
    taskemployees: () => taskEmployeeModule,
    customers: () => customerModule,
    appointments: () => appointmentModule
}