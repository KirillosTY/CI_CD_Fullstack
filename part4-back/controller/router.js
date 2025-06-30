const mailRouter = require('express').Router()
const Blog = require('../models/blogSchema.js')
const { response } = require('../app')
const users = require('../models/userSchema.js')
const jwt = require('jsonwebtoken')
const { update } = require('lodash')




mailRouter.get('', async (request, response) => {

  const user = request.user  

  response.json(await Blog.find({}).populate('user',{username:1, name:1}))
})

mailRouter.post('', async(request, response) => {
  const user = request.user
  if(!user){
    return response.status(401).json({ error: 'token invalid' })
  }
  const usersFoundFirst = await users.findById(user.id)
  const blog= request.body 
  blog.user = usersFoundFirst.id
  ''
 if(blog.title === undefined || blog.url === undefined){
    response.status(400).end()
  } else {

    if(blog.likes === undefined){
   
      blog.likes = 0
    }
    const newBlog = new Blog(blog)
    
  const savedBlog = await newBlog.save()


  usersFoundFirst.blogs = usersFoundFirst.blogs.concat(savedBlog.id)
  await usersFoundFirst.save()
  response.status(201).json(newBlog)
  }

})

mailRouter.delete('/:id', async (request, response)=> {
  const user = request.user

  const blogOwnerID = (await Blog.findById(request.params.id)).user.toString()

  
  if(blogOwnerID === user.id){
    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
  } else {
    response.status(401).send({error: "Permission denied"})
  }

})


mailRouter.put('/:id', async (request, response) => {
  const updatedBlog = request.body;

  const user = request.user

  const blogOwnerID = (await Blog.findById(request.params.id)).user.toString()

  console.log('blogOwnerID', blogOwnerID, updatedBlog)
  if(blogOwnerID !== user.id){
    response.status(401).send({error: "Permission denied"})
  } 
  updatedBlog.user= updatedBlog.user.id
  const updatedDBBlog = await Blog.findByIdAndUpdate(updatedBlog.id, updatedBlog, {new:true}).populate('user',{username:1,name:1,id:1 })
  
  response.json(updatedDBBlog)
})


module.exports = mailRouter