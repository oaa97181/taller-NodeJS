const db= require('../config/database.js');
const express = require('express');
const empleadorouter = express.Router(); // PRENDER XAMPP ANTES DE INICIAR JEJE // APACHE Y MYSQL

empleadorouter.get("/", (req, res) => {
	// res.status(201).json(pokedex)	
	db.query("SELECT * FROM empleado").then(rows=> {
		res.status(200);
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con ALL empleados");
	});
});

module.exports= empleadorouter;