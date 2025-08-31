const {test, after, beforeEach} = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test/*.only*/('blogs returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('blogs have id property and not _id', async () => {
    const response = await api
                .get('/api/blogs')
                .expect(200)
                .expect('Content-Type', /application\/json/)

    for (let item of response.body) {
        assert.ok('id' in item)
        assert.ok(!('_id' in item))
    }
})
after(async () => {
    await mongoose.connection.close();
})