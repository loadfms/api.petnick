const toViewModel = require('./viewmodel')
const registerTaskRoutes = (deps) => {

    const { server, db } = deps

    server.get('/task', async (req, res, next) => {
        try {
            const data = await db.tasks().all()
            res.send(toViewModel(data))
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }

    })

    server.post('/task', async (req, res, next) => {
        const { name } = req.params
        try {
            res.send(await db.tasks().save(name))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })

    server.put('/task', async (req, res, next) => {
        const { name, id } = req.params
        try {
            res.send(await db.tasks().update(id, name))
        }
        catch (err) {
            res.send(err)
        }
        next()

    })

    server.del('/task', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.tasks().del(id))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
}

module.exports = registerTaskRoutes