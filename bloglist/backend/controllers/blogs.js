const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')



blogsRouter.get('/', async (request, response) => {
    
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})
  
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

  let body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  creator = request.user
  body.user = creator.id

  if (!('title' in body)||!('url' in body)) {
    response.status(400).send()
  } else {  
    
    if(!('likes' in body)) {
      body.likes = 0
    }

    const blog = new Blog(body)

    const result = await blog.save()
    creator.blogs = creator.blogs.concat(result._id)
    await creator.save()


    response.status(201).json(result)
  }
})

blogsRouter.delete('/:id',middleware.userExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() !== request.user._id.toString()) { response.status(401).json({error: "not authorised to delete"})}


  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).send()

})

blogsRouter.delete('/', async (request, response) => {
  await Blog.deleteMany({})
  response.status(204).send()
})

blogsRouter.put('/:id',middleware.userExtractor, async (request, response) => {
  
  const blog = await Blog.findById(request.params.id)
  
  const body = request.body


  const newBlog = {
    author: body.author, 
    url: body.url,
    title: body.title, 
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, { new: true }).populate('user', { username: 1, name: 1})


  response.json(updatedBlog)

})



  module.exports = blogsRouter