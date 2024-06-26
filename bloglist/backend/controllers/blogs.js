blogsRouter = require('express').Router()
Blog = require('../models/blog')



blogsRouter.get('/', async (request, response) => {
    
  const blogs = await Blog.find({})
  response.json(blogs)
})
  
  
blogsRouter.post('/', async (request, response) => {

  let body = request.body

  if (!('title' in body)||!('url' in body)) {
    response.status(400).send()
  } else {  
    
    if(!('likes' in body)) {
      body.likes = 0
    }

    const blog = new Blog(body)

    const result = await blog.save()
    response.status(201).json(result)
  }

})

  module.exports = blogsRouter