const axios = require('axios');
require('dotenv').config();
const {API_KEY} =process.env;


const {Tags }=require("../db.js");



const getTags = async () => {
  try {
    const allTags = await Tags.findAll();
    if(allTags.length == 0){
        let tags = []
        let page = 1
        while (page < 6) {
            const info = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=` + page)
            info.data.results.forEach(e => {
                tags.push(e.tags)
            });
            page++
        }
        let tagMap= tags.flat().map((e) => e.name)
        tagMap.map(async (e)=> {
            await Tags.findOrCreate({
                where: {name: e}
            })
        })
        const allTags = await Tags.findAll();
        return allTags;
    }else{
        return allTags;
    }    
    } catch (error) {
        console.log('Error en Tags',error)
    }

}


module.exports = getTags;
