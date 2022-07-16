const express = require('express');
const router = express.Router();

router.get('/players/register', (req,res)=>{
    res.render('players/register');
})

router.post('/players/register', async (req,res)=>{
    const {name, last_name, phone} = req.body;
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
        const newPlayer = await new Player({name,last_name,phone});
        newPlayer.id = req.user.id;
        await newPlayer.save();
        res.redirect('/');
    }
})

module.exports = router;