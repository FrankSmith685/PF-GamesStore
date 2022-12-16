const {Users} = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { transporter } = require("../config/mailer")

function validateAttributes(name, lastName, userName, mail){
    if (!name || (typeof name !== "string") || (name.length < 0) ){
        return "The User Name must exist and must be a character string"
    } else if (!lastName || (typeof lastName !== "string") || (lastName.length < 0) ){
        return "The User Name must exist and must be a character string"
    } else if (!userName || (typeof userName !== "string") || (userName.length < 0) ){
        return "The User userName must exist and must be a character string"
    } else if (!mail || (typeof mail !== "string") || (mail.length < 0) ){
        return "The User mail must exist and must be a character string"
    } else {
        return true;
    }
}


const singUp = async (req, res) =>    {
    if(req.body.password !== undefined)  
        {
        try {

        let admins = ["juandavid614@hotmail.com","f.s.b.rojas@gmail.com"]
        let password = bcrypt.hashSync(req.body.password, 8);
        const { name, lastName, userName, mail, address, image} = req.body
        
        const validation = validateAttributes(name, lastName, userName, mail, address);
        if (validation === true) {
    
          const [newUser, created] = await Users.findOrCreate({
            where: {
              mail
            },
            defaults: {
              name,
              lastName,
              userName,
              address,
              password,
              image,
              admin: admins.includes(mail) ? true : false
            },
          })
          let token = jwt.sign({ user: newUser }, 'aaa', {
            expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
        });


         if (!created ) res.status(201).send('There is already a user with that mail') 
         else {
          res.json({newUser,token})
         }
        
         await transporter.sendMail({
            from: '"Thanks For Register In Games Store 👻" <henry.games.store@gmail.com>', // sender address
            to: mail, // list of receivers
            subject: "Hello ✔", // Subject line
            html: `
            <div>
                <h1>User Information 📓</h1>
                <h2>Thanks For Register In Games Store 👻</h2>
                <h2>This is your information:</h2>
                <ul>
                    <li>Name: ${name}</li>
                    <li>Username: ${userName}</li>
                    <li>Address: ${address}</li>
                </ul>
            </div>
            `, // html body
          });

        } else {
          return res.status(404).send(validation)
        }
      }
      catch (error) {
        console.log(error)
        res.status(500).json(error)
      }
    };
}

const singIn=async (req,res) => {
    let { mail, password} = req.body;
    try {
        const user = await Users.findOne({
            where: {mail : mail}
        }) 
        // console.log('usuario de base de datos', user.dataValues)
        if(!user){
            res.send(404).json({ msg: "Usuario con este correo no se encuentra" })
        }else{
            if(bcrypt.compareSync(password,user.password)){
                let token = jwt.sign({ user: user }, 'aaa', {
                    expiresIn: Math.floor(Date.now() / 1000) + (60 * 60)
                });
                res.json({user: user,token: token})
                // .redirect("http://localhost:3000/profile")
            }else{
                res.status(401).json({msg: "Contrasenia incorrecta"})
            }
        }
    } catch (error) {
        console.log('Error en inciar sesion',error)
    }
    


}
//singUp --> registrar
module.exports = {singUp,singIn}
// module.exports = {singIn}