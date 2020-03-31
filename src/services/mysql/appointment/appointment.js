const moment = require('moment')
const appointments = deps => {

    return {
        all: () => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('SELECT * FROM tb_appointment WHERE active', (error, result) => {
                    if (error) {
                        errorHandler(error, 'Falha ao listar os compromissos', reject)
                        return false
                    }

                    resolve({ appointments: result })
                })
            })
        },
        save: (customerID, taskemployeeID, dateTime) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                dateTime = moment(dateTime)

                connection.query('INSERT INTO tb_appointment (customer_id, task_employee_id, date_time) VALUES (?, ?, ?)', [customerID, taskemployeeID, dateTime.toJSON().slice(0, 19).replace('T', ' ')], (error, result) => {
                    if (error) {
                        errorHandler(error, `Falha ao salvar o compromisso cliente: ${customerID}`, reject)
                        return false
                    }

                    resolve({ appointment: { customerID: customerID, id: result.insertId } })
                })
            })
        },
        update: (id, customerID, taskemployeeID, dateTime) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps
                dateTime = moment(dateTime)

                connection.query('UPDATE tb_appointment set active = 0 WHERE id = ?', [id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao atualizar o compromisso`, reject)
                        return false
                    }
                })

                connection.query('INSERT INTO tb_appointment (customer_id, task_employee_id, date_time) VALUES (?, ?, ?)', [customerID, taskemployeeID, dateTime.toJSON().slice(0, 19).replace('T', ' ')], (error, result) => {
                    if (error) {
                        errorHandler(error, `Falha ao atualizar o compromisso cliente: ${customerID}`, reject)
                        return false
                    }

                    resolve({ appointment: { customerID: customerID, id: result.insertId } })
                })
            })
        },
        del: (id) => {
            return new Promise((resolve, reject) => {
                const { connection, errorHandler } = deps

                connection.query('UPDATE tb_appointment set active = 0 WHERE id = ?', [id], (error) => {
                    if (error) {
                        errorHandler(error, `Falha ao excluir o compromisso`, reject)
                        return false
                    }

                    resolve({ message: 'Compromisso removido com sucesso' })
                })
            })
         },
    }
}

module.exports = appointments