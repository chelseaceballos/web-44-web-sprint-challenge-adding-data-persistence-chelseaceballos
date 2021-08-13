// build your `/api/projects` router here
const router = require('express').Router()

//  [GET] /api/projects
// Even though project_completed is stored as an integer, the API uses booleans when interacting with the client
// Example of response body: [{"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}]
router.get('/', async (req,res, next) => {
    res.json('gets projects')
})


// [POST] /api/projects
// Even though project_completed is stored as an integer, the API uses booleans when interacting with the client
// Example of response body: {"project_id":1,"project_name":"bar","project_description":null,"project_completed":false}
router.post('/', async (req,res, next) => {
    res.json('posts a projects')
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "Something went wrong in the projects router.",
        message: err.message,
        stack: err.stack,
    })
})

 module.exports = router