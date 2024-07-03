import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async(event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setNotificationMessage(`${user.name} logged in`)
      setNotificationType('notification')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong Credentials')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLike = async(id) => {

    const blog = blogs.find(b => b.id === id )
    const changedBlog = { ...blog, likes: blog.likes+1 }

    try {

      const returnedBlog = await blogService.update(id, changedBlog)
      setNotificationMessage('Added like')
      setNotificationType('notification')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      console.log(returnedBlog)
    } catch (exception) {
      setNotificationMessage('Error adding like')
      setNotificationType('error')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }


  const handleLogOut = async(event) => {
    event.preventDefault()

    setNotificationMessage(`${user.name} logged out`)
    setNotificationType('notification')

    window.localStorage.removeItem('loggedInUser')
    blogService.setToken(null)
    setUser(null)
  }

  const handleDelete = async(id) => {

    try {
      await blogService.remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))

    } catch (exception) {
      setNotificationMessage('Error deleting blog')
      setNotificationType('error')
      console.log(exception)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)

    }
  }

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()

    blogService
      .create(blogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setNotificationMessage(`Blog created`)
        setNotificationType('notification')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
      .catch(exception => {
        setNotificationMessage('Error creating blog')
        setNotificationType('error')
        console.log(exception)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })

  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const compareLikes = (a, b) => {
    return b.likes - a.likes
  }



  if (user === null) {

    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notificationMessage} type={notificationType}/>
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}/>
      </div>
    )
  }

  return (

    <div>
      <h2>blogs</h2>
      <Notification message={notificationMessage} type={notificationType}/>
      <button onClick={handleLogOut}>Log Out</button>
      {blogs
        .sort(compareLikes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} style={blogStyle} loggedInUser={JSON.parse(window.localStorage.getItem('loggedInUser'))
          }/>
        )}
      <Togglable buttonLabel='New Blog' ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    </div>
  )
}
export default App