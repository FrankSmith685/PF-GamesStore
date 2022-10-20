const { Router } = require('express');
// Importar todos los routers;
const videogameRouter = require("./routervideogames");
const genresRouter=require("./routerGenre.js");
const plataformsRouter=require("./routerPlataform.js");
const filterRoute =require('./routerFilters.js');
const tagsRoute = require('./routerTags')
const authRoute = require('./routerAuth')
const userRouter = require('./routerNewUser')
const checkoutRouter=require("./routerCheckout");
const userLogged = require("./routerGetUserLogged")
const gameDisabled = require ("./routerDisableGame")
const gameAbled = require("./routerAbleGame")
const banUser = require('./routerBanUser')
const noBanUser = require('./routerNoBanUser')
const adminConfig = require('./routerSetAdmin')
const removeAdmin = require('./routerRemoveAdmin')
const { singIn } = require('../handlers/authHandler');
const reviewsRouter = require('./routerReviews');
const ordersRouter = require('../routes/routerOrders');
const newsletter = require('../routes/routerNewsLetter');
const getmails= require('../routes/routerGetMails')
const sendNewsletter = require("./routerSendNewsletter")
const router = Router();


// Configurar los routers

router.use("/videogames", videogameRouter)
router.use("/genres",genresRouter)
router.use("/plataforms",plataformsRouter);
router.use("/filter",filterRoute);
router.use("/tags", tagsRoute);
router.use("/newUser", userRouter)
router.use('/checkout', checkoutRouter)
router.use("/login", singIn)
router.use('/userLogged', userLogged)
router.use('/disabled', gameDisabled)
router.use('/abled', gameAbled )
router.use('/banned', banUser)
router.use('/noBanned', noBanUser)
router.use('/admin', adminConfig)
router.use('/noAdmin', removeAdmin)
router.use('/reviews',reviewsRouter)
router.use('/orders',ordersRouter);
router.use('/newsletter', newsletter)
router.use('/emails', getmails)
router.use("/sendNewsletter", sendNewsletter)


router.use("/auth", authRoute)

module.exports = router;
