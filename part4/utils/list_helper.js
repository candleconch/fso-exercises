const dummy = (blogs) => {
    return 1
}
const totalLikes = (posts) => {
    return posts.reduce((a,b) => a + b.likes, 0);
}
module.exports = { dummy, totalLikes}