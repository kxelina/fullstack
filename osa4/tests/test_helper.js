const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: "first",
        author: "blogger",
        url: "http://first",
        likes: 1
    },
    {
        title: "second",
        author: "blogger",
        url: "http://second",
        likes: 2
    },
  ]

const noLikes = { title: 'no',
        author: "no",
        url: "no" }

const noTitle = { author: "no", url: "no" }

const noUrl = { title: "no", author: "no"}

const updatedBlog = {
    title: 'update',
    author: 'update',
    url: 'update',
    likes: 100
  }

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
module.exports = {
initialBlogs, noLikes, noTitle, noUrl, blogsInDb, updatedBlog
}