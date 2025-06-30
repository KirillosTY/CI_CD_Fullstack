
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const blogList = [
    {
    "_id": "66168b05592526fdbe968b19",
    "title": "test",
    "author": "tester",
    "url": "teest.fi",
    "likes": 1,
    "__v": 0
  },
  {
    "_id": "66168b0b592526fdbe968b1b",
    "title": "test2",
    "author": "tester",
    "url": "teest.fi",
    "likes": 3,
    "__v": 0
  },
  {
    "_id": "66168b0d592526fdbe968b1d",
    "title": "test2",
    "author": "teste4r",
    "url": "teest.fi",
    "likes": 87,
    "__v": 0
  }]

  test('likes returns sum of all likes', () => {
  
    const result = listHelper.likes(blogList)
    assert.strictEqual(result, 91)

  })

})

describe('best liked blog', () => {
  const blogList = [
    {
    "_id": "66168b05592526fdbe968b19",
    "title": "test",
    "author": "tester",
    "url": "teest.fi",
    "likes": 100,
    "__v": 0
  },
  {
    "_id": "66168b0b592526fdbe968b1b",
    "title": "test2",
    "author": "tester",
    "url": "teest.fi",
    "likes": 3,
    "__v": 0
  },
  {
    "_id": "66168b0d592526fdbe968b1d",
    "title": "test2",
    "author": "teste4r",
    "url": "teest.fi",
    "likes": 87,
    "__v": 0
  }]

  test('likes returns sum of all likes', () => {
  
    const result = listHelper.favouriteBlog(blogList)
    assert.strictEqual(result.likes, 100)
    assert.strictEqual(result.title, "test")
    assert.strictEqual(result._id, "66168b05592526fdbe968b19")


  })

})

describe('best blogger', () => {
  const blogList = [
    {
    "_id": "66168b05592526fdbe968b19",
    "title": "test",
    "author": "teste4r",
    "url": "teest.fi",
    "likes": 100,
    "__v": 0
  },
  {
    "_id": "66168b0b592526fdbe968b1b",
    "title": "test2",
    "author": "teste4r",
    "url": "teest.fi",
    "likes": 3,
    "__v": 0
  },
  {
    "_id": "66168b05592526fdbe968b19",
    "title": "test",
    "author": "teste4r",
    "url": "teest.fi",
    "likes": 100,
    "__v": 0
  },
  {
    "_id": "66168b0b592526fdbe968b1b",
    "title": "test2",
    "author": "tester",
    "url": "teest.fi",
    "likes": 3,
    "__v": 0
  },
  {
    "_id": "66168b0d592526fdbe968b1d",
    "title": "test2",
    "author": "teste4r",
    "url": "teest.fi",
    "likes": 87,
    "__v": 0
  },
  {
    "_id": "66168b0d592526fdbe968b1d",
    "title": "test2",
    "author": "",
    "url": "teest.fi",
    "likes": 87,
    "__v": 0
  }]
  

  test('returns most blogged author', () => {
  
    const result = listHelper.favouriteBlogger(blogList)
   
    const blogger = {
      'author':'teste4r',
      'blogged': 4
     }
     
    assert.strictEqual(blogger.author, result.author)
    assert.strictEqual(blogger.blogged, result.blogged)

    

  })

})

describe('best blogger', () => {
  const blogList = [
    {
    "_id": "66168b05592526fdbe968b19",
    "title": "test",
    "author": "tester",
    "url": "teest.fi",
    "likes": 100,
    "__v": 0
  },
  {
    "_id": "66168b0b592526fdbe968b1b",
    "title": "test2",
    "author": "tester",
    "url": "teest.fi",
    "likes": 3,
    "__v": 0
  },
  {
    "_id": "66168b05592526fdbe968b19",
    "title": "test",
    "author": "tester",
    "url": "teest.fi",
    "likes": 100,
    "__v": 0
  },
  {
    "_id": "66168b0b592526fdbe968b1b",
    "title": "test2",
    "author": "teste4r",
    "url": "teest.fi",
    "likes": 3,
    "__v": 0
  },
  {
    "_id": "66168b0d592526fdbe968b1d",
    "title": "test2",
    "author": "teste4r",
    "url": "teest.fi",
    "likes": 8733,
    "__v": 0
  },
  {
    "_id": "66168b0d592526fdbe968b1d",
    "title": "test2",
    "author": "eaer",
    "url": "teest.fi",
    "likes":32,
    "__v": 0
  }]
  

  test('returns most liked author', () => {
  
    const result = listHelper.favouriteBloggerByLikes(blogList)
   
    const blogger = {
      'author':'teste4r',
      'likes': 8736
     }
    assert.strictEqual(blogger.author, result.author)
    assert.strictEqual(blogger.likes, result.likes)
    

  })
})