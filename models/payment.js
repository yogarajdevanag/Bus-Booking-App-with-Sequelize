const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Payment = sequelize.define('Payment', {
  amountPaid: DataTypes.FLOAT,
  paymentStatus: DataTypes.STRING
});

module.exports = Payment;
