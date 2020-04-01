const registerCustomerRoutes = (deps) => {

    const {server, db} = deps

    server.get('/customer', async (req, res, next) => {
        try {
            res.send(await db.customers().all())
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }
    
    })
    
    server.post('/customer', async (req, res, next) => {
        const { name, breed, owner, address, number, complement, phone } = req.params
        try {
            res.send(await db.customers().save(name, breed, owner, address, number, complement, phone))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
    
    server.put('/customer', async (req, res, next) => {
        const { id, name, breed, owner, address, number, complement, phone } = req.params
        try {
            res.send(await db.customers().update(id, name, breed, owner, address, number, complement, phone))
        }
        catch (err) {
            res.send(err)
        }
        next()
    
    })
    
    server.del('/customer', async (req, res, next) => {
        const { id } = req.params
        try {
            res.send(await db.customers().del(id))
        }
        catch (err) {
            res.send(err)
        }
        next()
    })
}

module.exports = registerCustomerRoutes