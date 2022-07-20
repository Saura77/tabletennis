const express = require('express');
const router = express.Router();
const Player = require('../models/Player');
const {isAutenthicated} = require('../helpers/auth');

router.get('/players/register', (req,res)=>{
    res.render('players/register');
})

router.post('/players/register', async (req,res)=>{
    const {name, last_name, phone, id_user} = req.body;
    const errors = [];
    if(!name){
        errors.push({text:"El nombre del jugador es necesario"});
    }
    if(!last_name){
        errors.push({text:"El apellido del jugador es necesario"});
    }
    if(!phone){
        errors.push({text:"El telefono del jugador es necesario"});
    }
    if(errors.length>0){
        res.render('players/register',{errors,name,last_name,phone});
    }else{
        const newPlayer = new Player({name,last_name,phone,id_user});
        await newPlayer.save();
        res.redirect('/users/signin');
    }
})

module.exports = router;