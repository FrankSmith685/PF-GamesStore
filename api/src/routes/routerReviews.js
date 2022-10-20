const { Router } = require("express");
const {getReviews, postReviews, allReviewsGames, allReviewsUser, editReviews, deleteReviews} = require('../handlers/reviewsHandler');

const router = Router();

router.get("/",async(req,res)=>{
    return res.status(200).json(await getReviews());
})
router.post('/:gameId/add',postReviews);
router.get('/:gameId',allReviewsGames);
router.get('/user/:userIdName/', allReviewsUser);
router.put('/update/:id', editReviews);
router.delete('/delete/:id',deleteReviews)
module.exports = router;