// build your `/api/resources` router here
const router = require('express').Router()
const Resource = require('./model')
//  [GET] /api/resources
// Example of response body: [{"resource_id":1,"resource_name":"foo","resource_description":null}]
router.get('/',  (req, res, next) => {
    Resource.getAll()
    .then(resources => {
        res.status(200).json(resources)
    })
    .catch(next)
 });

// [POST] /api/resources
// Example of response body: {"resource_id":1,"resource_name":"foo","resource_description":null}
router.post('/', async (req, res, next) => {
    res.json(' posts a resource ')
})

router.use((err, req, res, next) => {
    res.status(500).json({
        customMessage: "Something went wrong in the resources router.",
        message: err.message,
        stack: err.stack,
    })
})
module.exports = router