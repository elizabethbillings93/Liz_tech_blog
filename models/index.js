const User= require('./User');
const Post= require('./Post');
const Comment= require('./Comment');
// A user can have a many posts
User.hasMany(Post,{});
// Posts connects to User by the UserId
Post.belongsTo(User,{
    foreignKey:'userId',
});
// Any comment can be connect to user by user ID
Comment.belongsTo(User,{
    foreignKey:'userId',
})
module.exports = {User,Post, Comment};
