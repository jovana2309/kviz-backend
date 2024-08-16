const express = require("express");
const app = express()
require ('dotenv').config()

const router = require("./routes/router");
const morgan = require('morgan')

const createError = require('http-errors')
const PORT = process.env.PORT

const bodyParser = require('body-parser');
const {registerUser, loginUser} = require('./controlers/authcontroler');

const authentToken = require('./middleware/authentmiddleware.js'); 
app.use(morgan("common"));
app.use(bodyParser.json());




const AuthRoute = require ('./routes/authentification');
const checkAdmin = require("./middleware/checkAdmin.js");


app.use("/", router);

app.use (async (req,res,next) => {
  next(createError.NotFound())
})

 
app.get ('/', async(req,res,next) => {
  res.send('Hello from Express.')
})

/* app.get('/admin', authenticateToken, checkAdmin, (req, res) => {
  res.send('Welcome Admin');
});

app.get('/user', authenticateToken, (req, res) => {
  res.send('Welcome User');
}); */




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})