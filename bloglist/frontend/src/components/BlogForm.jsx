import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setTitle] = useState('')
  const [newAuthor, setAuthor] = useState('')
  const [newURL, setURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog( {
      author: newAuthor,
      title: newTitle,
      url: newURL
    })

    setTitle('')
    setAuthor('')
    setURL('')
  }


  return(
    <form onSubmit={(event) => addBlog(event, newTitle, newAuthor, newURL)}>
      Title: 
      <input
        value={newTitle}
        type="text"
        onChange={(event) => setTitle(event.target.value)}
        name="Title"
        placeholder='new blog title'
        data-testid='new-title'
      />

      <br/>
      Author: 
      <input
        value={newAuthor}
        type="text"
        onChange={(event) => setAuthor(event.target.value)}
        name="Author"
        placeholder='new blog author'
        data-testid='new-author'
      />
      <br/>

      URL: 
      <input
        value={newURL}
        type="text"
        onChange={(event) => setURL(event.target.value)}
        name="URL"
        placeholder='new blog url'
        data-testid='new-url'
      />
      <br/>
      
      <button type="submit">create</button>

    </form>
)}

export default BlogForm