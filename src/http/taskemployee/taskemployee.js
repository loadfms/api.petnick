const registerTaskEmloyeeRoutes = (deps) => {

    const {server, db} = deps

    server.get('/task-employee', async (req, res, next) => {
        try {
            res.send(await db.taskemployees().all())
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }
    
    })
    
    server.post('/task-employee', async (req, res, next) => {
        const { taskID, employeeID } = req.params
        try {
            res.send(await db.taskemployees().save(taskID, employeeID))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
    
    server.put('/task-employee', async (req, res, next) => {
        const { id, taskID, employeeID } = req.params
        try {
            res.send(await db.taskemployees().update(id, taskID, employeeID))
        }
        catch (err) {
            res.send(err)
        }
        next()
    
    })
    
    server.del('/task-employee', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.taskemployees().del(id))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
}

module.exports = registerTaskEmloyeeRoutes