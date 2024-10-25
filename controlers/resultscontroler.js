const db = require ('../models/');

const getTop10Results =  async (req, res) => {
    try {
      const topResults = await db.Rezultati.findAll({
        attributes: [
          'id',
          'broj_tacnih_odgovora',
          'datum'  
        ],
        include: [
          {
            model: db.Korisnici,
            attributes: ["ime", "prezime"],
            as: "korisnici"
          }
        ],
        order: [['broj_tacnih_odgovora', 'DESC']],  
        limit: 10  
      });
  
      const formattedResults = topResults.map(result => ({
        id:result.id,
        ime: result.korisnici.ime,
        prezime: result.korisnici.prezime,
        rezultat: result.broj_tacnih_odgovora,
        datum:result.datum
      }));
      
      res.status(200).json(formattedResults);
    } catch (err) {
      console.error('Error fetching top results:', err);
      res.status(500).send('Internal Server Error');
    }
  };

  const getAllResults =  async (req, res) => {
    try {
      const allResults = await db.Rezultati.findAll({
        attributes: [
          'id',
          'broj_tacnih_odgovora',
          'datum'  
        ],
        include: [
          {
            model: db.Korisnici,
            attributes: ["ime", "prezime"],
            as: "korisnici"
          }
        ],
        order: [['broj_tacnih_odgovora', 'DESC']],  
        
      });
  
      const formattedResults = allResults.map(result => ({
        id:result.id,
        name: result.korisnici.ime + " " + result.korisnici.prezime,
        result: result.broj_tacnih_odgovora,
        date:result.datum
      }));
      
      res.status(200).json(formattedResults);
    } catch (err) {
      console.error('Error fetching all results:', err);
      res.status(500).send('Internal Server Error');
    } 
  };

  const deleteResult = async (req,res) => {
    const {id} = req.params;

    try {
      const result = await db.Rezultati.destroy({
        where: {
          id:id
        }
      });
         
      if(!result) {
        return res.status(404).json({message: 'Result not found'});
      }

      return res.status(200).json({message: 'Result deleted successfully'});
    }
       catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Server error'});
       }
  };


  module.exports = {
    getTop10Results, getAllResults, deleteResult }