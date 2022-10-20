const {Router} = require ('express')
const { Users } = require('../db')
const router = Router()

router.put('/:mail', async (req, res) => {
    try {
        const {mail} = req.params
        const userNoBanned = await Users.update(
            {banned: false},
            {where:
                {mail: mail}
            }
        )
        if(userNoBanned) {
            console.log('user enabled')
            res.send(userNoBanned)
        } else {
            res.json({err: 'error del banned'})
        }
    } catch (err) {
        console.log(`ERROR DEL CATCH: ${err}`)
    }

})

module.exports=router;