const {Router} = require ('express')
const { Users } = require('../db')
const router = Router()

router.put('/:mail', async (req, res) => {
    try {
        const {mail} = req.params
        const userBanned = await Users.update(
            {banned: true},
            {where:
                {mail: mail}
            }
        )
        if(userBanned) {
            console.log('user banned')
            res.send(userBanned)
        } else {
            res.json({err: 'error del banned'})
        }
    } catch (err) {
        console.log(`ERROR DEL CATCH: ${err}`)
    }

})
router.get('/', async(req, res) => {
    const banUsers = await Users.findAll({
        where: {
            banned: true
        }
    })
    res.send(banUsers)
})

module.exports=router;