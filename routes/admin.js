const express = require("express");
const router = express.Router()
const db = require("../models/")
const authenticateToken = require("../middleware/authentmiddleware.js");
const checkAdmin = require("../middleware/checkAdmin.js");

router.use(authenticateToken);
router.use(checkAdmin);


router.get("/", async (req, res,next) => {
    res.send('admin')
})

module.exports = router;