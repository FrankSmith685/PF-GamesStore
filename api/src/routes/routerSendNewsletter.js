const { Router } = require("express");
const { sendNewsletter } = require("../handlers/sendNewsletter");

const router = Router()

router.post("/", sendNewsletter)

module.exports = router