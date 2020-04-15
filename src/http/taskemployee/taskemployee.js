const toViewModel = require('./viewmodel')
const registerTaskEmloyeeRoutes = (deps) => {

    const {server, db} = deps

    server.get('/task-employee/:employeeId', async (req, res, next) => {
        const { employeeId } = req.params
        try {
            const data = await db.taskemployees().all(employeeId)
            res.send(toViewModel(data))
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }
    
    })
    
    server.post('/task-employee', async (req, res, next) => {
        const items = req.params
        try {
            items.forEach(element => {
                db.taskemployees().save(element.taskId, element.employeeId)
            });
            res.send('ok')
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
    
    server.del('/task-employee', async (req, res, next) => {
        const { employeeId } = req.params
        try {
            res.send(await db.taskemployees().del(employeeId))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
}

module.exports = registerTaskEmloyeeRoutes