// build your `Task` model here
const db = require('../../data/dbConfig')

function getAll() {
    return db('tasks')
}

module.exports = {
    getAll,
}