const {Router} = require ('express');
const { Users } = require('../db');
const router = Router();


router.put('/:mail', async (req, res) => {
        try {
            const {mail} = req.params
            const setAdmin = await Users.update(
                {admin: true},
                {where:
                    {mail: mail}
                }
            )
            if(setAdmin) {
                console.log('user is admin')
                res.send(setAdmin)
            } else {
                res.json({err: 'error del admin'})
            }
        } catch (err) {
            console.log(`ERROR DEL CATCH: ${err}`)
        }
    
    
})


module.exports = router