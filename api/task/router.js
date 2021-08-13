// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')
//  [GET] /api/tasks
// Even though task_completed is stored as an integer, the API uses booleans when interacting with the client
// Each task must include project_name and project_description
// Example of response body: [{"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_name:"bar","project_description":null}]

router.get('/',  (req, res, next) => {
   Task.getAll()
   .then(task => {
       res.status(200).json(task)
   })
   .catch(next)
});

// [POST] /api/tasks
// Even though task_completed is stored as an integer, the API uses booleans when interacting with the client
// Example of response body: {"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}
router.post('/', async (req, res, next) => {
    res.json('posts a task')
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "Something went wrong in the tasks router.",
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router