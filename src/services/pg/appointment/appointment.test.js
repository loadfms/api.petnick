/* eslint-disable */
const { connection, errorHandler } = require('../tests/setup')
const appointmentModule = require('./appointment')({ connection, errorHandler })
const customerModule = require('./../customer/customer')({ connection, errorHandler })
const taskEmployeeModule = require('./../taskemployee/taskemployee')({ connection, errorHandler })
const taskModule = require('./../task/task')({ connection, errorHandler })
const employeeModule = require('./../employee/employee')({ connection, errorHandler })

const create = () => appointmentModule.save(1, 1, new Date())
const createCustomer = () => customerModule.save('name-test', 'breed-test', 'owner-test', 'address-test', 'complement-test', 'phone-test', 'active-test')
const createTaskEmployee = () => taskEmployeeModule.save(1, 1)
const createTask = () => taskModule.save('service-test')
const createEmployee = () => employeeModule.save('employee-test')

beforeEach(() => {
    connection.query('TRUNCATE tb_task')
    connection.query('TRUNCATE tb_employee')
    connection.query('TRUNCATE tb_task_employee')
    connection.query('TRUNCATE tb_appointment')
});

test('Criacao de compromisso', async () => {
    await createTask()
    await createEmployee()
    await createTaskEmployee()
    await createCustomer()

    const result = await create()
    expect(result.appointment.customerID).toBe(1)
})

test('Atualizacao de compromisso', async () => {
    await createTask()
    await createEmployee()
    await createTaskEmployee()
    await createCustomer()
    await create()

    const result = await appointmentModule.update(1, 1, 1, new Date())
    expect(result.appointment.customerID).toBe(1)
})

test('Exclusao de compromisso', async () => {
    await createTask()
    await createEmployee()
    await createTaskEmployee()
    await createCustomer()

    const result = await appointmentModule.del(1)
    expect(result.message).toBe('Compromisso removido com sucesso')
})

test('Listagem de compromisso', async () => {
    await createTask()
    await createEmployee()
    await createTaskEmployee()
    await createCustomer()
    await create()
    await create()

    const result = await appointmentModule.all()
    expect(result.appointments.rowCount).toBe(2)
})

afterAll(async done => {
    connection.query('TRUNCATE tb_task')
    connection.query('TRUNCATE tb_employee')
    connection.query('TRUNCATE tb_task_employee')
    connection.query('TRUNCATE tb_appointment')
    connection.end()
    done()
})