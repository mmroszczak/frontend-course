const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')
const app = express()
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const cors = require('cors')
const logger = require('./utils/logger')


logger.info(`Connecting to ${config.MONGODB_URI}`)
mongoose.connect(config.MONGODB_URI)
.then( () => {
    logger.info("Connected to MongoDB")
})
.catch( () => {
    logger.error("error connecting to MongoDB", error.message)
})

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use("/api/blogs", blogsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
