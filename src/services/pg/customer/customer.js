const customers = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT * FROM tb_customer WHERE active', (error, result) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os clientes', reject)
                        return false
                    }

                    resolve({ customers: result })
                })
            })
        },
        save: (name, breed, owner, address, number, complement, phone) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('INSERT INTO tb_customer (name, address, number, complement, phone) VALUES ($1, $2, $3, $4, $5)', [name, address, number, complement, phone], (error, result) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar o cliente ${name}`, reject)
                        return false
                    }

                    resolve({ customer: { name: name, id: result.insertId } })
                })
            })
        },
        update: (id, name, breed, owner, address, number, complement, phone) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_customer set name = $1, address = $2, complement = $3, phone = $4 WHERE id = $5', [name, address, number, complement, phone, id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao atualizar o cliente ${name}`, reject)
                        return false
                    }

                    resolve({ customer: { name: name } })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_customer set active = false WHERE id = $1', [id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao excluir o cliente`, reject)
                        return false
                    }

                    resolve({ message: 'Cliente removido com sucesso' })
                })
            })
         },
    }
}

module.exports = customers
