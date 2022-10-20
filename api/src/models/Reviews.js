const { DataTypes, UUID, UUIDV4  } = require('sequelize');


module.exports = (sequelize) => {

  sequelize.define('reviews', { 
    value:  {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    review: {
        type: DataTypes.STRING,
        allowNull: false
    }
   });
};