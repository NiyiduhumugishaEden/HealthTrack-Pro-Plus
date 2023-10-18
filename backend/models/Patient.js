const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite', // SQLite database file
});

const Patient = sequelize.define('Patient', {
  patientName: DataTypes.STRING,
  heartbeat: DataTypes.INTEGER,
  temperature: DataTypes.FLOAT, // Corrected to FLOAT
  frequent_sickness: DataTypes.STRING,
});

module.exports = Patient;

