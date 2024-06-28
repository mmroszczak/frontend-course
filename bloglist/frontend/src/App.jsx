import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newURL, setURL] = useState('')


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

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setURL(event.target.value)
  }

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

  const handleLogOut = async(event) => {
    event.preventDefault()

      setNotificationMessage(`${user.name} logged out`)
      setNotificationType('notification')

      window.localStorage.removeItem('loggedInUser') 
      blogService.setToken(null)
      setUser(null)
    } 

    const addBlog = (event) => {
      event.preventDefault()
      const blogObject = {
        author: newAuthor,
        title: newTitle,
        url: newURL
      }
      blogService
      .create(blogObject)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        setNotificationMessage(`Blog ${newTitle} created`)
        setNotificationType('notification')
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
        setTitle('')
        setAuthor('')
        setURL('')
      })
      .catch(exception => {
        setNotificationMessage(`Error creating blog`)
        setNotificationType('error')
        console.log(exception)
        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      })
  
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
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
      <BlogForm
      addBlog={addBlog}
      newTitle={newTitle}
      handleTitleChange={handleTitleChange}
      newAuthor={newAuthor}
      handleAuthorChange={handleAuthorChange}
      newURL={newURL}
      handleURLChange={handleURLChange}
      />
    </div>
  )
}
export default App