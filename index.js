const express = require("express");
const cors = require("cors");
const app = express()
require ('dotenv').config()

const router = require("./routes/router");
const morgan = require('morgan')

const createError = require('http-errors')
const PORT = process.env.PORT

const bodyParser = require('body-parser');
app.use(morgan("common"));
app.use(cors());
app.use(bodyParser.json());






app.use("/api", router);

app.use (async (req,res,next) => {
  next(createError.NotFound())
})

 
app.get ('/', async(req,res,next) => {
  res.send('Hello from Express.')
})





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})