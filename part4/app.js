const express = require('express')
const config = require('./utils/config')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware.js')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const router = require('./controller/router')
const routeUser = require('./controller/routeUsers')    
const routeLogin = require('./controller/login')



mongoose.set('strictQuery',false)

logger.info(`Connection url: ${config.MURL}`)
const mongoUrl = config.MURL
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())
app.use(middleware.tokenGetter)
app.use(middleware.morganFormat)
app.use(middleware.errorHandler)


app.use('/api/blogs',middleware.tokenUser, router)
app.use('/api/users',routeUser)
app.use('/api/login', routeLogin)
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'test ') {
  const testingRouter = require('./controller/testing')
  app.use('/api/testing', testingRouter)
}

const PORT = config.PORT

module.exports = app