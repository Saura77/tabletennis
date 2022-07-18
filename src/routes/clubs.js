const express = require('express');
const Club = require('../models/Club');
const Tournament = require('../models/Tournament');
const router = express.Router();

router.get('/clubs/register', (req,res)=>{
    res.render('clubs/register');
})

router.post('/clubs/register', async (req,res)=>{
    const {name, phone, id_user} = req.body;
    const errors = [];
    if(!name){
        errors.push({text:"El nombre del club es necesario"});
    }
    if(!phone){
        errors.push({text:"El telefono del club es necesario"});
    }
    if(errors.length>0){
        res.render('clubs/register',{errors,name,phone});
    }else{
        const newClub = new Club({name,phone,id_user});
        await newClub.save();
        res.redirect('/users/signin');
    }
})

router.get('/tournament/create', (req,res)=>{
    res.render('tournaments/create');
})

router.post('/tournament/create', async (req,res)=>{
    const {begin_date, duration, categoria} = req.body;
    const errors = [];
    if(!begin_date){
        errors.push({text:"La fecha de inicio debe existir"});         
    }
    if(!duration){
        errors.push({text:"La duración del torneo debe ser al menos un día"});
    }
    if(!categoria){
        errors.push({text:"La categoria del torneo debe existir"});
    }
    if(errors.length>0){
        res.render('tournaments/create', {
            errors, 
            begin_date, 
            duration, 
            categoria
        });
    }else{
        const newTournament = new Tournament({begin_date, duration, categoria});
        await newTournament.save();
        res.redirect('/tournaments');
    }
})

module.exports = router;