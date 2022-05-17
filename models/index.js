const User= require('./User');
const Post= require('./Post');
const Comment= require('./Comment');
User.hasMany(Post,{});

Post.belongsTo(User,{
    foreignKey:'userId',
});
Comment.belongsTo(User,{
    foreignKey:'userId',
})
module.exports ={User,Post, Comment};