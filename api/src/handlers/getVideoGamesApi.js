const axios = require("axios");
const e = require("express");
const {Games, Platforms, Genres, Tags }=require("../db.js");
const {API_KEY} = process.env
const { getVideoGamesDB } = require("./getGamesDB.js");
const getGenres = require("./getGenres.js");
const getPlatforms = require("./getPlataforms.js");
const getTags = require("./getTags.js");
const { uuid } = require('uuid');

async function getVideogamesApi(){
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }
    if(true) {
        await getTags()
        await getGenres()
        await getPlatforms()
    }

    const allGames= await Games.findAll();
    try{
    if(allGames.length == 0){
        console.log('cargo la base de datos')
        let page =[]
        for(let i=1;i<6;i++){
            page.push(axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`))
        }
        const info =await Promise.all(page)
        // console.log(info);
        const videoGames = info.map((el) => (el.data.results)).flat()
        // console.log(videoGames);
        let filtrar = videoGames.map( async (el) => {
            const info = (await axios(`https://api.rawg.io/api/games/${el.id}?key=${API_KEY}`)).data
            const infoVideo = (await axios(`https://api.rawg.io/api/games/${el.id}/movies?key=${API_KEY}`)).data.results
            const infoDos = (await axios(`https://api.rawg.io/api/games/${el.id}/game-series?key=${API_KEY}`)).data.results
            el.description=info.description;
            el.stores =(info.stores.map((e)=>e.store.name)).flat()
            el.developers =info.developers.map((e)=>e.name)
            el.publishers=info.publishers.map((e)=>e.name)
            el.website = info.website
            el.realeaseDate = info.released
            el.esrb_rating = info.esrb_rating ?info.esrb_rating.name: info.esrb_rating
            el.metacritic = info.metacritic
            el.video = infoVideo===[]? null: infoVideo.map((e) => e.data.max)
            el.series = (infoDos.map((e) => [{id: e.id, name: e.name, released: e.released, image: e.background_image}] )).flat()
            return {
                id: el.id,
                name: el.name,
                price: `${Math.round(getRandomArbitrary(10, 40))}`,
                platforms: el.platforms.map(e => e.platform.name),
                genres: el.genres.map(e=>e.name),
                screenshots: el.short_screenshots.map(e=>e.image),
                tags: el.tags.map(e=>e.name),
                description: el.description,
                metacritic: el.metacritic,
                stores: el.stores,
                developers: el.developers,
                publishers: el.publishers,
                website: el.website,
                realeaseDate: el.realeaseDate,
                rating: el.rating,
                esrb_rating: el.esrb_rating,
                image: el.background_image,
                video: el.video,
                series: el.series

            }
        });
        const final1 = (await Promise.all(filtrar));
        let game = final1.map( async (el)=> {
            let create= await Games.create({
                id: uuid,
                name: el.name,
                price: el.price,
                description: el.description,
                rating: el.rating,
                image: el.background_image,
                rating: el.rating,
                image: el.image,
                screenshots: el.screenshots,
                video: el.video,
                screenshots: el.screenshots,
                store: el.stores,
                developers: el.developers,
                publishers: el.publishers,
                website: el.website,
                metacritic: el.metacritic,
                realeaseDate: el.realeaseDate,
                esrb_rating: el.esrb_rating,
                series: el.series,
                createdInDb: false
            })
            let plat = await Platforms.findAll({where: {name: el.platforms}})
            await create.addPlatforms(plat)
            let game = await Genres.findAll({where: {name: el.genres}})
            await create.addGenres(game)
            let tag = await Tags.findAll({where: {name: el.tags}})
            await create.addTags(tag);
        })
        const final = await Games.findAll();
        return final
    }else {
        return allGames
    }
}catch(error){
    console.log(error.message)
}
}  
module.exports = {
    getVideogamesApi
}