const express = require('express');
const router = express.Router();

router.get("/", (req, res)=>{
    res.render('inicio.hbs');
})

router.get("/torneo", (req, res)=>{
    res.render('torneo.hbs');
})


module.exports = router;