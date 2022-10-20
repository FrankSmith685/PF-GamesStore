const { Router } = require("express");

const getMail= require("../handlers/getMails")

const router = Router();

router.get("/", async(req,res)=>{
    console.log( await getMail())
    return res.status(200).json("ok");
})

module.exports=router;
