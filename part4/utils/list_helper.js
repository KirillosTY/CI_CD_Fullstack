
const dummy = (blogs) => {

    return 1
}

const likes = (blogs) => {

 return  blogs.reduce((sum,blog)=> {
        return sum +Number(blog.likes)
    },0)
}


const favouriteBlog = (blogs)  => {
    let maximumLikes = 0;

    return blogs.reduce((maxBlog, blog) =>{
        if(blog.likes > maximumLikes){
            maximumLikes = blog.likes
            return blog
        } else {
            return maxBlog
        }
    },[])
}


const favouriteBlogger = (blogs)  => {
    let amountBlogged = 0;
    let blogged = blogs.reduce((bestBloggers, blog) =>{
       bestBloggers[blog.author] = bestBloggers[blog.author]+1 || 1
        return bestBloggers
    },[])
   let bloggggg=  Object.keys(blogged).reduce((blogger, secondBlogger) => blogged[blogger] > blogged[secondBlogger] ? blogger :secondBlogger)
   return {
    'author':bloggggg,
    'blogged': blogged[bloggggg]
   }
}

const favouriteBloggerByLikes = (blogs)  => {
    let amountBlogged = 0;
    let blogged = blogs.reduce((bestBloggers, blog) =>{
       bestBloggers[blog.author] =  bestBloggers[blog.author] || 0
       bestBloggers[blog.author] += blog.likes
        return bestBloggers
    },[])
   let bloggggg=  Object.keys(blogged).reduce((blogger, secondBlogger) => blogged[blogger] > blogged[secondBlogger] ? blogger :secondBlogger)
   return {
    'author':bloggggg,
    'likes': blogged[bloggggg]
   }
}

module.exports = {
dummy,
likes, 
favouriteBlog,
favouriteBlogger,
favouriteBloggerByLikes
}