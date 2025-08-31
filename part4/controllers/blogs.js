const blogsRouter = require('express').Router();
const Blog = require('../models/blog.js')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  await response.json(blogs);
})

blogsRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  await response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    
  const updated = await Blog.findByIdAndUpdate(request.params.id, request.body, {new: true})
  //console.log('updated is', updated)
  const result = await updated.save()
  //console.log('result is:', result)
  
  response.json(result)
})
module.exports =  blogsRouter