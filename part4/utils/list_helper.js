const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}
const totalLikes = (posts) => {
    return posts.reduce((a,b) => a + b.likes, 0);
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null;
    const likes = blogs.map(b => b.likes);

    return blogs.find(b => b.likes === Math.max(...likes));
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null;

    const blogCounts = _.countBy(blogs, 'author')
    const authors = _.keys(blogCounts);

    const mostProductive = _.maxBy(authors, author => {
        return blogCounts[author]
    })

    return {author: mostProductive, blogs: blogCounts[mostProductive]}
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null;

    const mergedByAuthor = _(blogs)
        .groupBy('author')
        .map((posts, author) => ({
            author,
            likes: _.sumBy(posts, 'likes')
        }))
        .value()
   
    const mostLiked = _.maxBy(mergedByAuthor, 'likes');
    
    return mostLiked
}

mostLikes([{author: "h", likes: 5}, {author: "h", likes: 10}, {author:"p", likes:2, style:"whoknows"}])
module.exports = { 
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}