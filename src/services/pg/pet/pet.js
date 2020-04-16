const sha1 = require('sha1')

const pets = deps => {
    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT id, name, breed, customer_id FROM tb_pet WHERE active', (error, result) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os pets', reject)
                        return false
                    }

                    resolve({ pets: result })
                })
            })
        },
        one: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT id, name, breed, customer_id FROM tb_pet WHERE active and id = $1', [id], (error, result) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os pets', reject)
                        return false
                    }

                    resolve({ pets: result })
                })
            })
        },
        save: (name, breed, customer_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('INSERT INTO tb_pet (name, breed, customer_id) VALUES ($1, $2, $3) RETURNING id', [name, breed, customer_id], (error, result) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar o pet ${email}`, reject)
                        return false
                    }

                    resolve({ pet: { name: name, id: result.rows[0].id } })
                })
            })
        },
        update: (id, name, breed, customer_id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_pet set name = $1, breed = $2, customer_id = $3 WHERE id = $4', [name, breed, customer_id, id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao atualizar o pet id:${id}`, reject)
                        return false
                    }

                    resolve({ pet: { id: id } })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_pet set active = false WHERE id = $1', [id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao excluir o pet`, reject)
                        return false
                    }

                    resolve({ message: 'Pet removido com sucesso' })
                })
            })
         },
    }
}

module.exports = pets
