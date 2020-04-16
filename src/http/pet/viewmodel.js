const toViewModel = (data) => {
    const result = {
        pets: []
    }

    data.pets.rows.forEach(element => {
        const item = {
            Id: element.id,
            Nome: element.name,
            Raca: element.breed,
            Dono: element.customer_id
        }
        result.pets.push(item)
    });

    return result
}

module.exports = toViewModel
