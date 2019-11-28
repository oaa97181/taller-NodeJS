const db= require('../config/database.js');
const express = require('express');
const empleadorouter = express.Router(); // PRENDER XAMPP ANTES DE INICIAR JEJE // APACHE Y MYSQL

empleadorouter.post("/", (req, res) => {
	// res.status(201).json(pokedex)	
	const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const tel = req.body.tel; 
    const mail = req.body.mail; 
    const direccion = req.body.direccion;
    //console.log(req.body)
	let query= "INSERT INTO empleado (empleado_nombre, empleado_apellidos, empleado_tel, empleado_mail, empleado_direccion) ";
	query+= `VALUES ('${nombre}', '${apellidos}', '${tel}', '${mail}', '${direccion}')`;
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
