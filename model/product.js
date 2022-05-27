const Sequelize = require('sequelize')
const sequelize = require("../util/database");

exports.album = sequelize.define('album',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image_url:{
        type:Sequelize.TEXT,
        allowNull:false
    }
})

exports.merch = sequelize.define('merch',{
    id:{
        type: Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    price:{
        type:Sequelize.STRING,
        allowNull:false
    },
    image_url:{
        type:Sequelize.TEXT,
        allowNull:false
    }
})
