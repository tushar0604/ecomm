const pop = document.getElementsByClassName('heading')[0]
const message = document.getElementById('message')
const pages1 = document.getElementsByClassName('a')
const pages2 = document.getElementsByClassName('m')

window.addEventListener('load', async ()=>{
    await axios.get('http://localhost:3000/store/album')
    .then(albums=>{
        add(albums.data,'album')
    })
    await axios.get('http://localhost:3000/store/merch')
    .then(merchs =>{
        add(merchs.data,'merchendise')
    })
    await axios.get('http://localhost:3000/get-cart')
    .then(product =>{
        console.log(product)
        product.data[0].forEach(album=>{
            added(album.name,album.image_url,album.price,album.id,'album')
        })
        product.data[1].forEach(merch =>{
            added(merch.name,merch.image_url,merch.price,merch.id,'merchendise')
        })
    })
})

for (var i = 0; i < pages1.length; i++) {
    pages1[i].addEventListener('click', async (e)=>{
        const no = e.target.innerText
        let albums = await axios.get(`http://localhost:3000/store/album?page=${no}`)
        // console.log(albums.data)
        add(albums.data,'album') 
    });
}

for (var i = 0; i < pages2.length; i++) {
    pages2[i].addEventListener('click', async (e)=>{
        const no = e.target.innerText
        let merches = await axios.get(`http://localhost:3000/store/merch?page=${no}`)
        add(merches.data,'merchendise') 
    });
}

async function add(items,category){   
    let elementName
    if (category=='album') {
        let music = document.querySelectorAll('.album')
        if (music) {
            music.forEach(e => e.remove());    
        }
        elementName = 'music'        
    }

    if (category=='merchendise') {
        let merchendise = document.querySelectorAll('.merchendise')
        if (merchendise) {
            merchendise.forEach(e => e.remove());    
        }
        elementName = 'merch'
    }

    items.forEach((item) => {
        const section = document.getElementsByClassName(elementName)[0]
        let div1 = document.createElement('div')
        div1.classList.add('list',category)
        /*add album & image*/
        let div1_child1 = document.createElement('div')
        div1_child1.classList.add('product')
        div1_child1.innerHTML = item.name
        let image = document.createElement('img')
        image.src = item.image_url
        div1.appendChild(div1_child1)
        div1.appendChild(image)
        
        /*add detail*/
        let div1_child3 = document.createElement('div')
        div1_child3.classList.add('detail',item.id)
        let div1_child3_ch1 = document.createElement('div')
        div1_child3_ch1.innerHTML = '₹'+ String(item.price)
        div1_child3.appendChild(div1_child3_ch1)

        let div1_child3_ch2 = document.createElement('button')
        div1_child3_ch2.classList.add('add-to-cart-'+category)
        div1_child3_ch2.innerHTML = 'Add to Cart'
    
        div1_child3.appendChild(div1_child3_ch2)
        div1.appendChild(div1_child3)

        section.appendChild(div1)
    });

    /*add eventlistener to cart*/
    let cart = document.getElementsByClassName('add-to-cart-'+category)
    
    for (let i = 0; i < cart.length; i++) {
        cart[i].addEventListener('click', get_add);
        cart[i].addEventListener('click', notification);
    }
    
    function notification(){
        const div = document.createElement('div')
        div.classList.add('toast');
        div.innerText = 'Added to cart'
        message.appendChild(div)
    
        setTimeout(() => {
            div.remove()
        }, 3000);
    }

    async function get_add(e){
        let amount = e.target.previousElementSibling.innerText;
        let parent = e.target.parentElement.parentElement
        let par = parent.children
        let category = parent.className.split(" ")[1]
        let name = par[0].innerText
        let image = par[1].cloneNode(true)
        let source = image.getAttribute('src')
        let id = e.target.parentElement.className.split(" ")[1];
        let obj = {
            id:id,
            category:category
        }
        await axios.post('http://localhost:3000/add-to-cart',obj)
        added(name,source,amount,id,category)
    } 
}



let added = (nam,ima,amo,id,cate)=>{
    /*item column*/
    let div1_child1 = document.createElement('div')
    div1_child1.classList.add('item')
    let div1_child1_1 = document.createElement('div')
    div1_child1_1.innerHTML = nam
    let image = document.createElement('img')
    image.src = ima
    div1_child1.appendChild(image)
    div1_child1.appendChild(div1_child1_1)
    pop.appendChild(div1_child1)

    /* price */
    let div1_child2 = document.createElement('div')
    div1_child2.innerHTML = amo
    pop.appendChild(div1_child2)

    /* quantity column*/
    let child_div3 = document.createElement('div')
    child_div3.classList.add('quantity')
    let child_div3_child1 = document.createElement('input')
    child_div3_child1.value = '1'
    let child_div3_child2 = document.createElement('button')
    id=String(id)
    child_div3_child2.setAttribute('id',id)
    child_div3_child2.setAttribute('class',cate)
    child_div3_child2.innerHTML = 'Remove'
    child_div3.appendChild(child_div3_child1)
    child_div3.appendChild(child_div3_child2)

    pop.appendChild(child_div3)

    /*event listner of remove button*/
    child_div3_child2.addEventListener('click', remove)
}

async function remove(e){
    let id = e.target.id
    let group = e.target.className
    // await axios.delete('http://localhost:3000/delete/'+id+'?cate='+group)
    e.target.parentElement.previousElementSibling.remove()
    e.target.parentElement.previousElementSibling.remove()
    e.target.parentElement.remove()
}