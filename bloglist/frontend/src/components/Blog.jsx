import { useState } from 'react'


const Blog = ({ blog, style, handleLike, handleDelete, loggedInUser }) =>
{

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenSameUser =  { display: (blog.user.name === loggedInUser.name) ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (

    <div style={style} className='blog'>
      {blog.title} {blog.author}
      <button style={hideWhenVisible} onClick={toggleVisibility}>view</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>hide</button>
      <br/>
      <div style={showWhenVisible} className='optionalContent'>
        {blog.url}<br/>
        likes {blog.likes}<br/>
        {blog.user.name}
      </div>
      <button onClick={() => handleLike(blog.id)}>like</button>
      <button style={showWhenSameUser} onClick={() => handleDelete(blog.id)}>delete</button>

    </div>  )
}

export default Blog