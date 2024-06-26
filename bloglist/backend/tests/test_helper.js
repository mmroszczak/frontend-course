const Blog = require('../models/blog')

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

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}