const {Router} = require('express');


const filterRating = require('../handlers/filterRating');
const router = Router();

router.get('/rating/:rating', async(req,res)=>{
    try{
        const {rating} = req.params;
        return res.status(200).json(await filterRating(rating))
    }catch(error){
        return res.status(404).send(error.message);
    }
});

module.exports=router;