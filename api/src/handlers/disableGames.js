const { Games } = require("../db")


const updateDisableGames=async(id)=>{
     await Games.update({
        disabled:true
    },{
        where:{
            id:id
        }
    });
    return "Se actualizo";
}

const getDisableGames=async()=>{
   const data= await Games.findAll({
        where:{
            disabled:true
        }
    })
    console.log(data.length);
    return data;
}

module.exports={updateDisableGames,getDisableGames};