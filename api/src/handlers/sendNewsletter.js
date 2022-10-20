const { transporter } = require("../config/mailer");

const sendNewsletter = async (req, res) => {
    let { mails, emailHtml } = req.body
    console.log(req.body)
    try {
        await transporter.sendMail({
            from: '"Hi, watch this update 👀" <henry.games.store@gmail.com>',
            to: mails,
            subject: "Don't miss out on the latest on the Games Store! 😋",
            html: emailHtml
        })
        res.send("Email sended")
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    sendNewsletter
}