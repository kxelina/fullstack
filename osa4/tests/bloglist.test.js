const { test, after, beforeEach } = require('node:test')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
await Blog.deleteMany({})
await Blog.insertMany(helper.initialBlogs)
})

test.only('blogs are returned as json', async () => {
await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
  
test.only('there are two blogs', async () => {
const response = await api.get('/api/blogs')

assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test.only('all blogs should have id', async () => {
const response = await api.get('/api/blogs')
const blogs = response.body

blogs.forEach(blog => {
    assert.strictEqual(blog._id, undefined)
    assert.ok(blog.id)
    })
})

test.only('a valid blog can be added', async () => {
const newBlog = {
    title: 'moimoi',
    author: 'moikka',
    url: 'http://moimoi',
    likes: 1
}

await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

const response = await api.get('/api/blogs')
assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

const titles = response.body.map(r => r.title)
assert(titles.includes('moimoi'))
})

test.only('if no given likes, then its 0', async () => {
const newBlog = helper.noLikes

const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

assert.strictEqual(response.body.likes, 0)
})

test.only('if no given title or url, then it give bad request 400', async () => {
const newBlog = helper.noTitle

await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

const newBlog2 = helper.noUrl

await api
    .post('/api/blogs')
    .send(newBlog2)
    .expect(400)
})

after(async () => {
  await mongoose.connection.close()
})