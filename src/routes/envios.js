const express =  require('express');
const router= express.Router();
const pool=require('../database');
const passport=require('passport');
const {isLoggedin,isnotloggedin}=require('../lib/auth');

router.get('/',isLoggedin,(req,res) =>{
    res.render('envios/envios');
});

router.post('/Genvios',isLoggedin,async (req,res)  =>{
    console.log(JSON.stringify(req.body));
    await pool.query ('INSERT INTO Genvios SET ?',[req.body]) ;
    res.render('envios/envios');
});

module.exports =router;