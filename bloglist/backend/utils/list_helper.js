// Load the full build.
var lodash = require('lodash')


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
        
        const bestBlog = blogs.reduce((max, blog) => {
        return (blog.likes >= max.likes) ? blog : max
        }, blogs[0])
        
        return {
            title: bestBlog.title,
            author: bestBlog.author,
            likes: bestBlog.likes
        }

    } else {
        return "no blogs"
    }
}

const blogsByAuthor = (blogs) => {
    if(blogs.length === 0) {
        return "no blogs"
    } else {
        const blogCount = (lodash.countBy(blogs, "author"))

        let max = 0
        for (author in blogCount){
            var mostBlogsAuthor = (blogCount[author] > max) ? author : max
        }

        return {author: mostBlogsAuthor, blogs: blogCount[mostBlogsAuthor]}

    }
}

const likesByAuthor = (blogs) => {
    if(blogs.length === 0) {
        return "no blogs"
    } else {
        const groupedBlogs = lodash.groupBy(blogs, "author")

        let max = 0
        let mostLikedAuthor = {name: "", likes: 0}
        for (author in groupedBlogs){
            const likeSum = lodash.sumBy(groupedBlogs[author], "likes")
            mostLikedAuthor = likeSum > max ? {name: author, likes: likeSum} : mostLikedAuthor
            max = likeSum > max ? likeSum : max
        }
        console.log(mostLikedAuthor)
        return mostLikedAuthor
    }
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    blogsByAuthor,
    likesByAuthor
  }
