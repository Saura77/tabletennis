const express = require('express');
const router = express.Router();
const Club = require('../models/Club');
const Tournament = require('../models/Tournament');

router.get("/", (req, res)=>{
    res.render('inicio.hbs');
})

router.get("/tournaments", async (req, res)=>{
    const tournaments = await Tournament.find().lean().sort({begin_date: "asc"}); //Para obtener objeto json y no objeto mongoose, y sort para que se ordenen de mas reciente a menos
    res.render('viewTournaments.hbs', {tournaments});
})

router.get('/clubs', async (req,res)=>{
    const clubs = await Club.find().lean();
    res.render('viewClubs.hbs', {clubs});
})

module.exports = router;