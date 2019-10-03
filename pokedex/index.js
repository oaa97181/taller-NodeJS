var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const pokedex = require('./pokedex.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => {

  res.send('Bienvenido al pokedex de OAA! \n por favor introduce una ruta GET válida');
});
app.get("/pokemon", (req, res) => {

	res.status(201).json(pokedex)	
});
app.get('/pokemon/random', (req, res) => {
  const randpoke=Math.floor((Math.random() * 151) + 1);
  console.log(randpoke)
  if (randpoke > 0 && randpoke <= 151){
  	res.json(pokedex.pokemon[randpoke-1]);
  }else{
  	res.send("No hay ningun pokemon con ese ID");
  }
});
app.get('/pokemon/:id([0-9]{1,3})', (req, res) => {
  const id = req.params.id;
  if (id > 0 && id <= 151){
  	res.json(pokedex.pokemon[id-1]);
  }else{
  	res.send("No hay ningun pokemon con ese ID");
  }
});
app.get('/pokemon/:name([A-Za-z]+)', (req, res) => { // tambien se puede hacer con regex
	  const pokename = req.params.name;
	  console.log(pokename);
	  const pokenamefinal = pokedex.pokemon.filter((pokemon) => pokemon.name==pokename);
  	   res.json(pokenamefinal);
});
app.get("/pokemon/:id/img", (req, res) => {
  const img = pokedex.pokemon[req.params.id-1].img;
  res.send("<img src='"+img+"'>");
});



app.post("/pokemon", (req, res) => {
	res.json(req.body.x)
});

app.use((req, res) => {
	res.status(404)
	res.json({"404":'No existe la página'});
});




app.listen(3000,  () => {

  console.log('Example app listening on port 3000!');
});



