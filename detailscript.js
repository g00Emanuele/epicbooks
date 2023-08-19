const params = new URLSearchParams(window.location.search)
const query = params.get('q')
console.log(query)


window.onload = () => {
    
    fetch(`https://striveschool-api.herokuapp.com/books/${query}`)
        .then((response) => response.json())
        .then((book) => {
            const cardContainer = document.querySelector('main')
            cardContainer.innerHTML =
                
                    `<div class="col-3">
                <div class="card style="height: 18rem;">
                    <img src="${book.img}" class="card-img-top img-fluid">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <p class="card-text">${book.price + '€'}</p>
                        <span class="card-text">${book.asin}</span>
                    </div>
                </div>
            </div>`
        })
        .catch((err) => console.log('errore', err))
}


