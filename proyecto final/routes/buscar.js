const db= require('../config/database.js');
const express = require('express');
const empleadorouter = express.Router(); // PRENDER XAMPP ANTES DE INICIAR JEJE // APACHE Y MYSQL

empleadorouter.post("/", (req, res) => {	
	const nombre = req.body.nombre;
	const apellidos = req.body.apellidos;
	db.query(`SELECT * FROM empleado WHERE (empleado_nombre= '${nombre}' AND empleado_apellidos= '${apellidos}')`).then(rows=> {
		res.status(200);
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con BUSCAR empleados");
	});
});

module.exports= empleadorouter;