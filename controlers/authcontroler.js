const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require ('../models');


const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

const registerUser = async (req, res) => {
    try {
        const {email, ime, prezime, lozinka} = req.body;

        if(!email || !ime || !prezime || !lozinka) {
            return res.status(400).json({message: "Email, ime, prezime and lozinka are required"})
        }

        const existingUser = await db.Korisnici.findOne({where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.'});
        }

        const hashedPassword = await bcrypt.hash (lozinka, 10);

        await db.Korisnici.create ({email,ime,prezime, lozinka: hashedPassword});
        res.status(201).json({ message: 'User registered successfully.'});
    } 
        catch (error) {
            res.status(500).json ({ error: error.message});
        }
};

const loginUser = async (req, res) => {
    try {
        const {email, lozinka} = req.body;

        const user = await db.Korisnici.findOne({where: {email} });
        if (!user) {
            return res.status(400).json({message: 'Invalid email or password.'});
        }

        const isMatch = await bcrypt.compare (lozinka,user.lozinka);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.'});
        }

        const token = jwt.sign(
            {email: user.email, isAdmin: user.administrator},
            JWT_SECRET,
            {expiresIn:'1h'}
        );

        res.json ({token});
    } 
    catch (error) {
        res.status(500).json ({error:error.message});
    }
};

module.exports = {
    registerUser,
    loginUser
};