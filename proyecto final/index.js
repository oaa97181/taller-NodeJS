var express = require('express');
const bodyParser = require('body-parser');
const empleado= require('./routes/empleado.js');
const user= require('./routes/user.js');
const eliminar= require('./routes/eliminar.js');
const modificar= require('./routes/modificar.js');
const buscar= require('./routes/buscar.js');
const notFoundHandler= require('./middleware/notFoundHandler.js')
const corsHandler = require('./middleware/corsHandler.js')
const auth = require('./middleware/auth.js')
const morgan=require('morgan');
var app = express();

app.use(corsHandler)
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use("/user", user);
app.use(auth); // AUTH ALWAYS GOES FIRST
app.use("/empleado", empleado);
app.use("/eliminar", eliminar);
app.use("/modificar", modificar);
app.use("/buscar", buscar);

app.use(notFoundHandler);

app.listen(3000,  () => {

  console.log('Example app listening on port 3000! Server is running!');
});
