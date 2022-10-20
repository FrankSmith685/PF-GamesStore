const { Router } = require("express");
const getUserLogged = require("../handlers/getUserLogged");
const router = Router();


router.get('/:mail', getUserLogged)


module.exports=router;
