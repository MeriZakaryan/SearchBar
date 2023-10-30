const goods = {}
let searchName = [], types = []
let inp = document.querySelector('#search-input')


class Items {
    constructor(name, price, pic, condition){
        this.name = name
        this.price = price
        this.pic = pic
        this.condition = condition
    }
}

goods['001'] = new Items('Strawberry', '20$', 'https://cdn2.iconfinder.com/data/icons/fruits-45/680/strawberry-256.png', 'available')
goods['002'] = new Items('Banana', '15$', 'https://cdn2.iconfinder.com/data/icons/fruits-45/680/banana-512.png', 'available')
goods['003'] = new Items('Grape', '60$', 'https://cdn2.iconfinder.com/data/icons/fruits-45/680/grape-512.png', 'available')
goods['004'] = new Items('Pitch', '25$', 'https://cdn2.iconfinder.com/data/icons/fruits-45/680/peach-256.png', 'available')
goods['005'] = new Items('Cherry', '20$', 'https://cdn2.iconfinder.com/data/icons/fruits-45/680/guinda-256.png', 'available')
goods['006'] = new Items('Coca Cola', '10$', 'https://cdn0.iconfinder.com/data/icons/beverage-element-pack-1/512/can-packaging-04c-256.png', 'available')
goods['007'] = new Items('Coffee', '5$', 'https://cdn1.iconfinder.com/data/icons/drink-beverage/512/11-coffee-espresso-cafe-mug-512.png', 'available')

goods['006'].type = ['Zero', 'Classic', 'Lime']
goods['007'].type = ['Arabica', 'Robusta', 'Brazil']

function render() {
    for(let id in goods){
        let div = document.createElement('div')
        div.classList.add('item-card')
        let item = goods[id]
        div.innerHTML = `
            <img src='${item.pic}'>
            <div class='info-bar'>
                <h2>${item.name}</h2>
                <p><em>Price:</em> ${item.price}</p>
                <p><em>Condition:</em>  ${item.condition}</p>
            </div>
        `
        document.querySelector('main').appendChild(div)
        if(item.type){
            let currentCard = Array.from(document.querySelectorAll('.item-card'))
            let card = currentCard.filter(el => el.children[1].firstElementChild.textContent === item.name)
            card[0].children[1].innerHTML += `<p  class="types"><em>Types: </em></p>` 
            for(let el of item.type){
                card[0].children[1].lastElementChild.innerHTML += `${el}\n`
                types.push(el)
            }
        }
    }   
}
render()

function searchProduct(){
    for(let id in goods){
        searchName.push(goods[id].name)
        if(goods[id].type){
            for(let name in goods[id].type)
            searchName.push(`${goods[id].name} ${goods[id].type[name]}`)
        }
    }

    for(let el of searchName){
        let p = document.createElement('p')
        p.innerText = el
        document.querySelector('#suggestions').appendChild(p)
        types.push(el)
    }

    inp.addEventListener('focus', function func(event){
        event.target.style.outline = 'none'
        event.target.style.boxShadow = 'none'
        event.target.nextElementSibling.style.display = 'flex'
        event.target.nextElementSibling.style.position = 'absolute'

        if(inp.value !== '')inp.value = '';
    })

    let searchItems = document.querySelectorAll('#suggestions p')
    inp.addEventListener('input', function(event){
        let val = event.target.value.trim().toLowerCase()
        if(val !== ''){
            searchItems.forEach(el => {
                el.innerText.toLowerCase().search(val) === -1 ? el.classList.add('hide') : el.classList.remove('hide')
            })
        }
    })

    let cards = document.querySelectorAll('.item-card')
    for(let p of searchItems){
        p.onclick = function(){
            inp.value = p.textContent
            for(let card of cards){
                card.classList.add('hide')
                if(p.innerText.includes(card.children[1].firstElementChild.innerText)){
                    card.classList.remove('hide')
                }
            }
        document.querySelector('#suggestions').style.display = 'none'
        }
    }    
}

searchProduct()

let doc = document.querySelector('main')
doc.addEventListener('click', function(event){
    document.querySelector('#search-input').style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
    document.querySelector('#suggestions').style.display = 'none'
})

let btn = document.querySelector('#btn')

btn.addEventListener('click', function(){
    document.querySelector('#search-input').style.boxShadow = 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px'
    document.querySelector('#suggestions').style.display = 'none'
    let cards = document.querySelectorAll('.item-card')
    cards = Array.from(cards)

    cards.forEach(el=>{
        let checker = cards.filter(el =>{ 
            let cardName = el.children[1].firstElementChild.innerText
            if(cardName.toLowerCase().includes(inp.value.toLowerCase()) || cardName.includes(typeSearch()))return el
        })

        el.classList.add('hide')
        !checker.length ? document.querySelector('#error').style.display = 'flex' : checker[0].classList.remove('hide')
    })

})

function typeSearch(){
    let item = []
    if(inp.value){
        let checker = types.filter(el => el.toLowerCase().includes(inp.value.toLowerCase()))
        if(checker.length){
            for(let id in goods){
                if(goods[id].type)item.push(goods[id])
            }
        }
        item = item.filter(el => el.type.includes(checker[0].split(' ')[checker[0].split(' ').length - 1]))
    }

    if(item.length)return item[0].name
}
