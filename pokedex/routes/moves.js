const db= require('../config/database.js');
const express = require('express');
const pokerouter = express.Router(); // PRENDER XAMPP ANTES DE INICIAR JEJE // APACHE Y MYSQL


//Create = INSERT INTO...
//Read = SELECT * FROM...
//Update = UPDATE column = value
//Delete = DELETE from.... 


pokerouter.get("/", (req, res) => {
	// res.status(201).json(pokedex)	
	db.query("SELECT * FROM moves").then(rows=> {
		res.status(200);
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con ALL moves");
	});
});

pokerouter.post("/", (req, res) => { //POSTMAN BODY
	// res.status(201).json(pokedex)	
	let query= "INSERT into moves (move_name, type_id, move_power, move_pp, move_accuracy) ";
	query+= `VALUES ('${req.body.move_name}', ${req.body.type_id}, ${req.body.move_power}, ${req.body.move_pp}, ${req.body.move_accuracy})`;
	db.query(query).then(rows=> {
		if(rows.affectedRows>0){
			res.status(201);
			res.send("MOVIMIENTO AÑADIDO EXITOSAMENTE")
		}
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("algo falló mientras se agregaba a la BD");
	});
});

pokerouter.delete("/:id([0-9]{1,3})",(req,res) => {
	query=`DELETE FROM moves WHERE move_id=${req.params.id}`;
	db.query(query).then(rows =>{
		res.status(200);
		console.log(rows);
		res.send("MOVE eliminado correctamente");
	}).catch(err=>{
		console.log(err);
		res.status(500);
		res.send("Ocurrió algo mal");
	});
});


pokerouter.put("/:id([0-9]{1,3})", (req,res)=> {
	const columns= Object.keys(req.body)
	const values= Object.values(req.body)
	query= "UPDATE moves SET ";
	for (let i = 0; i<columns.length; i++) {
		// condicion ? verdadero : falso
		query+=  `${columns[i]} =`
		query+= isNaN(values[i]) ? `'${values[i]}'` : `${values[i]}`
		query+= (i+1<columns.length) ? ", " : " "
	}
	query+=` WHERE move_id = ${req.params.id}`
	//res.send(query) //MUESTRA EL QUERY
		db.query(query).then(rows =>{
		res.status(200);
		console.log(rows);
		res.send("MOVE UPDATED");
	}).catch(err=>{
		console.log(err);
		res.status(500);
		res.send("Ocurrió algo mal");
	});
})






module.exports= pokerouter;