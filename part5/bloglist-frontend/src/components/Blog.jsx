import { useState } from 'react'
import blogStyles from '.././styles/blogs.css?inline'

const Blog = ({ blog, updateUpvote, removeBlog, user }) => {

  const [show,setShow] = useState(false)

  const displayAll = { display: show? '':'none' }
  const displayTitle = { display: show? 'none':'' }

  const toggleShow = () => {

    setShow(!show)
  }

  const upvoted = (event) => {
    event.preventDefault()

    const blogCreated = {
      'title':blog.title,
      'author':blog.author,
      'likes': blog.likes+1,
      'url': blog.url,
      'id':blog.id,
      'user':blog.user.id
    }
    updateUpvote(blogCreated)

  }

  const blogToRemove = (event) => {
    event.preventDefault()

    removeBlog(blog)
  }
  const showButtonToOwner = { display: blog.user.username === user.username? '': 'none' }



  if(show){
    return <li className='blogs' style={displayAll} data-testid={'blog'+blog.title+blog.author}>
      <p>Title:{blog.title} <button onClick={() => toggleShow()}>hide</button></p>
      <p>likes: {blog.likes} <button onClick={upvoted}>vote</button></p>
      <p>Author: {blog.author}</p>
      <p>Url: {blog.url}</p>
      <p><button  onClick={blogToRemove} style={showButtonToOwner}>remove</button></p>
    </li>
  }

  return (<li className='blogs' style={displayTitle} data-testid="blog" >
    {blog.title} <button onClick={() => toggleShow()}>view</button>
  </li>)
}

export default Blog