const pokedex = require('../pokedex.json');
const db= require('../config/database.js');
const express = require('express');
const pokerouter = express.Router(); // PRENDER XAMPP ANTES DE INICIAR JEJE // APACHE Y MYSQL

pokerouter.get("/", (req, res) => {
	// res.status(201).json(pokedex)	
	db.query("SELECT * FROM pokemon").then(rows=> {
		res.status(200);
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con ALL poke");
	});
});

pokerouter.post("/", (req, res) => {
	// res.status(201).json(pokedex)	
	let query= "INSERT into pokemon (pok_name, pok_height, pok_weight, pok_base_experience) ";
	query+= `VALUES ('${req.body.pok_name}', ${req.body.pok_height}, ${req.body.pok_weight}, ${req.body.pok_base_experience})`;
	db.query(query).then(rows=> {
		if(rows.affectedRows>0){
			res.status(201);
			res.send("POKEMON AÑADIDO CON EXITO A BD")
		}
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("algo falló mientras se agregaba a la BD");
	});
});

pokerouter.delete("/:id([0-9]{1,3})",(req,res) => {
	query=`DELETE FROM pokemon WHERE pok_id=${req.params.id}`;
	db.query(query).then(rows =>{
		res.status(200);
		console.log(rows);
		res.send("Pokemon eliminado correctamente");
	}).catch(err=>{
		console.log(err);
		res.status(500);
		res.send("Ocurrió algo mal");
	});
});


pokerouter.put("/:id([0-9]{1,3})", (req,res)=> {
	const columns= Object.keys(req.body)
	const values= Object.values(req.body)
	query= "UPDATE pokemon SET ";
	for (let i = 0; i<columns.length; i++) {
		// condicion ? verdadero : falso
		query+=  `${columns[i]} =`
		query+= isNaN(values[i]) ? `'${values[i]}'` : `${values[i]}`
		query+= (i+1<columns.length) ? ", " : " "
	}
	query+=` WHERE pok_id = ${req.params.id}`
	res.send(query)
})



pokerouter.get('/random', (req, res) => {
  const randpoke=Math.floor((Math.random() * 722) + 1);

  db.query("SELECT * FROM pokemon WHERE pok_id="+randpoke).then(rows  => {
  	res.status(400);
  	res.json(rows);
  }).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con random poke");
  });
});



pokerouter.get('/:id([0-9]{1,3})', (req, res) => {
	const id = req.params.id;
	const query= `SELECT * FROM pokemon WHERE pok_id='${id}'`;
		db.query(query).then(rows=> {
			if (rows.length>0){
				res.status(200);
				res.json(rows);
			}
			res.status(404);
			res.send("id no encontrado")
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con ALL poke");
	});
});



pokerouter.get('/:name([A-Za-z]+)', (req, res) => { // tambien se puede hacer con regex
		const pokename = req.params.name;
		const query= `SELECT * FROM pokemon WHERE pok_name='${pokename}'`;
		db.query(query).then(rows=> {
		res.status(200);
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con pokename");
	});

});



pokerouter.get("/:id/img", (req, res) => {
  const img = pokedex.pokemon[req.params.id-1].img;
  res.send("<img src='"+img+"'>");
});



pokerouter.post("/", (req, res) => {
	res.json(req.body.x)
});


module.exports= pokerouter;