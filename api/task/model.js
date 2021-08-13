// build your `Task` model here
const db = require('../../data/dbConfig')

function getAll() {
    return db('tasks')
}

function create(task) {
    return db('tasks').insert(task).then(task_id => {
        return db('tasks').where({ task_id }).first().then(
            thing => {
                return {
                    ...thing,
                    task_completed: thing.task_completed ? true === 0 : false
                }
            }
        )
    })
};

function getById(project_id) {
    return db('projects').where({ project_id }).first()
};

module.exports = {
    getAll,
    create,
    getById,
}