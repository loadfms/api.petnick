const toViewModel = (data) => {
    const result = {
        employees: []
    }

    data.employees.rows.forEach(element => {
        const item = {
            Id: element.id,
            Nome: element.name
        }
        result.employees.push(item)
    });

    return result
}

module.exports = toViewModel