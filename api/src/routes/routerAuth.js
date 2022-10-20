const router = require('express').Router()
const passport = require('passport')
const { Users } = require('../db')
// const { Users } = require('../db')
const {
    URL_VERCEL
  } = process.env;

router.get("/google", passport.authenticate("google", {scope:["profile", "email"]}))
router.get("/google/callback", passport.authenticate("google", {
    successRedirect: `${URL_VERCEL}/profile`,
    failureRedirect: `${URL_VERCEL}`
}))

router.get("/failed", (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failed'
    })
})
router.get("/success", (req, res) => {
    if(req.user) {
            res.status(200).json({
            success: true,
            message: 'success',
            user: req.user
            // cookies: req.cookies
        })
        Users.findOrCreate({
            where: {mail: req.user.emails[0].value},
            
            defaults: {name: req.user.displayName,
            lastName: req.user.name.familyName,
            mail: req.user.emails[0].value,
            userName: req.user.name.givenName,
            image: req.user.photos[0].value}
        })
        // console.log(req.user.name.givenName)
        // console.log(req.user.id)

    }
})

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(`${URL_VERCEL}`)
})



module.exports = router;