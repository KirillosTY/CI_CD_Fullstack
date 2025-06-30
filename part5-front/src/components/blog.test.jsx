/* eslint-disable quotes */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'
import CreateBlog from './CreateBlog'
import { exact } from 'prop-types'

test('only Blog title shown',() =>  {

  const blog = {
    title:'Pekko',
    url:"strayy",
    author:'muumi',
    user : {
      username:"test"
    }
  }

  render(<Blog blog={blog} user={"test"}></Blog>)


  screen.getByText('Pekko')


})

test('after View clicked all Blog information is shown', async () =>  {

  const blog = {
    title:'Pekko',
    url:"strayy",
    author:'muumi',
    likes: 2,
    user : {
      username:"testUser"
    }
  }


  render(<Blog blog={blog} user={"testUser"} ></Blog>)


  const titleFirst = screen.getByText('Pekko')


  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  const title = screen.getByText('Pekko',{ exact:false })
  screen.getByText('strayy',{ exact:false })
  screen.getByText('muumi',{ exact:false })
  screen.getByText('likes: 2',{ exact:false })
})

test('after View clicked all Blog is upvoted twice', async () =>  {

  const blog = {
    title:'Pekko',
    url:"strayy",
    author:'muumi',
    likes: 2,
    user : {
      username:"testUser"
    }
  }

  const mockClicker = vi.fn()

  render(<Blog blog={blog} user={"testUser"} updateUpvote={mockClicker}></Blog>)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const voteButton = screen.getByText('vote')
  await user.click(voteButton)
  await user.click(voteButton)

  expect(mockClicker.mock.calls).toHaveLength(2)



})

test('after View clicked all Blog is upvoted twice', async () =>  {


  const mockClicker = vi.fn()
  const user = userEvent.setup()

  const { container } = render(<CreateBlog handleCreation={mockClicker}></CreateBlog>)

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const save = screen.getByText('Create')

  await user.type(title, 'peikko')
  await user.type(author, 'Tester')
  await user.type(url, 'test.com')
  await user.click(save)



  console.log(mockClicker.mock.calls[0][0].blog, 'thiiiii')
  expect(mockClicker.mock.calls).toHaveLength(1)
  expect(mockClicker.mock.calls[0][0].blog.title).toBe('peikko')
  expect(mockClicker.mock.calls[0][0].blog.author).toBe('Tester')
  expect(mockClicker.mock.calls[0][0].blog.url).toBe('test.com')




})


