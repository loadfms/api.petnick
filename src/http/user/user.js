const toViewModel = require('./viewmodel')
const registerUserRoute = (deps) => {

    const { server, db } = deps

    server.get('/user', async (req, res, next) => {
        try {
            const data = await db.users().all()
            res.send(toViewModel(data))
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }

    })

    server.get('/user/:id', async (req, res, next) => {
        try {
            const { id } = req.params

            const data = await db.users().one(id)
            res.send(toViewModel(data))
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }

    })

    server.post('/user', async (req, res, next) => {
        const { email, password } = req.params
        try {
            res.send(await db.users().save(email, password))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })

    server.put('/user', async (req, res, next) => {
        const { id, password } = req.params
        try {
            res.send(await db.users().update(id, password))
        }
        catch (err) {
            res.send(err)
        }
        next()

    })

    server.del('/user', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.users().del(id))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
}

module.exports = registerUserRoute