const {test, after, beforeEach, describe} = require('node:test')
const assert = require('assert')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const { update } = require('lodash')

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

test/*.only*/('deleting a blog post', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

    const blogsAtEnd = await helper.blogsInDb();

    const titles = blogsAtEnd.map(b => b.title)
    assert(!titles.includes(blogToDelete.title))

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    
})

test/*.only*/('update existing blog entry', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const toBeChanged = blogsAtStart[0]

    const updatedData = {
        likes: toBeChanged.likes + 1
    }

    const response = await api
        .put(`/api/blogs/${toBeChanged.id}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(response.body.likes, updatedData.likes)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    //console.log('blogsatend: ', blogsAtEnd)
    
    const updatedInDb = blogsAtEnd.find(b => b.id === toBeChanged.id)
    //console.log(updatedInDb)
    
    assert.strictEqual(updatedInDb.likes, updatedData.likes)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('mystiko', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test.only('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'someone',
      name: 'Some One',
      password: 'outis',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test.only('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'namae',
      password: 'mystique',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

})

after(async () => {
    await mongoose.connection.close();
})