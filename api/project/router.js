// build your `/api/projects` router here
const router = require('express').Router()
const Project = require('./model')

const hasName = async(req, res, next) => {
try{
const name = await(req.body.project_name)    
if (!name) {
    next({status:400, message: "project must have a name"})
} else{
    next()
}
} catch (err) {
    next(err)
}
}

//  [GET] /api/projects
router.get('/',  (req, res, next) => {
    Project.getAll()
    .then(proj => {
        res.status(200).json(proj)
    })
    .catch(next)
 });

// [POST] /api/projects

router.post('/', hasName, (req, res, next) => {
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