const { Users }= require('../db');

const getUsers= async () => {
   try {
    const users= await Users.findAll();
    return users;
    
    } catch (error) {
        console.log('error en traer usuarios',error)
    }
}

module.exports = {getUsers};