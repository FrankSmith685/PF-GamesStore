const { Router } = require("express");
const { getMailsNewsLetter, sendNewsletter } = require("../handlers/newsletterhandler");

const router = Router();


router.get('/', getMailsNewsLetter)
router.post('/', sendNewsletter)

module.exports=router;