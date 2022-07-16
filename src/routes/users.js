const express = require('express');
const router = express.Router();
const flash = require('connect-flash');
const User = require('../models/User');
const Player = require('../models/Player');
const Club = require('../models/Club');
const passport = require('passport');

router.get('/users/signup', (req,res)=>{
    res.render('users/signup');
});

router.post('/users/signup', async (req,res)=>{
    //const {name,last_name,email,phone,password,repeat_password} = req.body; //Obtenemos los datos enviados desde el formulario y los asignamos a variables independientes.
    const{email,password, repeat_password} = req.body;
    const errors = []; //Declaramos array vacio para colocar nuestros errores
    
    if(password != repeat_password){
        errors.push({text: "Las contraseñas no coinciden"});
    }
    
    if(password.length<=4){
        errors.push({text: "La contraseña debe ser mayor a 4 digitos"});
    }
    
    if(errors.length > 0){
        //res.render('users/signup', {errors, name, last_name, email, phone, password, repeat_password});
        res.render('users/signup', {errors, email, password, repeat_password});
    } else {
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            //req.flash('error_msg', 'Este email ya se encuentra vinculado a un usuario. ');
            res.redirect('/users/signup');
        }
        const newUser = new User({email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        //req.flash('success_msg', 'Estás registrado');
        res.redirect('/users/signin');
    }
})

router.get('/users/register', (req, res)=>{
    res.render('users/option');
});

router.post('/users/register', async (req, res)=>{
    const {option} = req.body;
    const errors = [];
    if(!option){
        errors.push({text:"Por favor, seleccione una opción."});
    }
    if(errors.length>0){
        res.render('users/option', {errors});
    }
    if(option == "1"){
        res.redirect('/players/register');
    } else if (option == "2"){
        res.redirect('/clubs/register');
    }
})

router.get('/users/signin', (req,res)=>{
    res.render('users/signin');
})

//Local se lo coloca por defecto. De esta forma, le decimos que realice todo lo visto en config/passport
router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/users/register',
    failureRedirect: '/users/signin',
    failureFlash: true
})); 

module.exports = router;