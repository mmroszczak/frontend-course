const express = require('express')
const mongoose = require('mongoose')
require('express-async-errors')
const app = express()
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
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
app.use("/api/blogs", blogsRouter)

module.exports = app
