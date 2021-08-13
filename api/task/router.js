// build your `/api/tasks` router here
const router = require('express').Router()
const Task = require('./model')


const hasDescription = async (req, res, next) => {
    try {
        const description = await (req.body.task_description)
        if (!description) {
            next({status: 400, message: "must include a task description"})
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

const idValidation = (req,res, next) => {
    
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
// {
//     "project_id": 1,
//     "task_completed": 0,
//     "task_description": "task desc 2",
//     "task_id": 2,
//     "task_notes": "task notes"
// },

router.get('/',  (req, res, next) => {
   Task.getAll()
   .then(task => {
       res.status(200).json(task)
   })
   .catch(next)
});

// [POST] /api/tasks
// Even though task_completed is stored as an integer, the API uses booleans when interacting with the client :(
// Example of response body: {"task_id":1,"task_description":"baz","task_notes":null,"task_completed":false,"project_id:1}
router.post('/', idValidation, hasDescription, async (req, res, next) => {
    Task.create(req.body)
        .then(data => {
            res.status(201).json(data)
        })
        .then(next)
})


router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "Something went wrong in the tasks router.",
        message: err.message,
        stack: err.stack,
    })
})

module.exports = router

