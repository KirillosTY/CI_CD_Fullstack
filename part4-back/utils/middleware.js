const { MongooseError } = require('mongoose');
const logger = require('./logger')
const morgan = require('morgan')
require('express-async-errors')
const users = require('../models/userSchema.js')
const jwt = require('jsonwebtoken')



morgan.token('json', (req) => JSON.stringify(req.body));

const morganFormat = morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
  tokens.json(req, res),
].join(' '));


const errorHandler= (error, request, response,next) => {

    if(error.name === 'CastError'){
        return response.status(400).send({error:'False mail id'})
    } else if(error.name === 'ValidationError'){
        return response.status(400).json({ error: error.message })
    } else if(error.name === "MongoServerError" && error.message.includes('E11000 duplicate key error')){
        return response.status(500).send({error:'Username already in use'})
    } else if (error.name ===  'JsonWebTokenError') {
        return response.status(400).json({ error: 'token missing or invalid' })
    } else if (error.name ===  'TokenExpiredError') {
        return response.status(400).json({ error: 'Token has expired, please login again' })
    } 
    
    next(error) 


}

const tokenGetter = async (request, response, next) => {
    const auth = await request.get('authorization')
    if(auth && auth.startsWith('Bearer ')){
        request.token =  auth.replace('Bearer ','')

    }
    next()
    
   
}

const tokenUser = async(request, response, next) => {
    console.log('request.token', request.token)
    const userToken = jwt.verify(request.token, process.env.SECRET)
    const user = await users.findById(userToken.id)
    if(user){
        request.user = user
    } else {
        response.status(401).send({error: "Unauthorized access"})
    }
    next()
}

module.exports = {
    morganFormat,
    errorHandler,
    tokenGetter,
    tokenUser
}