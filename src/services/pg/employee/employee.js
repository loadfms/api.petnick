const employees = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT * FROM tb_employee WHERE active', (error, result) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os funcionarios', reject)
                        return false
                    }

                    resolve({ employees: result })
                })
            })
        },
        save: (name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('INSERT INTO tb_employee (name) VALUES ($1)', [name], (error, result) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar o funcionario ${name}`, reject)
                        return false
                    }

                    resolve({ employee: { name: name, id: result.insertId } })
                })
            })
        },
        update: (id, name) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_employee set name = $1 WHERE id = $2', [name, id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao atualizar o funcionario ${name}`, reject)
                        return false
                    }

                    resolve({ employee: { name: name } })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_employee set active = false WHERE id = $1', [id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao excluir o funcionario`, reject)
                        return false
                    }

                    resolve({ message: 'Funcionario removido com sucesso' })
                })
            })
         },
    }
}

module.exports = employees