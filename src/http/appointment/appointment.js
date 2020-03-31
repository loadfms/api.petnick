const registerAppointmentRoutes = (deps) => {

    const {server, db} = deps

    server.get('/appointment', async (req, res, next) => {
        try {
            res.send(await db.appointments().all())
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }
    
    })
    
    server.post('/appointment', async (req, res, next) => {
        const { customer_id, task_employee_id, date_time } = req.params
        try {
            res.send(await db.appointments().save(customer_id, task_employee_id, date_time))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
    
    server.put('/appointment', async (req, res, next) => {
        const { id, customer_id, task_employee_id, date_time } = req.params
        try {
            res.send(await db.appointments().update(id, customer_id, task_employee_id, date_time))
        }
        catch (err) {
            res.send(err)
        }
        next()
    
    })
    
    server.del('/appointment', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.appointments().del(id))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
}

module.exports = registerAppointmentRoutes