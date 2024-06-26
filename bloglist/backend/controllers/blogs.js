const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



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

blogsRouter.delete('/:id', async (request, response) => {

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).send()

})

blogsRouter.put('/:id', async (request, response) => {
  
  
  const body = request.body


  const blog = {
    author: body.author, 
    url: body.url,
    title: body.title, 
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })


  response.json(updatedBlog)

})



  module.exports = blogsRouter