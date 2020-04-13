require('dotenv').config()
const pgServer = require('pg')
const connection = new pgServer.Client({
    connectionString: process.env.PG_CONNECTION,
})

connection.connect()

const errorHandler = (error, msg, rejectFunction) =>{
    rejectFunction({error: msg})
}

module.exports = { connection, errorHandler }