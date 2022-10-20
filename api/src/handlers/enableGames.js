const { Games } = require("../db")


const updateEnableGames=async(id)=>{
     await Games.update({
        disabled:false
    },{
        where:{
            id:id
        }
    });
    return "Se actualizo";
}

const getEnableGames=async()=>{
   const data= await Games.findAll({
        where:{
            disabled:false
        }
    })
    return data;
}

module.exports={updateEnableGames,getEnableGames};