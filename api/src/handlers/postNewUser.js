// const {Users} = require('../db')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const {Op} = require('sequelize')

// function validateAttributes(name, lastName, userName, mail){
//     if (!name || (typeof name !== "string") || (name.length < 0) ){
//         return "The User Name must exist and must be a character string"
//     } else if (!lastName || (typeof lastName !== "string") || (lastName.length < 0) ){
//         return "The User Name must exist and must be a character string"
//     } else if (!userName || (typeof userName !== "string") || (userName.length < 0) ){
//         return "The User userName must exist and must be a character string"
//     } else if (!mail || (typeof mail !== "string") || (mail.length < 0) ){
//         return "The User mail must exist and must be a character string"
//     } else {
//         return true;
//     }
// }

// const createNewUser = async (req, res) => {
//     if(req.body.password !== undefined)  
//         {
//         try {
       
        
//         let password = bcrypt.hashSync(req.body.password, 8);
//         const { name, lastName, userName, mail, address} = req.body
        
//         const validation = validateAttributes(name, lastName, userName, mail, address);
//         if (validation === true) {
    
//           const [newUser, created] = await Users.findOrCreate({
//             where: {
//               mail
//             },
//             defaults: {
//               name,
//               lastName,
//               userName,
//               address,
//               password,
//             },
//           })
//           let token = jwt.sign({ user: newUser }, 'aaa', {
//             expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
//         });
  
//          if (!created ) res.status(201).send('There is already a user with that mail') 
//          else {
//           console.log('hola')
//          }
  
//         } else {
//           return res.status(404).send(validation)
//         }
//       }
//       catch (error) {
//         console.log(error)
//         res.status(500).json(error)
//       }
//     };
//     }
    
    
//     // let { name, lastName, mail, adress, userName, image } = req.body;

//     // if (!userName || !name || !lastName || !mail) return res.status(404).send("Falta enviar datos obligatorios")
//     // try {
//     //     let newUser = await Users.create({
//     //         name,
//     //         lastName,
//     //         mail,
//     //         adress,
//     //         userName,
//     //         image
//     //     })

//     //     res.send(newUser)

//     // } catch (error) {
//     //     return res.status(404).send("Error en alguno de los datos provistos")
//     // }



// module.exports = {createNewUser}
  