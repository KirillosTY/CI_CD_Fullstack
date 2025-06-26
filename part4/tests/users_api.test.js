
const bcrypt = require('bcrypt')
const User = require('../models/userSchema')
const { test, after, beforeEach,describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')

const api = supertest(app)


describe('Starting with no users in database', () => {

    beforeEach(async () => {
        await User.deleteMany({})
    })

    test('creating first user', async ()=> {
        

        const usersAtStart = (await api.get('/api/users')).body

        const user = {
            username: 'test',
            name: 'model tester 1337',
            password:'IWishThisWasHashed'

        }

        const postedUser = await api
                                .post('/api/users')
                                .send(user)
                                .expect(201)
                                .expect('Content-Type', /application\/json/)

        const usersAtEnd = (await api.get('/api/users')).body

        assert.strictEqual(usersAtEnd.length, usersAtStart.length+1)
        assert.strictEqual(postedUser.body.username, 'test')
        assert.strictEqual(postedUser.body.name, 'model tester 1337')
        assert.strictEqual(postedUser.body.password, undefined)
    })


    test('creating first user with too short name', async ()=> {

        const usersAtStart = (await api.get('/api/users')).body

        const user = {
            username: 'te',
            name: 'model tester 1337',
            password:'IWishThisWasHashed'

        }

        const postedUser = await api
                                .post('/api/users')
                                .send(user)
                                .expect(500)
                                

        const usersAtEnd = (await api.get('/api/users')).body

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        
        assert.ok(postedUser.error.text.match(/ValidationError/))
        assert.ok(postedUser.error.text.match(/username/))
        assert.ok(postedUser.error.text.match(/is shorter than the minimum allowed length/))

    })

    test('creating first user with too short password', async ()=> {

        const usersAtStart = (await api.get('/api/users')).body

        const user = {
            username: 'tester',
            name: 'model tester 1337',
            password:'ha'

        }

        const postedUser = await api
                                .post('/api/users')
                                .send(user)
                                .expect(500)
                                

        const usersAtEnd = (await api.get('/api/users')).body

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
        assert.strictEqual(postedUser.error.text,'{"error":"Password is too short"}')
    })
    after(async () => {
        await mongoose.connection.close()
    })
    
})