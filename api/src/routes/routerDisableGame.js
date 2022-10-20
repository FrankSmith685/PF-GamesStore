const {Router} = require('express');
const { Games } = require('../db');
const { updateDisableGames, getDisableGames } = require('../handlers/disableGames');
const router = Router();


// router.put('/:id', async (req, res) => {
//     try{
//         const {id} = req.params
//         const disableGame = await Games.update(
//         {disabled: true},
//         {where: {
//             id: id
//         }}
//         )
//         if(disableGame) {
//             res.send(disableGame)
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
        res.status(200).json(await updateDisableGames(id));
    }catch(error){
        res.status(400).send(error.message);
    }
})

router.get("/",async(req,res)=>{
    try{
        res.status(200).json(await getDisableGames());
    }catch(error){
        res.status(404).send(error.message);
    }
})



module.exports=router;