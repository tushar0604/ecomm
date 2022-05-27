const open = document.getElementById('open')
const close = document.getElementById('close')
const container = document.getElementById('container')
const top_cart = document.getElementById('cart')
const order = document.getElementById('order-now')

top_cart.addEventListener('click',()=>{
    container.classList.add('active')
})

open.addEventListener('click', ()=>{
    container.classList.add('active')
})

close.addEventListener('click', ()=>{
    container.classList.remove('active')
})

// order
order.addEventListener('click', async(e)=>{
    let obj = {
        album: [],
        merch: []
    }
    let items = document.getElementsByClassName('quantity')
    for (let i = 0; i < items.length; i++) {
        const detail = items[i].getElementsByTagName('button')[0]
        const id = detail.id
        const category = detail.className
        if (category=='album'){
            obj.album.push(id)
        }else if (category=='merchendise'){
            obj.merch.push(id)
        }
    }
    await axios.post('http://localhost:3000/order',obj)
})

