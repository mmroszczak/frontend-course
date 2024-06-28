const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')



const api = supertest(app)



beforeEach(async () => {
    await User.deleteMany({})
    const user = User({username: "admin", name: "admin", passwordHash: await bcrypt.hash('password', 10)})
    await user.save()
    const userForToken = {
      username: user.username,
      id: user._id
    }
    process.env['TOKEN'] = jwt.sign(userForToken, process.env.SECRET)

    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
        .map(blog => ({...blog, user: user._id}))
        .map(blog => new Blog(blog))

    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('blogs are returned as JSON', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/)
})

test('correct number of blogs id returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)

})

test('unique property is called id', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    assert('id' in blog)
})

test('post creates a blog', async () => {
    const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    }

    await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${process.env.TOKEN}`)
    .send(newBlog)
    .expect(201)

    const getResponse = await api.get('/api/blogs')

    assert.strictEqual(getResponse.body.length, helper.initialBlogs.length + 1)

})

test('likes default to 0', async() => {
    
    const newBlog = {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html"
    }

    const postResponse = await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${process.env.TOKEN}`)


    assert.strictEqual(postResponse.body.likes, 0)
})

test('cant create blog without title or url', async () => {
    const noTitle =
    {
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5
    }

    const noUrl = 
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        likes: 5
    }

    await api.post('/api/blogs')
    .send(noTitle)
    .set('Authorization', `Bearer ${process.env.TOKEN}`)
    .expect(400)

    await api.post('/api/blogs')
    .send(noUrl)
    .set('Authorization', `Bearer ${process.env.TOKEN}`)
    .expect(400)

})

test('delete a blog', async () => {
    const blogs = await helper.blogsInDb()
    const toDelete = blogs[0]

    await api
    .delete(`/api/blogs/${toDelete.id}`)
    .set('Authorization', `Bearer ${process.env.TOKEN}`)
    .expect(204)

    const blogsUpdated = await helper.blogsInDb()
    assert.strictEqual(blogsUpdated.length, blogs.length-1)
})

test('update a blog', async () => {

    const blogs = await helper.blogsInDb()
    const toUpdate = blogs[0]


    const newBlog = {
        author: "new",
        title: "old",
        likes: 785991,
        url: "url.co.uk"
    }

    const updatedBlog = await api
    .put(`/api/blogs/${toUpdate.id}`)
    .set('Authorization', `Bearer ${process.env.TOKEN}`)
    .send(newBlog)

    assert.strictEqual(updatedBlog.body.likes, 785991)
    

})

test('try adding a blog without auth token', async () => {
    const newBlog = {
        author: "new",
        title: "old",
        likes: 785991,
        url: "url.co.uk"
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})


after(async () => {
    await mongoose.connection.close()
})