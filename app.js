const express = require('express')
const app = express()
const store = require('./router/store')
const path = require('path')
const bodyparser = require('body-parser')
const cors = require('cors')
const dotenv = require('dotenv');
dotenv.config();

const sequelize = require('./util/database')
const Cart_item = require('./model/cart-item')
const Product = require('./model/product')
const album = Product.album
const merch = Product.merch
const cart = require('./model/cart')
const User = require('./model/user')
const Order = require('./model/order')
const Order_item = require('./model/order-item')

app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err=>{
        console.log(err)
    })
})

app.use(store);

/*association*/
    User.hasOne(cart)
    cart.belongsTo(User)

    album.belongsToMany(cart,{through:Cart_item})
    merch.belongsToMany(cart,{through:Cart_item})
    cart.belongsToMany(album,{through:Cart_item})    
    cart.belongsToMany(merch,{through:Cart_item}) 

    User.hasMany(Order)
    Order.belongsTo(User)

    Order.belongsToMany(album,{through:Order_item})  
    Order.belongsToMany(merch,{through:Order_item}) 


sequelize
    .sync()
    .then(result=>{
        return User.findByPk(1)
    })
    .then(user =>{
        if(!user){
            return User.create({name:'Tushar',email:'tushar363@gmail.com'})
        }
        return user
    })
    .then(user =>{
        return user.createCart();
    })
    .then(cart =>{
        app.listen(3000)
    })
    .catch(err=>{
        console.log(err)
    })

