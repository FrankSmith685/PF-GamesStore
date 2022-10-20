const { Newsletter, Games } = require("../db")
const { transporter } = require("../config/mailer")


const getMailsNewsLetter = async (req, res) => {
    try {
        let allMails = await Newsletter.findAll()
        res.send(allMails)
    }
    catch (err) {
        console.log(err)
    }
   
}

const sendNewsletter = async (req, res) => {
    let {mail} = req.body
    try{    
        let news = await Newsletter.findOrCreate({
            where: {
                mail: mail
            },
            defaults: {
                mail: mail
            }
        })
        await transporter.sendMail({
            from: '"Thanks For Subscriber To Newsletter 🎮" <henry.games.store@gmail.com>',
            to: mail,
            subject: "Welcome to newsletters of Games Store 📰🧐",
            html: "buenas"
        })
        res.send(news)
    } catch(err) {
        console.log(err)
    }
}



module.exports={
    getMailsNewsLetter,
    sendNewsletter
}