const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    let favorite = blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])

    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes
    }
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    //Count the blogs post by each author
    const authorBlogCounts = _.countBy(blogs, 'author')
    
    //Find the author with the most blog posts
    const topAuthor = _.maxBy(Object.keys(authorBlogCounts), (author) => authorBlogCounts[author])

    return {
        author: topAuthor,
        blogs: authorBlogCounts[topAuthor]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null
    }
  
    const likesByAuthor = _(blogs)
      .groupBy('author') // Group the blog posts by the 'author' property.
      .tap((grouped) => console.log('After groupBy:', grouped)) 
      .map((posts, author) => ({
        author: author,
        likes: _.sumBy(posts, 'likes') // Sum the 'likes' for each author's posts.
      }))
      .tap((summed) => console.log('After map/sumBy:', summed))
      .value() // Extract the value from the chain.
  
    const topAuthor = _.maxBy(likesByAuthor, 'likes')
    console.log('Most liked author:', topAuthor) 
  
    return topAuthor
  }

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}