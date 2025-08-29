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
module.exports = { dummy, totalLikes, favoriteBlog}