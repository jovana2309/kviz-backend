const express = require("express");
const router = express.Router()
const authenticateToken = require("../middleware/authentmiddleware.js");
const playControler = require("../controlers/playcontroler.js");



router.use(authenticateToken);

router.get("/", playControler.startGame);
router.post("/submitAnswer", playControler.submitAnswer);
router.post("/fifty-fifty", playControler.fiftyFifty);

module.exports = router;