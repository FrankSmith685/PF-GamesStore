const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('users', {
    id_name: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName:  {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    mail:  {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    address:  {
      type: DataTypes.STRING,
      allowNull: true
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    // myGames: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: true
    // },
    userName: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    image:  {
      type: DataTypes.TEXT,
      allowNull: false    },
  });
};
