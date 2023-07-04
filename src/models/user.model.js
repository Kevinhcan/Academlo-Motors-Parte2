const { DataTypes } = require('sequelize');
const { db } = require('../database/config');
const bcrypt = require('bcryptjs');

// Datos requeridos para ingresar un usuario
const User = db.define(
  'User',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('client', 'employee'),
      defaultValue: 'client',
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('available', 'disabled'),
      allowNull: false,
      defaultValue: 'available',
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        const secretPassword = await bcrypt.hash(user.password, salt);
        user.password = secretPassword;
      },
    },
  }
);

module.exports = User;
