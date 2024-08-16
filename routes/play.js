const express = require("express");
const router = express.Router()
const db = require("../models/")
const authenticateToken = require("../middleware/authentmiddleware.js");

router.use(authenticateToken);


router.get("/", async (req, res,next) => {
    res.send('play')
})

module.exports = router;