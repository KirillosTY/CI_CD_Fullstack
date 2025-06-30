const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/userSchema.js')


loginRouter.post('', async (request, response)=> {
    const {username, password} = request.body
    
    
    const foundUser = await User.findOne({username})
    const correctPassword = foundUser === null? false : await bcrypt.compare(password, foundUser.passwordHash)

    if(foundUser === null || !correctPassword ){
        return response.status(401).json({
            error: 'invalid username or password'
          })
    }

    const tokenUser = {
        username: foundUser.username,
        id: foundUser._id
    }

    const token = jwt.sign(
        tokenUser, 
        process.env.SECRET,
        {expiresIn: 60*60})

    
    response.status(201).send({token,username: foundUser.username, name:foundUser.name})

})

module.exports = loginRouter