const { Reviews, Games,Users } = require("../db");


const  getReviews=async () =>{
    try {
        const reviews = await Reviews.findAll();
        return reviews;
    } catch (error) {
        console.log('error en get reviews',error)
    }
}
const postReviews =async(req,res)=> {
    const {gameId} = req.params
    const { value, review, userIdName } = req.body;
    let game = await Games.findByPk(gameId)

    try {
        await Reviews.create({
            value: Number(value),
            review: review,
            userIdName: userIdName,
            gameId: gameId
        })
        let rating = ((game.rating+Number(value))/2).toFixed(2)

        await Games.update(
            {rating},
            {where: {id: gameId}}
        )

        res.send('review add')
    } catch (error) {
        console.log('error al crear Review');
    } 
}
// funcion que edita los Reviews
const editReviews = async (req,res) =>{
    const {id} = req.params;
    const {value, review} = req.body;
    await Reviews.update(
        { value, review },
        {where: {id}}
    )
    return res.status(200).json("Review updated")
}
// funcion que elimina review
const deleteReviews = async (req,res) =>    {
    const {id} = req.params;
    await Reviews.destroy({
        where: {id}
    })
    return res.status(200).json('Review delete')
}
// funcion que busca por id del juego y trae todos los Reviews hechos, sobre ese juego
const allReviewsGames = async (req,res) =>{
    const {gameId} = req.params
    const allReviews =  await Reviews.findAll({
        where:  {
            gameId: gameId
        },
        include: [{
            model: Games,
            // as: "game",
        },
    
        ]
    })
    res.send(allReviews);
}
// funcion que devuelve los comentarios que hizo un usuario y en que juego los hizo
const allReviewsUser =async (req,res) =>{
    const {userIdName} = req.params
    console.log(userIdName);
    const allReviews = await Reviews.findAll({
        where:  {
            userIdName: userIdName
        },
        include: [{
            model: Users
        }]
    })
    res.send(allReviews)
}
module.exports = {getReviews,postReviews,allReviewsGames,allReviewsUser,editReviews, deleteReviews};