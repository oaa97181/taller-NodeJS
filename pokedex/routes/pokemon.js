const pokedex = require('../pokedex.json');
const db= require('../config/database.js');
const express = require('express');
const pokerouter = express.Router();

pokerouter.get("/", (req, res) => {
	// res.status(201).json(pokedex)	
	db.query("SELECT * FROM pokemon").then(rows=> {
		res.status(200);
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("ALgo salió mal");
	});
});


pokerouter.get('/random', (req, res) => {
  const randpoke=Math.floor((Math.random() * 151) + 1);
  console.log(randpoke)
  if (randpoke > 0 && randpoke <= 151){
  	res.json(pokedex.pokemon[randpoke-1]);
  }else{
  	res.send("No hay ningun pokemon con ese ID");
  }
});

pokerouter.get('/:id([0-9]{1,3})', (req, res) => {
  const id = req.params.id;
  if (id > 0 && id <= 151){
  	res.json(pokedex.pokemon[id-1]);
  }else{
  	res.send("No hay ningun pokemon con ese ID");
  }
});

pokerouter.get('/:name([A-Za-z]+)', (req, res) => { // tambien se puede hacer con regex
	  const pokename = req.params.name;
	  console.log(pokename);
	  const pokenamefinal = pokedex.pokemon.filter((pokemon) => pokemon.name==pokename);
  	   res.json(pokenamefinal);
});
pokerouter.get("/:id/img", (req, res) => {
  const img = pokedex.pokemon[req.params.id-1].img;
  res.send("<img src='"+img+"'>");
});



pokerouter.post("/", (req, res) => {
	res.json(req.body.x)
});


module.exports= pokerouter;