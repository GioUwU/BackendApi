const { Sequelize, DataTypes } = require('sequelize'); 

module.exports = (sequelize) => {
 sequelize.define('temperamento', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
  }
 }, { timestamps: false });
}