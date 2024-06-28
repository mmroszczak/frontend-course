const BlogForm = ({addBlog, newTitle, handleTitleChange, newAuthor, handleAuthorChange, newURL, handleURLChange}) => (
    <form onSubmit={addBlog}>
        Title: <input
            value={newTitle}
            type="text"
            onChange={handleTitleChange}
            name="Title"/><br/>
        Author: <input
            value={newAuthor}
            type="text"
            onChange={handleAuthorChange}
            name="Author"/><br/>
        URL: <input
            value={newURL}
            type="text"
            onChange={handleURLChange}
            name="URL"/><br/>
        <button type="submit">create</button>

    </form>
)

export default BlogForm