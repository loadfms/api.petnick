const toViewModel = (data) => {
    const result = {
        taskemployee: []
    }

    data.taskemployee.rows.forEach(element => {
        const item = {
            taskId: element.task_id,
        }
        result.taskemployee.push(item)
    });

    return result
}

module.exports = toViewModel