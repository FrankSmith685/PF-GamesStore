const {Router} = require ('express');
const { Users } = require('../db');
const router = Router();


router.put('/:mail', async (req, res) => {
    try {
        const {mail} = req.params
        const disableAdmin = await Users.update(
            {admin: false},
            {where:
                {mail: mail}
            }
        )
        if(disableAdmin) {
            console.log('user is not admin')
            res.send(disableAdmin)
        } else {
            res.json({err: 'error del admin'})
        }
    } catch (err) {
        console.log(`ERROR DEL CATCH: ${err}`)
    }


})

module.exports = router