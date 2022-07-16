const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
/**
 * Con estos dos modulos basicamente vamos a gestionar de mejor manera el tema de las autentificaciones y creaciones de sesiones para el usuario, para no pedirle en cada endpoint
 * que se autentifique, sino que vamos a guardar sus datos de inicio de sesion de forma temporal
 */

passport.use(new LocalStrategy({
    usernameField: 'email' //A través de que se va a validar el usuario
}, async (email, password, done) =>{ //La funcion que se va a ejecutar para validar la autenticacion del usuario. (done es un callback en caso de validarse)
    const user = await User.findOne({email: email}); //Busco el usuario
    if(!user){ //Primera validacion, ¿Existe un usuario vinculado a ese mail?
        return done(null, false, {message: "Usuario no encontrado"}); //Funcion callback 3 parametros: error o no}(en este caso no), usuario o no(en este caso no), y mensaje 
    } else { //Segunda validacion, existe el mail, pero coincide la contraseña o no? Utilizamos metodo definido previamente en el modelo User
        const match = await user.matchPassword(password);
        if(match){
            return done(null, user);
        } else {
            return done(null, false, {message: "Contraseña incorrecta"});
        }
    }
}));

passport.serializeUser((user, done) => { //Sirve para almacenar temporalmente. Decimos que almacene el id del usuario
    done(null, user.id);
})

passport.deserializeUser((id, done) => { //Toma un id y genera un usuario, para comprobar si esta o no vinculado a un usuario cada vez que realice una accion
    User.findById(id, (err, user)=>{
        done(err, user);
    });
})