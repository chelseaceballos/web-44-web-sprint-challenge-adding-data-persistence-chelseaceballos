// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')

const { validateName } = require('./middleware')

router.get('/',  (req, res, next) => {
    Resource.getAll()
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(next)
 });


router.post('/', validateName, async (req, res, next) => { 
Resource.create(req.body)
.then(newRes => {
    res.status(201).json(newRes)
})
.then(next)
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "Something went wrong in the resources router.",
        message: err.message,
        stack: err.stack,
    })
})
module.exports = router

// resources endpoints
//       [GET] /api/resources
//         ✕ [6] can get all resources in the table (8 ms)
//       [POST] /api/resources
//         ✕ [7] can add a new resource to the table (11 ms)
//         ✕ [8] responds with the newly created resource (6 ms)
//         ✕ [9] rejects a resource with an existing resource_name with an error status code (4 ms)