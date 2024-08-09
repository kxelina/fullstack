import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messagetype, setMessageType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage('login successful')
      setMessageType('success')
    } catch (error) {
      setMessage(error.response.data.error)
      setMessageType('error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('logout successful' )
    setMessageType('success')
  }

  const createBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setMessage(`a new blog "${savedBlog.title}" by "${savedBlog.author}" added`)
      setMessageType('success')
      setBlogFormVisible(false)
    } catch (error) {
      setMessage(error.response.data.error)
      setMessageType('error')
    }
  }

  const handleDelete = async (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id)

    const confirmDelete = window.confirm(`remove "${blogToDelete.title}" by "${blogToDelete.author}"?`)
    if (confirmDelete) {
      try {
        await blogService.deleteblog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        setMessage(`deleted "${blogToDelete.title}"`)
        setMessageType('success')
      } catch (error) {
        setMessage(error.response.data.error)
        setMessageType('error')
      }
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }

    try {
      const likedBlog = await blogService.update(blog.id, updatedBlog)
      likedBlog.user = blog.user
      setBlogs(blogs.map(b => b.id !== likedBlog.id ? b : likedBlog))
      setMessage(`you liked "${likedBlog.title}"`)
      setMessageType('success')
    } catch (error) {
      setMessage(error.response.data.error)
      setMessageType('error')
    }
  }

  const sortedbylikesblogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} type={messagetype} setMessage={setMessage} />
      {!user && (
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      )}
      {user && (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          {!blogFormVisible && (
            <button onClick={() => setBlogFormVisible(true)}>create new blog</button>
          )}
          {blogFormVisible && <BlogForm createBlog={createBlog} setBlogFormVisible={setBlogFormVisible} />}
          {sortedbylikesblogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleDelete={() => handleDelete(blog.id)}/>
          )}
        </div>
      )}
    </div>
  )
}

export default App
