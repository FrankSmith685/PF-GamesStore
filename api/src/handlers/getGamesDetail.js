const axios = require("axios");
const { Games, Genres, Platforms, Tags } = require("../db");
const {API_KEY} = process.env;

const findGameById = async (req, res) => {
    const {gameId} = req.params;
   try {
    let gameDetail = await Games.findOne({
        
        where: {id: gameId},
        

        include: [{
            model: Genres,
            attributes: [ 'name' ],
            through: { attributes: [] }
          },
          {
            model: Platforms,
            attributes: [ 'name' ],
            through: { attributes: [] }
          },
          {
            model: Tags,
            attributes: [ 'name' ],
            through: { attributes: [] }
          }
      ]
    })
    if(!gameDetail){
        return res.json({err: `No se pudo encontrar el detalle del videojuego`})
    }else{
        return res.send(gameDetail)  
    }
   } catch (error) {
     console.log('error en requerir juegos por id',error)
   }
    
}


module.exports = {
    findGameById
}