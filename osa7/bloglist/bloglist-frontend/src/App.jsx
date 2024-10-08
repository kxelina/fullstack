import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import './index.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogFormVisible, setBlogFormVisible] = useState(false)

  const dispatch = useDispatch()

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
      dispatch(setNotification('login successful', 'success'))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch(setNotification('logout successful', 'success', 5))
  }

  const createBlog = async (newBlog) => {
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success', 5))
      setBlogFormVisible(false)
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  const handleDelete = async (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id)

    const confirmDelete = window.confirm(`remove "${blogToDelete.title}" by "${blogToDelete.author}"?`)
    if (confirmDelete) {
      try {
        await blogService.deleteblog(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        dispatch(setNotification(`"${blogToDelete.title}" by "${blogToDelete.author}" deleted`, 'success', 5))
      } catch (error) {
        dispatch(setNotification(error.response.data.error, 'error', 5))
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
      dispatch(setNotification(`you liked "${likedBlog.title}" by "${likedBlog.author}"`, 'success', 5))
    } catch (error) {
      dispatch(setNotification(error.response.data.error, 'error', 5))
    }
  }

  const sortedbylikesblogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
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
