const db= require('../config/database.js');
const express = require('express');
const empleadorouter = express.Router(); // PRENDER XAMPP ANTES DE INICIAR JEJE // APACHE Y MYSQL

empleadorouter.post("/", (req, res) => {
	// res.status(201).json(pokedex)	
	const nombre = req.body.nombre;
    //console.log(req.body)
	let query= "DELETE FROM empleado ";
	query+= `WHERE empleado_nombre= '${nombre}'`;
	db.query(query).then(rows=> {
		res.status(201);
		res.json({code: 0});
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con INSERT empleado");
	});
});

module.exports= empleadorouter;