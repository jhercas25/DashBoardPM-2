const express =  require('express');
const router= express.Router();
const pool=require('../database');
const passport=require('passport');
const {isLoggedin,isnotloggedin}=require('../lib/auth');

router.get('/',isLoggedin,(req,res) =>{
    res.render('Caja/caja');
});

router.get('/InfoDiario',isLoggedin,async (req,res) =>{


    const InfoDiario = await pool.query ('SELECT * from Aperturas,Cierres,Pagos,Gastos,Ventas where FechaEjecucion=Now()') ;
    res.sendStatus(200);

});



module.exports =router;