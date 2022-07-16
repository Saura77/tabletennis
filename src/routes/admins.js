const express = require('express');
const router = express.Router();

router.get('/tournament/create', (req,res)=>{
    res.render('tournaments/create');
})

router.post('/tournament/create', (req,res)=>{
    const {begin_date, duration} = req.body;
    const errors = [];
    if(begin_date==null){
        errors.push({text:"La fecha de inicio debe existir"});         
    }
    if(duration<=0){
        errors.push({text:"La duración del torneo debe ser al menos un día"});
    }
    if(errors.length>0){
        res.redirect('/tournament/create');
    }else{
        res.send("Torneo creado!");
    }
})

module.exports = router;