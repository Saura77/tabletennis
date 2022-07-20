const express = require('express');
const path = require('path'); //Modulo para gestionar los directorios
const exphdbs = require('express-handlebars'); //Motor de plantilla que utilizaré
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
/*
handlebars es el motor de plantilla a utilizar. override es un hack para
que me permita realizar operaciones put y delete desde los formularios,
no solo post y get. Session es para crear una session temporal con los
datos del usuario logeado, y que basicamente no tenga que autentificarse 
cada vez que realiza una accion
*/ 

//Initialazing
const app = express();
require('./database'); //Inicializamos base de datos
require('./config/passport');

//Settings
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
/*
_dirname(constante de node) obtiene el nombre del directorio en el que 
esta alojado el proyecto, y a partir del metodo join del modulo path, 
podemos concatenar ese directorio con la carpeta views. Esto es paqa 
indicarle al proyecto donde van a estar ubicadas nuestras vistas
*/
/*
Aqui configuramos el motor de plantillas a utilizar(express-handlebars en
este caso). Hay que realizar un objeto configuracion inicial para trabajar
con este
*/
app.engine('.hbs', exphdbs.engine({
    defaultLayout:"main.hbs",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname:".hbs"
}));
app.set('view engine', '.hbs');
/*Digo que voy a utilizar el motor de plantila que configure en el paso
anterior, llamando a partir del nombre .hbs
*/

//Midlewares
app.use(express.urlencoded({extended: false})) //para entender los datos que envia el formulario, extended false para no recibir imagewnes, solo datos. 
app.use(methodOverride('_method')); //input hidden con method, decimos que revise por este metodo
app.use(session({
    secret: 'mysecretttapp',
    resave: true,
    saveUninitialized: true
})); 
/*
Necesita un objeto para inicializarse. Basicamnete almacena los datos
temporalmente del usuario logeado
*/
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/clubs'));
app.use(require('./routes/players'));

///Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listening
app.listen(app.get('port'), ()=>{
    console.log("Estoy funcionando en el puerto 3000");
})