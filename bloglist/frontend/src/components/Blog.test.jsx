import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content, doesnt render likes and url', () => {
  const blog = {
    title: 'title',
    author: 'author',
    url: 'url',
    likes: 0,
    user: {
        name: 'name',
    }
  }

  const loggedInUser = { name: 'name'}

  const { container } = render(<Blog blog={blog} loggedInUser={loggedInUser} />)

  const div = container.querySelector('.blog')
  const opt = container.querySelector('.optionalContent')

  expect(div).toHaveTextContent('title')
  expect(div).toHaveTextContent('author')

  expect(opt).toHaveStyle('display: none')

})

test('renders likes and url when show clicked', async () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 147688,
        user: {
            name: 'name',
        }
      }
    
      const loggedInUser = { name: 'name'}
    
      const { container } = render(<Blog blog={blog} loggedInUser={loggedInUser} />)
      const user = userEvent.setup()

      const showButton = screen.getByText('view')

      await user.click(showButton)
      const opt = container.querySelector('.optionalContent')

      expect(opt).toHaveTextContent('url')
      expect(opt).toHaveTextContent('147688')
})

test('like button registers correct number of clicks', async () => {
    const blog = {
        title: 'title',
        author: 'author',
        url: 'url',
        likes: 147688,
        user: {
            name: 'name',
        }
      }
    
      const loggedInUser = { name: 'name'}
      const mockHandler = vi.fn()
    
      const { container } = render(<Blog blog={blog} loggedInUser={loggedInUser} handleLike={mockHandler}/>)
      const user = userEvent.setup()

      const likeButton = screen.getByText('like')
      await user.click(likeButton)
      await user.click(likeButton)

      expect(mockHandler.mock.calls).toHaveLength(2)
}
)