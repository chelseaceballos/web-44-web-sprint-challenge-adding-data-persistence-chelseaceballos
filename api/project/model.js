// build your `Project` model here
const db = require('../../data/dbConfig')

function getAll() {
    return db('projects')
}

module.exports = {
    getAll,
}