/* eslint-disable */
const { connection, errorHandler } = require('../tests/setup')
const taskEmployeeModule = require('./taskemployee')({ connection, errorHandler })
const taskModule = require('./../task/task')({ connection, errorHandler })
const employeeModule = require('./../employee/employee')({ connection, errorHandler })

const create = () => taskEmployeeModule.save(1,1)
const createTask = () => taskModule.save('service-test')
const createEmployee = () => employeeModule.save('employee-test')

beforeEach(() => {
    connection.query('TRUNCATE tb_task_employee')
});

test('Criacao de servico funcionario', async () => {
    await createTask()
    await createEmployee()
    const result = await create()
    
    expect(result.taskemployee.id).toBe(1)
})

test('Atualizacao de servico funcionario', async () => {
    await createTask()
    await createEmployee()
    await create()

    const result = await taskEmployeeModule.update(1, 1, 1)
    expect(result.taskemployee.id).toBeGreaterThan(1)
})

test('Exclusao de servico funcionario', async () => {
    await createTask()
    await createEmployee()
    await create()
    
    const result = await taskEmployeeModule.del(1)
    expect(result.message).toBe('Servico funcionario removido com sucesso')
})

test('Listagem de servico funcionario', async () => {
    await createTask()
    await createEmployee()
    await create()

    const result = await taskEmployeeModule.all()
    expect(result.taskemployee.length).toBe(1)
})

afterAll(async done => {
    connection.query('TRUNCATE tb_task_employee')
    connection.end()
    done()
})