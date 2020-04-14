const toViewModel = (data) => {
    const result = {
        users: []
    }

    data.users.rows.forEach(element => {
        const item = {
            Id: element.id,
            Email: element.email
        }
        result.users.push(item)
    });

    return result
}

module.exports = toViewModel