const taskemployee = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT * FROM tb_task_employee WHERE active', (error, result) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os servico funcionario', reject)
                        return false
                    }

                    resolve({ taskemployee: result })
                })
            })
        },
        save: (taskID, employeeID) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('INSERT INTO tb_task_employee (task_id, employee_id) VALUES (?, ?)', [taskID, employeeID], (error, result) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar o servico funcionario servico: ${taskID} funcionario: ${employeeID}`, reject)
                        return false
                    }

                    resolve({ taskemployee: { id: result.insertId } })
                })
            })
        },
        update: (id, taskID, employeeID) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_task_employee set active = 0 WHERE id = ?', [id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao excluir o servico funcionario`, reject)
                        return false
                    }
                })

                connection.query('INSERT INTO tb_task_employee (task_id, employee_id) VALUES (?, ?)', [taskID, employeeID], (error, result) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar o servico funcionario servico: ${taskID} funcionario: ${employeeID}`, reject)
                        return false
                    }

                    resolve({ taskemployee: { id: result.insertId } })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_task_employee set active = 0 WHERE id = ?', [id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao excluir o servico funcionario`, reject)
                        return false
                    }

                    resolve({ message: 'Servico funcionario removido com sucesso' })
                })
            })
        },
    }
}

module.exports = taskemployee