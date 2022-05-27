const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const order_item = sequelize.define('order-items',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    }
})

module.exports = order_item