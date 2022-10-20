const { Games } = require("../db");

const putGames = async (req, res) => {
    let { id } = req.params
    let { name, price, description, image, rating, video, screenshots, store, developers, publishers, website, releaseDate, metacritic, esrb_rating, series } = req.body
    try {
        await Games.update(
            { name, price, description, rating, video, screenshots, image, store, developers, publishers, website, releaseDate, metacritic, esrb_rating, series }, 
            { where: {id}
        })
        return res.status(200).json("Game updated")
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    putGames
}