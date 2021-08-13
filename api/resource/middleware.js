const Resource = require('./model')


const validateName = (req, res, next) => {
    Resource.getByName(req.body.resource_name)
    .then(data => {
        if (data) {
            next({ status: 400, message: 'resource_name already exists'})
        } else {
        next()
        }
    })
    .catch(next)


}

module.exports = {
    validateName
}
