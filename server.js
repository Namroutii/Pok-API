const express = require('express');
const path = require('path');
const axios = require('axios');
const ejs = require('ejs');

const app = express();
app.set('view engine', 'ejs');


const pokemonIds = [];// IDs of the Pokemon  
for (let i = 0; i < 3; i++) {  //To generate an array of three random numbers between 1 and 200
    const pokemonId = Math.floor(Math.random() * 200) + 1;
    pokemonIds.push(pokemonId);
}


app.get('^/$|/home', async (req, res) => {
    const data = [];
    for (let i = 0; i < pokemonIds.length; i++) {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonIds[i]}`);
        data.push(response.data);
    }

    res.render('index', { data });
});

app.get('/*', async (req, res) => {
    res.status(404).send('<img src="./404-error.jpg" alt="404-error"></img>')
})

app.listen(6543, () => {
    console.log('Server started on port 6543');
    console.log('http://localhost:6543');
});