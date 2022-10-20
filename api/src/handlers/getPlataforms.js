const axios = require('axios');
const { Platforms } = require('../db');
require('dotenv').config();
const {API_KEY} =process.env;
const getPlatforms = async () => {
  try {
    const platformsDb= await Platforms.findAll();
    if(platformsDb.length===0){
      const link =[axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}`),axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=2`)];
      const promiseLink = (await Promise.all(link))
      const platformsAll = (promiseLink.map((el)=> el.data.results)).flat();
      const info = platformsAll.map((el) => el.name)
      info.map(async (el) => {
        await Platforms.findOrCreate({
          where: {name: el}
        })
      })
      const platformsFinal = await Platforms.findAll();
      return platformsFinal;
    }else{
      return platformsDb;
    }  
  } catch (error) {
    console.log('error en cargar las Platforms',error)
  }
}

module.exports = getPlatforms;