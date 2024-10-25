const express = require("express");
const router = express.Router()
const db = require("../models/")
const authenticateToken = require("../middleware/authentmiddleware.js");
const checkAdmin = require("../middleware/checkAdmin.js");
const {getAllResults, deleteResult} = require("../controlers/resultscontroler.js");
const {getAllUsers,deleteUser,newUser, editUser} = require("../controlers/authcontroler.js");


router.use(authenticateToken);
router.use(checkAdmin);

router.get('/users',getAllUsers);
router.delete('/deleteUser/:id',deleteUser);

router.get('/all-results', getAllResults);
router.delete('/delete-result/:id',deleteResult);

router.put('/editUser/:id', editUser);

router.post('/addUser', newUser);

module.exports = router;