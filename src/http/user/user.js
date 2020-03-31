const registerUserRoute = (deps) => {

    const {server, db} = deps

    server.get('/user', async (req, res, next) => {
        try {
            res.send(await db.users().all())
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