module.exports = (sequelize, DataTypes) => {
    const Pitanja = sequelize.define('Pitanja', { 

id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
},
 pitanje: {
    type: DataTypes.TEXT,
    allowNull: false
 },
 odgovor1: {
    type: DataTypes.STRING(45),
    allowNull: false
 },
 odgovor2: {
    type: DataTypes.STRING(45),
    allowNull: false
 },
odgovor3: {
    type: DataTypes.STRING(45),
    allowNull: false
},
odgovor4: {
    type: DataTypes.STRING(45),
    allowNull: false
},
tacan_odgovor: {
    type: DataTypes.INTEGER,
    allowNull: false
}
    } )
return Pitanja;
}

