// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')


const idValidation = (req,res, next)=>{
    
    Task.getById(req.body.project_id)
    .then(existing => {
        if (!existing) {
            next({ status: 400, message: 'id not found'})
        } else {
            next()
        }
    })
    .catch(next)
};

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
router.post('/', idValidation, async (req, res, next) => {
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

// [GET] /api/tasks
// ✕ [10] can get all tasks in the table (17 ms)
// ✕ [11] each task contains task_notes and task_description and task_completed (as a boolean) (14 ms)
// ✕ [12] each task contains the project_name and the project_description (15 ms)
//       [POST] /api/tasks
// ✕ [13] can add a new task to the db (20 ms)
// ✕ [14] responds with the newly created task with the task_completed as a boolean (13 ms)
// ✕ [15] rejects a task lacking a task_description with an error status code (18 ms)
// ✕ [16] rejects a task lacking a project_id with an error status code (15 ms)
// ✕ [17] rejects a task containing an invalid project_id with an error status code (15 ms)