const {test, after, beforeEach} = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test/*.only*/('blogs returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test/*.only*/('blogs have id property and not _id', async () => {
    const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

    for (let item of response.body) {
        assert.ok('id' in item)
        assert.ok(!('_id' in item))
    }
})

test.only('a blog post can be added', async () => {
    const newBlog = {
        title: "No time to study",
        author: "Anxious Pen",
        url: "https://example.com/async-await",
        likes: 0,
    }
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsResult = await helper.blogsInDb()
    const titles = blogsResult.map(b => b.title)

    assert.strictEqual(blogsResult.length, helper.initialBlogs.length + 1)

    assert(titles.includes('No time to study'))
})
after(async () => {
    await mongoose.connection.close();
})