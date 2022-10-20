const axios =require('axios');
const { Genres } =require('../db');
require('dotenv').config();
const {API_KEY} =process.env;
const getGenres = async ()  =>{
  try {
    const allGenres = await Genres.findAll();
    if(allGenres.length===0){
      const genresInfo= ((await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results).map((el => el.name)); 
      genresInfo.map(async (el) => {
        await Genres.findOrCreate({
          where: {name: el}
        })
      })
      const genresTotal = await Genres.findAll();
      return genresTotal;
    }else{
      return allGenres;
    }
  } catch (error) {
    console.log('Error en cargar los generos',error)
  }  
}

module.exports= getGenres;