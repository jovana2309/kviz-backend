module.exports = (sequelize, DataTypes) => {
const Korisnici = sequelize.define('Korisnici', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement:true,
    allowNull:false
},
email: {
    type: DataTypes.STRING(45),
    unique: true,
    allowNull:false
},
lozinka: {
    type: DataTypes.STRING(45),
    allowNull: false
},

ime: {
    type: DataTypes.STRING(45),
    allowNull: false
},

prezime: {
    type: DataTypes.STRING(45),
    allowNull: false
},

administrator: {
    type: DataTypes.INTEGER(10),
    allowNull: true
}
})
Korisnici.associate = function(models) {
    Korisnici.hasMany(models.Rezultati, {
      foreignKey: 'korisnik_id',
      as: 'rezultati'
    });
  };
    return Korisnici;
}

