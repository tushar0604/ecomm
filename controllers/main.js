const path = require('path')
const products = require('../model/product')
const cart = require('../model/cart-item')

let maxItem = 2

exports.album = (req,res,next)=>{        //This is correct
    let page = req.query.page
    if (!page) {
        page=1
    }
    products.album.findAll({offset:(page-1)*maxItem, limit:maxItem})
    .then((items)=>{
        res.json(items)
    })
    .catch(err=>{
        console.log(err)
    })
}

exports.merch = (req,res,next)=>{      //This is correct
    let page = req.query.page
    if (!page) {
        page=1
    }
    products.merch.findAll({offset:(page-1)*maxItem, limit:maxItem})
    .then((items)=>{
        res.json(items)
    })
}

exports.home = (req,res,next)=>{         //This is correct
    res.sendFile(path.join(path.dirname(process.mainModule.filename),'views','Home.html'))
}

exports.store = (req,res,next)=>{       //This is correct
    res.sendFile(path.join(path.dirname(process.mainModule.filename),'views','ecommerce.html'))
}

exports.about = (req,res,next)=>{        //This is correct
    res.sendFile(path.join(path.dirname(process.mainModule.filename),'views','about.html'))
}

exports.cart = (req,res,next)=>{
    let fetchCart
    req.user.getCart()
    .then(cart =>{
        fetchCart = cart
        if (req.body.category=='album') {
            return products.album.findByPk(req.body.id)
            .then(product => {fetchCart.addAlbum(product)})
        }
        else if (req.body.category=='merchendise') {
            return products.merch.findByPk(req.user.id)
            .then(product => {fetchCart.addMerch(product)})
        }
    })
    .catch(err=>console.log(err))
    res.json({success:'done'})
}

exports.get_cart = (req,res,next)=>{
    try {
        let fetch
        req.user.getCart()
        .then(cart =>{
            fetch = cart
            return cart.getMerches()
        .then(merch =>{
            fetch.getAlbums()
            .then(albums => {
                res.json([albums,merch])
            })
        })
    })
    } catch (err) {
        console.log(err)
    }
}

exports.delete = (req,res,next)=>{
    if (req.query.cate=='album') {
        req.user.getCart()
        .then(cart => {
            cart.removeAlbum({
                where:{
                    id:req.params.id
                }
            })
            .then(res.json({success:'Done'}))
        })
    } else if (req.query.cate=='merch') {
        req.user.getCart()
        .then(cart =>{
            cart.removeMerch({
                where:{
                    id:req.params.id
                }
            })
            .then(res.json({success:'Done'}))
        })
    }
}

exports.add = async (req,res,next)=>{        //This is correct
    res.sendFile(path.join(path.dirname(process.mainModule.filename),'views','add.html'))
}

exports.add_product = (req,res,next)=>{   //This is correct
    try {
        if (req.body.section == 'Music') {
            products.album.create({
                name:req.body.name,
                price:req.body.price,
                image_url:req.body.image
            }).then(res.json({sucess:'Done'}))
        } else {
            products.merch.create({
                name:req.body.name,
                price:req.body.price,
                image_url:req.body.image
            }).then(res.json({sucess:'Done'}))
        }
    } catch (error) {
        console.log(error)
    }
}

exports.order = (req,res,next)=>{
    req.user.createOrder()
    .then(order =>{
        if (req.body.album!=[]) {
            req.body.album.forEach(id => {
                order.addAlbums(+id)
            });
        }if(req.body.merch!=[]){
            req.body.merch.forEach(id => {
                order.addMerches(+id)
            })
        }
    })
    .then(res.json({success:'Done'}))
}

exports.get_order = (req,res,next)=>{
    res.sendFile(path.join(path.dirname(process.mainModule.filename),'views','order.html'))
}

exports.order_detail = (req,res,next)=>{
    req.user.getOrders()
    .then(orders =>{
        let list = []
        for (let i = 0; i < orders.length; i++) {
            let nest_list = [orders[i].id]
            orders[i].getAlbums()
            .then(albums => {
                nest_list.push(albums)
                orders[i].getMerches()
                .then(merchs => {
                    nest_list.push(merchs)
                    if (i==(orders.length-1)){
                        res.json(list)
                    }
                })
            })
            list.push(nest_list)
        }
    })
}