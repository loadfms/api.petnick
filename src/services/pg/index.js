const pgServer = require('pg')
const connection = new pgServer.Client({
    ssl:'required',
    connectionString: 'postgres://vcukavnogdorhu:32eda2da116ef9336b03cf2f0973d3c1737e0ba414af82fd660846b889db0b42@ec2-34-233-186-251.compute-1.amazonaws.com:5432/ddc61kp1foenkm'
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