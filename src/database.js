const mongoose = require('mongoose');
/*
Mongose es un modulo de conexion a una base de datos mongo db, NO es la
base de datos en si, simplemente me permite realizar la conexión a la
misma. Es parecido a aplication properties en spring
*/

mongoose.connect('mongodb://localhost/tt-db-app'/*, {
    useCreateIndex: true, 
    useNewUrlParser: true,
    useFindAndModify: false
}*/)
.then(console.log("DB is connected"))
.catch(err => console.error(err));
/**
 Aqui colocamos a que base de datos va a conectarse. 
 */