module.exports = (sequelize, DataTypes) => {
    const Rezultati = sequelize.define('Rezultati', {
    id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    korisnik_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
     
    broj_tacnih_odgovora:{
        type: DataTypes.INTEGER,
        allowNull: false
    },

    datum: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
    }
    )
    Rezultati.associate = function(models) {
        
        Rezultati.belongsTo(models.Korisnici, {
          foreignKey: 'korisnik_id',
          as: 'korisnici'
        });
 }
 return Rezultati;
}
