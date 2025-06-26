require('dotenv').config()



const MURL= process.env.NODE_ENV === 'test '? process.env.MONGODB_URL_TESTS : process.env.MONGODB_URL
const PORT= process.env.PORT


module.exports =  {
    MURL,
    PORT
}