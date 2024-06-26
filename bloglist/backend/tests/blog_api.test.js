const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const Blog = require ('../models/blog')
const helper = require('./test_helper')


const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs
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

    await api.post('/api/blogs').send(newBlog)
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

    const postResponse = await api.post('/api/blogs').send(newBlog)

    assert.strictEqual(postResponse.body.likes, 0)
})

test('cant crreate blog without title or url', async () => {
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
    .expect(400)

    await api.post('/api/blogs')
    .send(noUrl)
    .expect(400)

})

after(async () => {
    await mongoose.connection.close()
})