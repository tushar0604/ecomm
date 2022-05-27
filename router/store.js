const express = require('express')
const route = express.Router()
const main = require('../controllers/main')

route.get('/store',main.store)

route.get('/home',main.home)

route.get('/about',main.about)

route.get('/store/album',main.album)
route.get('/store/merch',main.merch)

route.get('/get-cart',main.get_cart)

route.post('/add-to-cart',main.cart)
route.delete('/delete/:id',main.delete)

route.get('/add',main.add)   ///To add products (merch & album into database)
route.post('/add-product',main.add_product)

route.post('/order',main.order)
route.get('/order',main.get_order)
route.get('/get-order',main.order_detail)

module.exports = route