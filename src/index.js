const express = require('express');
const app = express();
const path = require('path');

app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(require('./routes/index'));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), ()=>{
    console.log("Estoy funcionando en el puerto 3000");
})