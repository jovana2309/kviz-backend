const express = require("express");
const router = express.Router()
const playRouter = require("./play");
const adminRouter = require("./admin");
const {registerUser, loginUser} = require('../controlers/authcontroler');
const {getTop10Results} = require("../controlers/resultscontroler")



router.use("/play", playRouter);
router.use("/admin", adminRouter);


router.get("/top-results", getTop10Results);
router.post('/signup',registerUser);
router.post('/login', loginUser);


module.exports = router;