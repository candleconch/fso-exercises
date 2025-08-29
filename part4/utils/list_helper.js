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

    const authorCounts = _.countBy(blogs, 'author')
    // console.log('authorcounts:',authorCounts)
    const authors = _.keys(authorCounts);

    const mostProductive = _.maxBy(authors, author => {
        return authorCounts[author]
    })

    return {author: mostProductive, blogs: authorCounts[mostProductive]}
}

module.exports = { 
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
}