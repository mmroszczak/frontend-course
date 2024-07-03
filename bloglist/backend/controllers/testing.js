const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.post('/reset', async (request, response) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  response.status(204).end()
})

router.post('/make', async (request, response) => {

  user_id = "668567cf3481cca6caf74c5d"
  await new Blog({
      title: 'c',
      author: 'c',
      url: 'c',
      likes: 0,
      user: user_id
    })
    .save()

    await new Blog({
      title: 'a',
      author: 'a',
      url: 'a',
      likes: 10,
      user: user_id
    })
    .save()

    await new Blog({
      title: 'b',
      author: 'b',
      url: 'b',
      likes: 5,
      user: user_id
    })
    .save()

    response.status(200).end()
})

module.exports = router