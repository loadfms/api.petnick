/* eslint-disable */
const { connection, errorHandler } = require('../tests/setup')
const employeeModule = require('./employee')({ connection, errorHandler })

const create = () => employeeModule.save('service-test')

beforeEach(() => {
    connection.query('TRUNCATE tb_employee')
});

test('Criacao de funcionario', async () => {
    const result = await create()
    expect(result.employee.name).toBe('service-test')
})

test('Atualizacao de funcionario', async () => {
    await create()
    const result = await employeeModule.update(1, 'service-test-updated')
    expect(result.employee.name).toBe('service-test-updated')
})

test('Exclusao de funcionario', async () => {
    await create()
    const result = await employeeModule.del(1)
    expect(result.message).toBe('Funcionario removido com sucesso')
})

test('Listagem de funcionario', async () => {
    await create()
    await create()
    const result = await employeeModule.all()
    expect(result.employees.rowCount).toBe(2)
})

afterAll(async done => {
    connection.query('TRUNCATE tb_employee')
    connection.end()
    done()
})