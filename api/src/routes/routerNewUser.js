const {Router} = require ('express');
const { createNewUser } = require('../handlers/postNewUser');
const { getUsers } = require('../handlers/getUsers');
const { singUp } = require('../handlers/authHandler');

const { putUser } = require("../handlers/putUser")
const { deleteUser } = require("../handlers/deleteUser");
const { Users } = require('../db');

const router = Router();

// /newUser
router.post('/', singUp)
router.get("/",async(req,res)=>{
    return res.status(200).json(await getUsers());
})
router.get("/noBanned",async(req,res)=>{
    let noBannedUsers = await Users.findAll(
       { where: {
            banned: false
        }}
    )
    res.send(noBannedUsers)
})


router.put("/:id_name", putUser)

router.delete("/:id_name", deleteUser)

module.exports = router