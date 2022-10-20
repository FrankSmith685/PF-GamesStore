const { getAllVideoGames } = require("./getAllVideoGames")

const filterRating = async (rating) =>  {
    const allGames = await getAllVideoGames();
    const filterRating= allGames.filter((el)=> Number(el.rating)>=Number(rating));
    if(filterRating){
      return filterRating;
    }else{
      throw new Error("Error al filtrar por Rating");
    }
    // console.log('error en filtrar por RATING',error)
}

// const filterRating = async (req,res) =>  {
//   const {rating} = req.params;
//   try {
//     const allGames = await getAllVideoGames();
//     const filterRating= allGames.filter((el)=> Number(el.rating)>=Number(rating));
//     console.log(filterRating)
//     return res.json(filterRating);
//   }
//   catch (error) {

//     console.log('error en filtrar por RATING',error)
//   }
// }



module.exports = filterRating;