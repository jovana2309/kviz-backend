const express = require("express");
const router = express.Router()
const db = require("../models/")

router.post("/signup", async (req, res,next) => {
    res.send('signup route')
})

router.post("/login", async (req, res,next) => {
   res.send ('login route')
})

router.post("/refresh-token", async (req, res,next) => {
    res.send ('refresh token route')
})

router.delete("/logout", async (req, res,next) => {
    res.send ('logout route')
}) 

module.exports = router;