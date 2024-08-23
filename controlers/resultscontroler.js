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

  module.exports = {
    getTop10Results
  }