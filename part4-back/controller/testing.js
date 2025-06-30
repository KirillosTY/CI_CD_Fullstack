const router = require('express').Router()
const Blogs = require('../models/blogSchema.js')
const User = require('../models/userSchema.js/index.js')

router.post('/reset', async (request, response) => {
  await Blogs.deleteMany({})
  await User.deleteMany({})
  
  response.status(204).end()
})

module.exports = router