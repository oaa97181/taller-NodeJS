
var express = require('express');
var app = express();
const pokedex = require('./pokedex.json');

app.get('/', (req, res) => {
	console.log(pokedex.pokemon[].name)
  res.send('Bienvenido al pokedex de OAA!');
});
app.get('/pokemon', (req, res) => {
  res.send(pokemon.pokemon);
});

app.listen(3000,  () => {
  console.log('Example app listening on port 3000!');
});
