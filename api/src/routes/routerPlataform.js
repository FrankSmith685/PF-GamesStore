const { Router } = require("express");
const getPlatforms = require("../handlers/getPlataforms");


const router = Router();

router.get("/",async(req,res)=>{
    return res.status(200).json(await getPlatforms());
})

module.exports=router;