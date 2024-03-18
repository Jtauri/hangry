# Lähimmät Ruokapaikat

Tämä web-sovellus hakee ja näyttää viisi lähintä ruokapaikkaa käyttäjän nykyisen sijainnin perusteella käyttäen Foursquaren API:a.

## Ominaisuudet

- Hakee käyttäjän nykyisen sijainnin.
- Näyttää viisi lähintä ruokapaikkaa Foursquaren API:n avulla.
- Mahdollistaa ruokapaikkojen tallentamisen suosikkeihin.
- Tallentaa suosikit selaimen localStorageen.
- Antaa mahdollisuuden määrittää hakuetäisyyden.

## Käyttöohjeet

1. Avaa sovellus selaimessasi.
2. Salli selaimen pyytämä sijaintitieto.
3. Sovellus hakee automaattisesti viisi lähintä ruokapaikkaa sijaintisi perusteella.
4. Voit muuttaa hakuetäisyyttä antamalla uuden arvon metriä-kenttään ja painamalla "Päivitä haku".
5. Klikkaa tähteä (*) lisätäksesi ravintolan suosikkeihisi.
6. Suosikit näkyvät sivun alaosassa, ja ne voi poistaa klikkaamalla ruksia (X).

## Asennus

Lisää API-avain ./js/functions tiedostoon ja avaa `index.html` tiedosto selaimessasi. 

## Teknologiat

- HTML/CSS
- JavaScript
- Axios.js
- [Foursquare Places API](https://location.foursquare.com/developer/reference/place-search) 