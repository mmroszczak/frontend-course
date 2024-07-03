import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('pressing submit creates a handler function with correct props'), async() => {
    const addBlog = vi.fn()
    const user = userEvent.setup()
  
    render(<BlogForm addBlog={addBlog} />)

    const authorInput = screen.getByPlaceholderText('new blog author')
    const titleInput = screen.getByPlaceholderText('new blog title')
    const urlInput = screen.getByPlaceholderText('new blog url')
    const submitButton = screen.getByText('create')

    user.type(authorInput, 'author')
    user.type(titleInput, 'title')
    user.type(urlInput, 'url')

    await user.click(submitButton)

    console.log(addBlog.mock.calls)
    expect(addBlog.mock.calls[0][0].newTitle).toBe('title')
    expect(addBlog.mock.calls[0][0].newAuthor).toBe('author')
    expect(addBlog.mock.calls[0][0].newURL).toBe('url')

    expect(addBlog.mock.calls).toHaveLength(1)

    



}