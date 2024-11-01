const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require ('../models');
const Korisnici = require('../models/Korisnici');


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


const getAllUsers =  async (req, res) => {
    try {
      const allUsers = await db.Korisnici.findAll({
        attributes: [
          'id',
          'administrator',
          'email',
          'ime',
          'prezime'  
        ]
         } );
         res.status(200).json(allUsers);
        }
        catch (err) {
        console.error('Error fetching all users: ',err);
        res.status(500).send('Internal Server Error');
        }
        };
          

        const deleteUser = async (req,res) => {
            const {id} = req.params;
        
            try {
              const user = await db.Korisnici.destroy({
                where: {
                  id:id
                }
              });
                 
              if(!user) {
                return res.status(404).json({message: 'User not found'});
              }
        
              return res.status(200).json({message: 'User deleted successfully'});
            }
               catch (error) {
                console.log(error)
                return res.status(500).json({message: 'Server error'});
               }
          };
         

          const newUser = async (req, res) => {
            const { email, password, name, surname, isAdmin } = req.body;
          
            try {

              const hashedPassword = await bcrypt.hash(password, 10);

              const user = await db.Korisnici.create({
               email: email,
                lozinka:hashedPassword, 
                ime:name,
                prezime:surname,
                administrator: isAdmin,
              });
          
              delete user.lozinka;
              
              return res.status(201).json(user);

            } catch (error) {
              console.error('Error adding user:', error);
              return res.status(500).json({ message: 'Internal server error' });
            }
          };


          const editUser = async (req,res) => {
            const {email, password, name, surname, isAdmin } = req.body;
            const userForUpdating = {ime: name, prezime: surname, email:email, lozinka: password, administrator: isAdmin};

            if(userForUpdating.lozinka && userForUpdating.lozinka.trim() !== "") {
              userForUpdating.lozinka = await bcrypt.hash(userForUpdating.lozinka, 10);
            } else {
              delete userForUpdating.lozinka
            }

            try {
              const user = await db.Korisnici.findByPk(req.params.id);

              if (!user) {
                return res.status(404).json ({message: 'User not found'});

              }

              await db.Korisnici.update(userForUpdating,{
                where: {
                  id:req.params.id
                   }
                 }
              );

              return res.status(200).json(user);
            } catch (error) {
              console.error(error);
              return res.status(500).json({message: 'Error updating user', error: error.message})
            } 
          };
          


module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    deleteUser,
    newUser,
    editUser
};