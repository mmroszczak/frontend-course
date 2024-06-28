const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



const initialBlogs = [
    {
        title: "Blog A",
        author: "Tom",
        url: "www.a.com",
        likes: 6
      },
      {
        title: "Blog B",
        author: "Tom",
        url: "www.b.com",
        likes: 1
      },
      {
        title: "Blog C",
        author: "Mike",
        url: "www.c.com",
        likes: 176
      }

]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const makeUser = async () => {
  await User.deleteMany({})
    
  const user = User({username: "admin", name: "admin", passwordHash: await bcrypt.hash('password', 10)})
  await user.save()
  const userForToken = {
    username: user.username,
    id: user._id
  }

const TOKEN = jwt.sign(userForToken, process.env.SECRET)
return {token: TOKEN, id: user._id}
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, makeUser
}