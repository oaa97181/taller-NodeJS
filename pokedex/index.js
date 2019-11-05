var express = require('express');
const bodyParser = require('body-parser');
const pokemon= require('./routes/pokemon.js');
const moves= require('./routes/moves.js');
const user= require('./routes/user.js');
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
app.use("/pokemon", pokemon);
app.use("/moves", moves);
app.use(notFoundHandler);

app.listen(3000,  () => {

  console.log('Example app listening on port 3000! Server is running!');
});
