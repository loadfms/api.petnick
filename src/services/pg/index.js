const pgServer = require('pg')
const connection = new pgServer.Client({
    ssl:process.env.NODE_ENV === 'production' ? 'required' : '',
    connectionString:  process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL : process.env.PG_CONNECTION,
})

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
connection.connect()

const errorHandler = (error, msg, rejectFunction) =>{
    console.log(error)
    rejectFunction({error: msg})
}

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