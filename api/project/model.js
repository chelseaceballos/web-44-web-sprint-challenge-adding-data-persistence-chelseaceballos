// build your `Project` model here
const db = require('../../data/dbConfig')

function getAll(){
    return db('projects').then(projects => {
        return projects.map(proj => {
           return{
               ...proj,
               project_completed: proj.project_completed ? 0 == true:  false
           }
        })
    })
}

function create(data) {
    console.log(data);
    return db('projects').insert(data)
        .then(project_id => {
            return db('projects').where({project_id}).first()
        .then(
            contents => {
                return {
                    ...contents,
                    project_completed: contents.project_completed ? 0 === true : false
                }
            }
        )
    })
}

module.exports = {
    getAll,
    create
}