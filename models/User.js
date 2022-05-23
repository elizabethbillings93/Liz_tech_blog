const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Make user Model
class User extends Model {
  // Check Password and return crypto password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  {
    //  Hooks are functions which are called before and after calls in sequelize are executed.
    hooks: {
      // Before making this user, 
      beforeCreate: async (newUserData) => {
        // Get password data and run through crypto and return hashed password that is no more than 10 characters
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        // Return New hashed password as new variable
        return newUserData;
      },
      // Before updating user
      beforeUpdate: async (updatedUserData) => {
        // Pull password from user and run through crypto and return hased password that is no more than 10 characters
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        // Return Updated user
        return updatedUserData;
      }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'User'
  }
);

module.exports = User;
