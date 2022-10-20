const {Router} = require('express');
const { default: Stripe } = require('stripe');
const { Orders, Games } = require('../db');
// const { Orders } = require('../db');
const {KEY_CHECK}= process.env;
const { transporter } = require("../config/mailer")

const stripe= new Stripe(KEY_CHECK);

const router = Router();
router.post("/", async(req,res)=>{
    try {
        const {id,amount, mail, arr, userIdName}=req.body;
        const email = `
        <!DOCTYPE html>
        <html>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;900&family=Righteous&display=swap" rel="stylesheet">
                <style>
                    .img {
                        max-width: 100px;
                        border-radius: 25%;
                    }
    
                    h1, h2, h3, p {
                        text-align: center;
                        font-family: 'Lato', sans-serif;
                        font-family: 'Righteous', cursive;
                    }
                    .image {
                        background-color: rgb(31, 31, 31);
                        text-align: center;
                    }
    
                    .information {

                        background-color: rgb(211, 211, 211);
                        height: 50px;
                        text-align: center;
                        justify-content: center;
                    }
    
                    .refound {
                        display: flex;
                        align-items: center;
                        background-color: aliceblue;
                        height: 100PX;
                        color: rgb(141, 141, 141);
                    }
                </style>
            </head>
            <body>
                <div>
                    <div class="image">
                        <a href="https://henry-project.vercel.app/home">
                            <img class="img" src="https://i.im.ge/2022/09/07/OZP87y.Icon.png" alt="iconImg"/>
                        </a>
                    </div>
                    <h1>Thanks!</h1>
                    <h3>Hi ${mail} 👋</h3>
                    <p>Thanks for your purchase from Games Store</p>
                    <h1>Invoice ID: ${id}</h1>
                    <hr></hr>
                    <div class="information">
                        <h2>INFORMATION ABOUT YOUR ORDER:</h2>
                    </div>
                    <hr></hr>
                    <h3>Billed to: ${mail}</h3>
                    <h3>Font: Games Store</h3>
                    <hr></hr>
                    <h3>Total [USD]: $${amount}</h3>
                    <hr></hr>
                    <div class="refound">
                        <p>
                            Unless otherwise stated by the product or offer, any game purchased from the Games Store is eligible for a refund within 14 days of purchase (or, for pre-orders, upon release) if you played less than 2 hours. See more information in our <a href="https://henry-project.vercel.app/home">refund policy</a>.
                        </p>
    
                    </div>
                </div>
            </body>
        </html>
        `;
            const payment = await stripe.paymentIntents.create({
            amount: amount,
            receipt_email: mail,
            currency: "USD", //la moneda
            description: "Videogames", //descripcion de producto
            payment_method: id, //id del fronted
            confirm: true, //confirm the payment at the same time
            receipt_email:'lautaro0121@gmail.com'
            });
            // console.log(payment)
            try {
                let order =  await Orders.create({
                id_Orders: id,
                payment: 'card',
                subTotal: amount/100,
                paid: true,
                userMail: mail,
                userIdName: userIdName
                })
                
                let games = await Games.findAll({where: {name: (arr.flat())}})
                await order.addGames(games);
                // console.log(games);
                // console.log(order);
            } catch(err) {console.log(err)}
           
        
            await transporter.sendMail({
                from: '"Thanks For Buy In Games Store 👻" <henry.games.store@gmail.com>',
                to: mail,
                subject: `Your receipt of Games Store ${userIdName} 🧾`,
                html: email
            })
            
            res.status(200).json({message: "Successful Payment"});
    } catch (error) {
        return res.status(404).json(error.raw.message);
    }
});

module.exports=router;

