const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('tags', { 
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }

  }, {timestamps: false});
};