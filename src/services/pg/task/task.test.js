/* eslint-disable */
const { connection, errorHandler } = require('../tests/setup')
const taskModule = require('./task')({ connection, errorHandler })

const create = () => taskModule.save('service-test')

beforeEach(() => {
    connection.query('truncate tb_task restart identity')
});

test('Criacao de servico', async () => {
    const result = await create()
    expect(result.task.name).toBe('service-test')
})

test('Atualizacao de servico', async () => {
    await create()
    const result = await taskModule.update(1, 'service-test-updated')
    expect(result.task.name).toBe('service-test-updated')
})

test('Exclusao de servico', async () => {
    await create()
    const result = await taskModule.del(1)
    expect(result.message).toBe('Servico removida com sucesso')
})

test('Listagem de servico', async () => {
    await create()
    await create()
    const result = await taskModule.all()
    expect(result.tasks.rowCount).toBe(2)
})

afterAll(async done => {
    connection.query('truncate tb_task restart identity')
    connection.end()
    done()
})