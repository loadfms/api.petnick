const toViewModel = require('./viewmodel')
const registerEmployeeRoutes = (deps) => {

    const {server, db} = deps

    server.get('/employee', async (req, res, next) => {
        try {
            res.send(await db.employees().all())
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }
    
    })

    server.get('/employee/:id', async (req, res, next) => {
        try {
            const { id } = req.params
            const data = await db.employees().one(id)
            res.send(toViewModel(data))
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }
    
    })
    
    server.post('/employee', async (req, res, next) => {
        const { name } = req.params
        try {
            res.send(await db.employees().save(name))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
    
    server.put('/employee', async (req, res, next) => {
        const { name, id } = req.params
        try {
            res.send(await db.employees().update(id, name))
        }
        catch (err) {
            res.send(err)
        }
        next()
    
    })
    
    server.del('/employee', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.employees().del(id))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
}

module.exports = registerEmployeeRoutes