const sha1 = require('sha1')
const jwt = require('jsonwebtoken')

const auth = deps => {
    return {
        authenticate: (email, password) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps


                connection.query('SELECT id, email FROM tb_user WHERE active AND email = $1 AND password = $2', [email, sha1(password)], (error, result) => {
                    if (error || result.rowCount == 0) {
                        errorHandler(error, 'Falha ao localizar o usuario', reject)
                        return false
                    }

                    const {email, id} = result.rows[0]
                    const token = jwt.sign({email, id}, process.env.JWT_SECRET, {expiresIn: 60 * 60 * 24})
                    resolve({ token })
                })
            })
        },
    }
}

module.exports = auth