// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')
//  [GET] /api/projects
// Even though project_completed is stored as an integer, the API uses booleans when interacting with the client
// Example of response body: [{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]
router.get('/',  (req, res, next) => {
    Project.getAll()
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(next)
 });

// [POST] /api/projects
// Even though project_completed is stored as an integer, the API uses booleans when interacting with the client
// Example of response body: {"project_id":1,"project_name":"bar","project_description":null,"project_completed":false} // shows as 0 and 1
router.post('/', (req, res, next) => {
    Project.create(req.body)
    .then(data => {
        res.status(201).json(data)
    })
    .then(next)
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "Something went wrong in the projects router.",
        message: err.message,
        stack: err.stack,
    })
})

 module.exports = router