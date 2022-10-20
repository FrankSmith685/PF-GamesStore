const {DataTypes}=require("sequelize");

module.exports=(sequelize)=>{
    sequelize.define('orders',{
        id_Orders:{
            type:DataTypes.STRING,
            primaryKey:true,
            allowNull:false
        },
        userMail: {
            type: DataTypes.STRING,
            allowNull:false
        },
        date:{
            type:DataTypes.DATEONLY,
            allowNull:false,
            defaultValue: new Date()
        },
        payment:{
            type:DataTypes.STRING,
            allowNull:false
        },
        subTotal:{
            type:DataTypes.FLOAT,
            allowNull:false
        },
        paid:{
            type:DataTypes.BOOLEAN,
            allowNull:false
        }
    },{timestaps:false});
}
