// build your `Resource` model here
const db = require('../../data/dbConfig')

function getAll() {
    return db('resource')
}

module.exports = {
    getAll,
}