const toViewModel = require('./viewmodel')
const registerUserRoute = (deps) => {

    const { server, db } = deps

    server.get('/pet', async (req, res, next) => {
        try {
            const data = await db.pets().all()
            res.send(toViewModel(data))
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }

    })

    server.get('/pet/:id', async (req, res, next) => {
        try {
            const { id } = req.params

            const data = await db.pets().one(id)
            res.send(toViewModel(data))
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }

    })

    server.post('/pet', async (req, res, next) => {
        const {name, breed, customer_id} = req.params
        try {
            res.send(await db.pets().save(name, breed, customer_id))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })

    server.put('/pet', async (req, res, next) => {
        const { id, name, breed, customer_id} = req.params
        try {
            res.send(await db.pets().update(id, name, breed, customer_id))
        }
        catch (err) {
            res.send(err)
        }
        next()

    })

    server.del('/pet', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.pets().del(id))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
}

module.exports = registerUserRoute
