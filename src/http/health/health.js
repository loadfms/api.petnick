const registerHealthRoutes = (deps) => {

    const {server} = deps

    server.get('/health', async (req, res, next) => {
        try {
            
            res.send({status: 'ok'})
            next()
        }
        catch (err) {
            res.send(err)
            next()
        }
    
    })
}

module.exports = registerHealthRoutes