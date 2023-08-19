// Creo una funzione per prendere le info dei libri dal server

window.onload = () => {
    fetch('https://striveschool-api.herokuapp.com/books')
        .then((response) => response.json())
        .then((data) => {
            const cardContainer = document.querySelector('main')
            const inputText = document.querySelector('input').value
            let count = 0
            cardContainer.innerHTML = data.map((book) => {
                
                    return `<div class="col-3">
                <div id='${count}' class="card style="height: 18rem;">
                    <img src="${book.img}" class="card-img-top img-fluid">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.price + '€'}</p>
                        <button onClick='addToCart(event)' type="button" class="btn btn-primary addToCart">+</button>
                        <button onClick='deleteBook(event)' type="button" class="btn btn-danger">-</button>
                        <span class="card-text">${book.asin}</span>
                        <p class="card-text"><a href="./details.html?q=${book.asin}">View details</a></p>
                    </div>
                </div>
            </div>`
                
            })
                .join("")
        })
        .catch((err) => console.log('errore', err))
}

const search = document.getElementById('searchBook')
search.addEventListener('click', getBooks)


function getBooks() {
    fetch('https://striveschool-api.herokuapp.com/books')
        .then((response) => response.json())
        .then((data) => {
            const cardContainer = document.querySelector('main')
            const inputText = document.querySelector('input').value
            let count = 0
            cardContainer.innerHTML = data.map((book) => {
                if (inputText.split('').length < 3) {
                    console.log('Scrivi almeno 3 caratteri')
                }
                else if (book.title.toLowerCase().includes(inputText.toLowerCase())) {
                    count ++
                    return `<div class="col-3">
                <div id='${count}' class="card style="height: 18rem;">
                    <img src="${book.img}" class="card-img-top img-fluid">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.price + '€'}</p>
                        <button onClick='addToCart(event)' type="button" class="btn btn-primary addToCart">+</button>
                        <button onClick='deleteBook(event)' type="button" class="btn btn-danger">-</button>
                        <span class="card-text">${book.asin}</span>
                        <p class="card-text"><a href="./details.html?q=${book.asin}">View details</a></p>
                    </div>
                </div>
            </div>`
                }
            })
                .join("")
        })
        .catch((err) => console.log('errore', err))
}

// Creo la funzione per aggiungere un libro al carrello

const addToCart = (e) => {
    e.target.parentElement.classList.add('bg-success')
    console.log(e.target.parentElement.childNodes[1].innerHTML)
    const carrello = document.getElementById('carrello')
    carrello.innerHTML +=`<div class='border border-primary'>
        <div>${e.target.parentElement.childNodes[1].innerHTML}</div>
        <div>${e.target.parentElement.childNodes[3].innerHTML}</div>
        </div>`
}

// Creo la funzione per svuotare il carrello

function svuotaCart(){
    const carrello = document.getElementById('carrello')
    carrello.innerHTML = ''
    const card = document.getElementsByClassName('card-body')
    for(let i = 0; i < card.length; i++){
        card[i].classList.remove('bg-success')
    }
}

// Creo la funzione per saltare un prodotto

function deleteBook(e){
    console.log(e.target.parentElement.parentElement.parentElement.classList.add('d-none'))
}


