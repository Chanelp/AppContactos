const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

//AQUÍ CREA EL ENGINE

app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
}).engine);

//AQUÍ UTILIZA EL ENGINE
app.set('view engine', '.hbs');

app.use(morgan('dev'));

//Las siguientes dos líneas de código lo que hacen es que cuando envias datos a través de un método post es decir un (req.body)
// el va a poder entenderlo

app.use(express.json())
app.use(express.urlencoded({extended:false}));



app.use(require('./routes/index'));

//Esta línea lo que hace es decirle que esta carpeta public podrá ser accedida desde el navegador
app.use('/public', express.static(path.join(__dirname, 'public')));

module.exports = app;