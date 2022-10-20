const {Router} =require('express');
const { getOrders, userOrders } = require('../handlers/ordersHandler');

const router = Router();

router.get("/",async(req,res)=>{
    return res.status(200).json(await getOrders());
})
router.get('/:userIdName', userOrders);
module.exports = router;