const {Router} = require('express');
const { Games } = require('../db');
const { updateEnableGames, getEnableGames } = require('../handlers/enableGames');
const router = Router();


// router.put('/:id', async (req, res) => {
//     try{
//         const {id} = req.params
//         const ableGame = await Games.update(
//         {disabled: false},
//         {where: {
//             id: id
//         }}
//         )
//         if(ableGame) {
//             res.send(ableGame)
//         } else {
//             res.json({err: 'error'})
//         }
//     } catch(err) {
//         console.log(err)
//     }
    
// } )

router.put("/:id",async(req,res)=>{
    try{
        const {id}=req.params;
        // const {disabled}=req.body;
        res.status(200).json(await updateEnableGames(id));
    }catch(error){
        res.status(400).send(error.message);
    }
})

router.get("/",async(req,res)=>{
    try{
        res.status(200).json(await getEnableGames());
    }catch(error){
        res.status(404).send(error.message);
    }
})



module.exports=router;