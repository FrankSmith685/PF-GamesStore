const {Users} = require('../db')

const getUserLogged = async (req, res) => {
 const {mail} = req.params
    try{
    let user = await Users.findOne({where: {mail: mail}})
    if(user) {
        return res.send(user)
    } else {
        return res.json({err: 'no se pudo encontrar el usuario' })
    }

     } catch(err) {
    console.log(`ERROR DEL CATCH: ${err}`)
    }

}
module.exports=getUserLogged;