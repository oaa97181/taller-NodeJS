const db= require('../config/database.js');
const express = require('express');
const empleadorouter = express.Router(); // PRENDER XAMPP ANTES DE INICIAR JEJE // APACHE Y MYSQL

empleadorouter.post("/", (req, res) => {	
	const nombre = req.body.nombre;
    const apellidos = req.body.apellidos;
    const tel = req.body.tel; 
    const mail = req.body.mail; 
    const direccion = req.body.direccion;
	db.query(`UPDATE empleado SET empleado_nombre='${nombre}',empleado_apellidos='${apellidos}',empleado_tel='${tel}',empleado_mail='${mail}',empleado_direccion='${direccion}' WHERE  (empleado_nombre= '${nombre}' AND empleado_apellidos= '${apellidos}')`).then(rows=> {
		res.status(200);
		res.json(rows);
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con BUSCAR empleados");
	});
});

module.exports= empleadorouter;




