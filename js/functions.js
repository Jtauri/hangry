const apiKey = ''
const url = 'https://api.foursquare.com/v3/places/search?'
const restaurants = document.querySelector('#restaurants')
const savedRestaurants = document.querySelector('#savedRestaurants')
const FAVORITES = 'favoriteRestaurants'
const form = document.querySelector('form')
let favoriteRestaurants = JSON.parse(localStorage.getItem(FAVORITES)) || []
let searchRadius = 1000



// Tämä kohta on sama kuin weather appissa
const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            document.querySelector('#lat').innerHTML = position.coords.latitude.toFixed(3) + ', '
            document.querySelector('#lon').innerHTML = position.coords.longitude.toFixed(3)
            getRestaurants(position.coords.latitude, position.coords.longitude)
        }, error => {
            alert('Error: ' + error)
        }, { 
            timeout: 10000
        })
    } else {
        alert('Geolocation is not supported by this browser.')
    }
}

document.addEventListener('DOMContentLoaded', () => {
    getLocation()
    renderFavorites()
})

form.addEventListener('submit', (event) => {
    event.preventDefault()
    updateSearchRadius()
})

const updateSearchRadius = () => {
    searchRadius = Number(document.querySelector('input').value) || 1000
    getLocation() // Käynnistää sijainnin hankinnan ja ravintolahaku uudelleen uudella etäisyydellä
}

/* 
Tätä lueskelin Foursquaren APIa opetellessa
https://location.foursquare.com/developer/reference/place-search
fetchin sijaan käytän axiosia
*/

const getRestaurants = (latitude, longitude) => {

    //rakennetaan kysely jolla haetaan ravintoloita, osoite+optioita
    const address = url +
        '&ll=' + latitude + '%2C' + longitude +
        '&categories=13000' +
        '&radius=' + searchRadius +
        '&sort=RATING'
    console.log(address)
    const request = {
        method: 'GET',
        url: address,
        headers: {
            accept: 'application/json',
            'Authorization': apiKey
        }
    }

    axios(request)
        .then(response => {
            const data = response.data

            restaurants.innerHTML = '' // Taulukko index.html:ssä tyhjennetään
            if (data.results.length > 0) {
                for (let i = 0; i < data.results.length; i++) {
                    if (i >= 5) break
                    const restaurant = data.results[i] //restaurant vs restaurants! jsonin palanen jossa ravintolan tiedot
                    const row = restaurants.insertRow(-1) // lisätään uusi rivi taulukkoon viimeiseksi (-1)
                    const name = row.insertCell(0)
                    const tallenna = row.insertCell(1)
                    //restaurant.fsq_id on foursquaressa ja tässä koodissa käytettävä id ravintoloille
                    name.innerHTML = `<a href="https://foursquare.com/v/${restaurant.fsq_id}" target="_blank">${restaurant.name}</a>`
                    tallenna.innerHTML = ` + `
                    tallenna.onclick = () => addToFavorites(restaurant)
                }
            } else {
                const row = restaurants.insertRow(-1)
                row.insertCell(0).innerHTML = 'Ei löytynyt ravintoloita.'
                row.cells[0].colSpan = 2 // kahden solun levyinen
            }
        })
        .catch(error => {
            console.error('Virhe haettaessa ravintoloita: ', error)
            const row = restaurants.insertRow(-1)
            row.insertCell(0).textContent = 'Virhe haettaessa ravintoloita.'
            row.cells[0].colSpan = 2
        })
}

const addToFavorites = (restaurant) => {
    let isFavorite = false

    //restaurant.fsq_id on foursquaressa id ravintoloille
    for (let i = 0; i < favoriteRestaurants.length; i++) {
        if (favoriteRestaurants[i].fsq_id === restaurant.fsq_id) {
            isFavorite = true
            break
        }
    }
    //jos ei ole suosikkilistalla, lisätään suoikkilistalle
    if (!isFavorite) {
        favoriteRestaurants.push(restaurant)
        localStorage.setItem(FAVORITES, JSON.stringify(favoriteRestaurants))
        renderFavorites()
    } else {
        alert(`Ravintola on jo suosikkilistallasi.`)
    }
}

const renderFavorites = () => {
    savedRestaurants.innerHTML = ''

    favoriteRestaurants.forEach((restaurant, index) => {
        const row = savedRestaurants.insertRow(-1)
        const name = row.insertCell(0)
        const linkki = row.insertCell(1)
        name.innerHTML = `<a href="https://foursquare.com/v/${restaurant.fsq_id}" target="_blank">${restaurant.name}</a>`
        linkki.innerHTML = 'X'
        linkki.onclick = () => removeFromFavorites(index)
    })
}

const removeFromFavorites = (index) => {
    favoriteRestaurants.splice(index, 1)
    localStorage.setItem(FAVORITES, JSON.stringify(favoriteRestaurants))
    renderFavorites()
}

