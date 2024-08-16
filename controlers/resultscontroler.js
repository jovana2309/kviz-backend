const db = require ('../models/');

const getTop10Results =  async (req, res) => {
    try {
      const topResults = await db.Rezultati.findAll({
        attributes: [
          'broj_tacnih_odgovora'  
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
        ime: result.korisnici.ime,
        prezime: result.korisnici.prezime,
        rezultat: result.broj_tacnih_odgovora
      }));
  
      res.json(formattedResults);
    } catch (err) {
      console.error('Error fetching top results:', err);
      res.status(500).send('Internal Server Error');
    }
  };

  module.exports = {
    getTop10Results
  }