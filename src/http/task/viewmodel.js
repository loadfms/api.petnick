const toViewModel = (data) => {
    const result = {
        tasks: []
    }
    data.tasks.forEach(element => {
        const item = {
            Id: element.id,
            Nome: element.name
        }
        result.tasks.push(item)
    });

    return result
}

module.exports = toViewModel