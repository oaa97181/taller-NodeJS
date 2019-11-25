const db=require('../config/database')
const express=require('express')
const jwt=require('jsonwebtoken')
const user = express.Router()



user.post("/login", (req,res) =>{

	const mail= req.body.mail;
	const pass= req.body.pass;

	query="SELECT * FROM user WHERE "
	query += `user_mail='${mail}' AND user_password= '${pass}';`

		db.query(query).then(rows=> {
			res.status(200)
			if (rows.length==1) {
				const token= jwt.sign({
					id:rows[0].user_id,
					mail:rows[0].user_mail
				}, "debugkey")
				res.json({code:0, message: token})
			}else {
				res.json({code:1, message: "Usuario no encontrado"})	
			}
	}).catch(err => {
		console.log(err);
		res.status(500);
		res.send("Algo salió mal con el login");
	});	

})

module.exports=user

