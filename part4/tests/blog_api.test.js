
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const assert = require('node:assert')
const app = require('../app')
const { application } = require('express')
const Blog = require('../models/blogSchema')
const { STATUS_CODES } = require('node:http')
const User = require('../models/userSchema')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')



const api = supertest(app)
const token = ""

const startBlogList = [
    {
    title: 'FirstBlog',
    author: 'Jeesus',
    url: 'Heaven.com',
    likes: 30
    },
    {
        title: 'SecondBlog',
        author: 'God',
        url: 'Heaven.com',
        likes: 31
    }
]


after(async () => {
    await mongoose.connection.close()
})


beforeEach( async ()=> {
    await Blog.deleteMany()
    await new Blog(startBlogList[0]).save()
    await new Blog(startBlogList[1]).save()
    
})
/*
test('notes are returned as json', async ()=> {

    const dbBlogs = (await api.get('/api/blogs')).body
        

    assert.strictEqual(dbBlogs.length, startBlogList.length)
        
})

test('notes returned have field id not _id', async ()=> {

    const dbBlogs =  (await api.get('/api/blogs')).body
    
    assert.ok(dbBlogs[0].id)
        
})
*/
test('Adding one more note', async () => {

    const userLogin = {
        username : "testUserFirst",
        password: "testerrere1212"
    }
    console.log(await api.post('/api/login').send(userLogin).expect(201))

    const oneBlog = {
        title: 'thirdBlog',
        author: 'HolySpirit',
        url: 'AroundYou.com',
        likes: 1337
        }
    await api
    .post('/api/blogs')
    .setHeader('Authorization', token)
    .send(oneBlog)
    .expect(201)

    const newBlogList = await api.get('/api/blogs')
    assert.strictEqual(newBlogList.body.length, startBlogList.length+1)
    assert.strictEqual(newBlogList.body[2].author,'HolySpirit')

    
   
})
/*
test('If no like field is given, like should be 0', async () => {

    const oneBlog = {
        title: 'FourthBlog',
        author: 'HolySpirit',
        url: 'AroundYou.com',
        }
    await api
    .post('/api/blogs')
    .send(oneBlog)
    .expect(201)

    const newBlogList = (await api.get('/api/blogs')).body
    const blog = newBlogList.find((blog) => blog.title === 'FourthBlog')
    assert.strictEqual(blog.title,'FourthBlog')
    assert.strictEqual(blog.likes,0)

})

test('If no url field is given bad request should be returned', async () => {

    const oneBlog = {
        title: 'FourthBlog',
        author: 'HolySpirit',
        likes: 1100
        }
    await api
    .post('/api/blogs')
    .send(oneBlog)
    .expect(400)

    const newBlogList = (await api.get('/api/blogs')).body
    const blog = newBlogList.find((blog) => blog.title === 'FourthBlog')
    assert.strictEqual(blog, undefined)
    assert.strictEqual(newBlogList.length,startBlogList.length)


})

test('If no title field is given bad request should be returned', async () => {

    const oneBlog = {
        author: 'HolySpirit',
        url: 'heavensGate',
        likes: 1100
        }
    await api
    .post('/api/blogs')
    .send(oneBlog)
    .expect(400)

    const newBlogList = (await api.get('/api/blogs')).body
    const blog = newBlogList.find((blog) => blog.url === 'heavensGate')
    assert.strictEqual(blog, undefined)
    assert.strictEqual(newBlogList.length,startBlogList.length)

})


test('deleted by id should return 204 status', async () => {


    let newBlogList = (await api.get('/api/blogs')).body
    const idToDelete = newBlogList[0].id

    await api.delete(`/api/blogs/${idToDelete}`)
            .expect(204)


    newBlogList = (await api.get('/api/blogs')).body
    const blog = newBlogList.find((blog) => blog.title === 'FirstBlog')
    assert.strictEqual(blog, undefined)
    assert.strictEqual(newBlogList.length,startBlogList.length-1)

})


test('update by id should return 204 status', async () => {



    let newBlogList = (await api.get('/api/blogs')).body
    const idToUpdate = newBlogList[0].id
    const blogToUpdate = newBlogList[0]
    blogToUpdate.likes=100000000

    const blog = await api.put(`/api/blogs/${idToUpdate}`).send(blogToUpdate)
            .expect(200)

    assert.strictEqual(blog.body.id, blogToUpdate.id)
    assert.strictEqual(blog.body.likes, 100000000)
    assert.strictEqual(blog.body.title, blogToUpdate.title)


})

*/

