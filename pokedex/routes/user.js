const db=require('../config/database')
const express=require('express')
const user = express.Router()

user.post("/", (req,res) =>{
	const name= req.body.name;
	const mail= req.body.mail;
	const pass= req.body.pass;

	const query=`INSERT INTO user (user_name, user_mail, user_password) VALUES ('${name}','${mail}','${pass}');`

	db.query(query).then(rows=> {
		res.status(201);
		res.json({code: 0});
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con ALL poke");
	});
})

module.exports=user

