const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Associations
// user can have many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// posts can only belong to one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// comment can only belong to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// comment can only belong to one post
Comment.belongsTo(Post, {
    foreignKey: 'post_id',
});

// post can have many comments
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

// user can have many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
});

const models = {
    User,
    Post,
    Comment,
};

module.exports = models;