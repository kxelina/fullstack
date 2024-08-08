import { useState, useEffect } from 'react'
import './index.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogUrl, setNewBlogUrl] = useState('')

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
    
  const setMessage = (message, type) => {
    setErrorMessage({ message, type })
  }

  const Notification = ({ message, type }) => {
    if (!message) {
      return 
    }

    useEffect(() => {
      const timeout = setTimeout(() => {
        setErrorMessage('')
      }, 5000)

      return () => clearTimeout(timeout)
    }, [message])


    let className = ''
    if (type === 'error') {
      className = 'error'
    } else if (type === 'success') {
      className = 'success'
    }

    return (
      <div className={className}>
        {message}
      </div>
    )
  }

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
      setMessage('Login successful', 'success' )
    } catch (error) {
      setMessage(error.response.data.error, 'error' )
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setMessage('Logout successful', 'success' )
  }

  const addBlog = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogUrl
    }
    try {
      const savedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(savedBlog))
      setNewBlogTitle('')
      setNewBlogAuthor('')
      setNewBlogUrl('')
      setMessage(`a new blog "${savedBlog.title}" by "${savedBlog.author}" added`, 'success' )
    } catch (error) {
      setMessage(error.response.data.error,'error' )
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input type="text" value={username} name="Username"onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
        <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        title
        <input type="text" value={newBlogTitle} name="Title" onChange={({ target }) => setNewBlogTitle(target.value)}/>
      </div>
      <div>
        author
        <input type="text" value={newBlogAuthor} name="Author" onChange={({ target }) => setNewBlogAuthor(target.value)}/>
      </div>
      <div>
        url
        <input type="text" value={newBlogUrl} name="Url" onChange={({ target }) => setNewBlogUrl(target.value)}/>
      </div>
      <button type="submit">create</button>
    </form>  
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage?.message} type={errorMessage?.type} />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
          <h2>create new</h2>
          {blogForm()}
          {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
        </div>
      )}
    </div>
  )
}

export default App
