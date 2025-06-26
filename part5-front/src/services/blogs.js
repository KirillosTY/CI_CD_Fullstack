import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null



const setToken = newToken => {
  token = `Bearer ${newToken}`

}

const getAll = () => {
  const config = {
    headers: { authorization: token }
  }

  const request = axios.get(baseUrl,config)
  return request.then(response => response.data)
}


const createBlog = (blog) => {
  const config = {
    headers: { authorization: token }
  }
  const request = axios.post(baseUrl,blog,config)
  return request.then((response) => response.data)
}

const updateBlog = (blog) => {
  const config = {
    headers: { authorization: token }
  }

  const request = axios.put(baseUrl+`/${blog.id}`,blog,config)
  return request.then((response) => response.data)

}


const removeBlog = (blog) => {
  const config = {
    headers: { authorization: token }
  }

  const request = axios.delete(baseUrl+`/${blog.id}`,config)
  return request.then((response) => response.data)
}

export default { getAll, create: createBlog, setToken,put: updateBlog, removeBlog }