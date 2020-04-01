const registerAuthRoutes = (deps) => {
    const {server, db} = deps

    server.post('/auth', async (req, res, next) => {
        try {
            const { email, password } = req.params

            res.send(await db.auth().authenticate(email, password))
            next()
        }
        catch (err) {
            res.send(403, err)
            next()
        }

    })
}

module.exports = registerAuthRoutes