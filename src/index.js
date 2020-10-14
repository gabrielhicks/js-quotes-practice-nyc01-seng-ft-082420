QUOTE_URL = "http://localhost:3000/quotes?_embed=likes"
FETCH_URL = "http://localhost:3000/quotes/"
document.addEventListener("DOMContentLoaded", () => {
    fetchQuotes()
    submitHandler()
    clickHandler()
})

function fetchQuotes() {
    fetch(QUOTE_URL)
    .then(response => response.json())
    .then(quotes => renderQuotes(quotes))
}

function renderQuotes(quotes) {
    for(quote of quotes) {
        renderQuote(quote)
    }
}

function renderQuote(quote) {
    const quoteLikes = quotesNum(quote)
    const quoteList = document.querySelector("#quote-list")
    const quoteLi = document.createElement("li")
    quoteLi.classList.add("quote-card")
    quoteLi.innerHTML = `
    <blockquote class="blockquote" id="${quote.id}">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class="btn-success">Likes: <span>${quoteLikes}</span></button>
        <button class="btn-danger">Delete</button>
    </blockquote>
    `
    quoteList.append(quoteLi)
}

function submitHandler() {
    document.addEventListener("submit", e => {
        e.preventDefault()
        let quote = e.target[0].value
        let author = e.target[1].value
        createQuote(quote, author)
    })  
}

function clickHandler() {
    document.addEventListener("click", e => {
        if(e.target.matches("button.btn-danger")) {
            const target = e.target.parentElement.parentElement
            // deleteQuote(e.target.parentElement)
            const id = e.target.parentElement.id //id
            

            deleteQuote(id, target)
        }
    })
}

function quotesNum(quote){
    if (quote.likes == undefined) {
        let quoteLikes = 0
        return quoteLikes
    } else {
        let quoteLikes = quote.likes.length
        return quoteLikes
    }
}

function createQuote(quote, author) {
    const options = {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'quote': quote,
            'author': author
        })
    }

    return fetch(QUOTE_URL, options)
    .then(res => res.json())
    .then(quote => renderQuote(quote))
}

function deleteQuote(id, event) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    }
    return fetch(FETCH_URL + id, options)
    .then(response => response.json())
    .then(quote => {
        event.remove()
    })
}