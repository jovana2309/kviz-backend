const jwt = require('jsonwebtoken');
const db = require('../models/'); 

const checkAdmin = async (req, res, next) => {
  const token = req.headers.authorization; 

  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  console.log(token)
  try {
    const decoded = jwt.decode(token.split(" ")[1]);
    const userEmail = decoded.email;
    const user = await db.Korisnici.findOne({ where: { email: userEmail }, attributes: ["admin"] });
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (!user.admin) {
      return res.status(403).send('Forbidden');
    }

    req.user = user; 
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = checkAdmin;