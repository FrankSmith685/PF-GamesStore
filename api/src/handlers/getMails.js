const { Users }= require('../db');

const getMails= async() => {
    const users= await Users.findAll()

   try {
    const users= await Users.findAll();
        return users
    } catch (error) {
        console.log('error en traer usuarios',error)
    }
}
module.exports= getMails