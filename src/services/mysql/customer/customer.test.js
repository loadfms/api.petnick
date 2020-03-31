/* eslint-disable */
const { connection, errorHandler } = require('../tests/setup')
const customerModule = require('./customer')({ connection, errorHandler })

const create = () => customerModule.save('name-test', 'breed-test', 'owner-test', 'address-test', 'complement-test', 'phone-test', 'active-test')

beforeEach(() => {
    connection.query('TRUNCATE tb_customer')
});

test('Criacao de cliente', async () => {
    const result = await create()
    expect(result.customer.name).toBe('name-test')
})

test('Atualizacao de cliente', async () => {
    await create()
    const result = await customerModule.update(1, 'name-test-updated', 'breed-test', 'owner-test', 'address-test', 'complement-test', 'phone-test', 'active-test')
    expect(result.customer.name).toBe('name-test-updated')
})

test('Exclusao de cliente', async () => {
    await create()
    const result = await customerModule.del(1)
    expect(result.message).toBe('Cliente removido com sucesso')
})

test('Listagem de cliente', async () => {
    await create()
    await create()
    const result = await customerModule.all()
    
    expect(result.customers.length).toBe(2)
})

afterAll(async done => {
    connection.query('TRUNCATE tb_customer')
    connection.end()
    done()
})