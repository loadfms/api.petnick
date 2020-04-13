const tasks = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT * FROM tb_task WHERE active', (error, result) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os servicos', reject)
                        return false
                    }

                    resolve({ tasks: result })
                })
            })
        },
        one: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT * FROM tb_task WHERE active and id = $1', [id], (error, result) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os servicos', reject)
                        return false
                    }

                    resolve({ tasks: result })
                })
            })
        },
        save: (name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('INSERT INTO tb_task (name) VALUES ($1)', [name], (error, result) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar o servico ${name}`, reject)
                        return false
                    }

                    resolve({ task: { name: name, id: result.insertId } })
                })
            })
        },
        update: (id, name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_task set name = $1 WHERE id = $2', [name, id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao atualizar o servico ${name}`, reject)
                        return false
                    }

                    resolve({ task: { name: name } })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_task set active = false WHERE id = $1', [id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao excluir o servico`, reject)
                        return false
                    }

                    resolve({ message: 'Servico removida com sucesso' })
                })
            })
         },
    }
}

module.exports = tasks