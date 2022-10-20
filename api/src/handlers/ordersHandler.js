const { Orders } = require("../db")

const getOrders = async (req,res) =>  {
  try {
    let orders = await Orders.findAll({
      include:[{
        all: true,
      }]
    })
    return orders;
  
  } catch (error) {
    console.log('error en Get orders',error)
  }
} 

const userOrders = async (req,res) => {
  let {userIdName} =req.params
  try {
    let orders = await Orders.findAll({
      where: {userIdName: userIdName},
      include: [{
        all: true
      }]
      
    })
    res.send(orders);
  } catch (error) {
    console.log('error en order users',error)
  }
}

module.exports= {getOrders,userOrders}