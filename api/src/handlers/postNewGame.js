const {Games, Platforms, Tags, Genres} = require('../db')

const createNewGame = async (req, res) => {
    let { name, price, description, rating, video, image, screenshots, store, developers, publishers, website, releaseDate, metacritic, esrb_rating, platforms, tags, genres } = req.body;

    if (!name || !price || !description) return res.status(404).send("Falta enviar datos obligatorios")
    try {
        let gameCreated = await Games.create({
            name,
            price,
            description,
            rating,
            video: [video],
            image,
            screenshots: [screenshots],
            store: [store],
            developers: [developers],
            publishers: [publishers],
            website,
            releaseDate,
            metacritic,
            esrb_rating
            
        })
        let plat = await Platforms.findAll({where: {name: platforms}})
        await gameCreated.addPlatforms(plat)
        let tag = await Tags.findAll({where: {name: tags}})
        await gameCreated.addTags(tag)
        let genre = await Genres.findAll({where: {name: genres}})
        await gameCreated.addGenres(genre)
        res.send(gameCreated)

    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createNewGame
}
  