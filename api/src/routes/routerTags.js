const {Router} = require ('express')

const getTags = require ('../handlers/getTags')
const router = Router();

router.get('/', async (req, res) => {
    return res.status(200).json( await getTags())
})
 
module.exports = router