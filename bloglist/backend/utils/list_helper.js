const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    if(blogs.length !== 0){
        return blogs.reduce((sum, blog) => sum + blog.likes, 0)
    } else {
        return 0
    }
}

const favoriteBlog = (blogs) => {
    if(blogs.length !==0){
        
        console.log(blogs)
        const bestBlog = blogs.reduce((max, blog) => {
        return (blog.likes >= max.likes) ? blog : max
        }, blogs[0])

        console.log(bestBlog)
        
        return {
            title: bestBlog.title,
            author: bestBlog.author,
            likes: bestBlog.likes
        }

    } else {
        return "no blogs"
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }
