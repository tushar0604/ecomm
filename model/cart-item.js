const sequelize = require("../util/database");
const Sequelize = require('sequelize')

const cart_item = sequelize.define('cart-item',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    // name:{
    //     type:Sequelize.STRING,
    //     allowNull:false
    // },
    // price:{
    //     type:Sequelize.STRING,
    //     allowNull:false
    // },
    // image_url:{
    //     type:Sequelize.TEXT,
    //     allowNull:false
    // }
})

module.exports = cart_item