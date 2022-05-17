// const{Model, DataTypes}= require('sequelize');
// const sequelize = require('../config/connection');

// class Post extends Model{}
// Post.init({
//     id:{
//         type: DataTypes.INTEGER,
//         allowNull:false,
//         primaryKey:true,
//         autoIncremented:true,
//     },
//     title: {
//             type: DataTypes.STRING,
//             allowNull:false,
//             validator: {len: [8]},
//             },
//     body: {
//             type:DataTypes.STRING,
//             allowNull:false,
//         },
//     userId:{
//             type: DataTypes.INTEGER,
//             foreignKey:true,
//             references: {
//                 model:'User',
//             },
//         },
//     },
//     {
//         sequelize,
//         timestamps: true,
//         freezeTableName: true,
//         underscored: true,
//         modelName: 'Post'
//     }
// );
// module.exports = Post

const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING
  },
  {
    sequelize
  }
);

module.exports = Post;
