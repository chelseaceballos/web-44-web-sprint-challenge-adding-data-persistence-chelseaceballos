// build your server here and require it from index.js
const express =require('express')
const projectsRouter = require('./project/router')
const resourcesRouter = require('./resource/router')
const taskRouter = require('./task/router')

const server = express()

server.use(express.json())
 

// catch all
server.use('*', (req,res, next) => {
    res.json({message: "Page Not Found"})
})

server.use('/api/projects', projectsRouter)
server.use('/api/resources', resourcesRouter)
server.use('/api/tasks', taskRouter)

module.exports = server