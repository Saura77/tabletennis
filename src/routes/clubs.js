const express = require('express');
const Club = require('../models/Club');
const Tournament = require('../models/Tournament');
const router = express.Router();
const {isAutenthicated} = require('../helpers/auth');

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

router.get('/tournament/create', isAutenthicated , (req,res)=>{
    res.render('tournaments/create');
})

router.post('/tournament/create', isAutenthicated, async (req,res)=>{
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

router.get('/tournaments/edit/:id', isAutenthicated, async (req,res)=>{
    const tournament = await Tournament.findById(req.params.id).lean(); 
    res.render('tournaments/edit', {tournament});
})

router.put('/tournaments/edit/:id', isAutenthicated, async (req,res)=>{
    const {begin_date, duration, categoria} = req.body;     
    const errors = [];
    //Validaciones
    if(errors.length>0){
        res.render('tournaments/edit');
    }else{
        await Tournament.findByIdAndUpdate(req.params.id, {begin_date, duration, categoria});
        res.redirect('/tournaments');
    }
})

router.get('/tournaments/delete/:id', isAutenthicated, async (req,res)=>{
    const tournament = await Tournament.findById(req.params.id).lean();
    res.render('tournaments/delete', {tournament});
})

router.delete('/tournaments/delete/:id', isAutenthicated, async (req,res)=>{
    await Tournament.findByIdAndDelete(req.params.id);
    res.redirect('/tournaments');
})

module.exports = router;