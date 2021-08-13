// build your `/api/resources` router here
const router = require('express').Router()

router.use('*', (req,res, next) => {
    res.json({api : 'in the router'})
})
// [POST] /api/resources

// Example of response body: {"resource_id":1,"resource_name":"foo","resource_description":null}
//  [GET] /api/resources

// Example of response body: [{"resource_id":1,"resource_name":"foo","resource_description":null}]
module.exports = router