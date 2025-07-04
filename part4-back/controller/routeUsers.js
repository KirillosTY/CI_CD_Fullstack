const routeUser = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/userSchema.js')



routeUser.post('', async (request, response )=> {

    const {username, name, password} = request.body

    if(password === undefined){
        return response.status(500).json({error:'Password is too short'})
    } else if(password.length < 3){
        return response.status(500).json({error:'Password is too short'})
    }
    const saltrounds = 12;

    const passwordHash = await bcrypt.hash(password, saltrounds)

    const user = new User({
        username,
        name,
        passwordHash

    })

    response.status(201).send(await user.save())

})

 
routeUser.get('', async (request, response )=> {

    const users = await User.find({}).populate('blogs',{url:1, title:1,author:1})
    response.json(users)

})

routeUser.delete('/:id', async (request, response)=> {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
  
  })

module.exports = routeUser