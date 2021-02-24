const express =  require('express');
const router= express.Router();
const pool=require('../database');
const passport=require('passport');
const {isLoggedin,isnotloggedin}=require('../lib/auth');

router.get('/',isLoggedin,async(req,res) =>{
    const Apertura = await pool.query ('SELECT MontoEfectivo,MontoElectronico from Aperturas where  FechaEjecucion= now();') ;
    const Entradas = await pool.query ('SELECT Sum(MontoEfectivo) as EntradasEfectivo, Sum(MontoTarjeta) as EntradasElectronico from Pagos where FechaEjecucion= now() and Tipo="Ventas" ');
    const Salidas = await pool.query ('SELECT Sum(MontoEfectivo) as EntradasEfectivo, Sum(MontoTarjeta) as EntradasElectronico from Pagos where FechaEjecucion= now() and Tipo="Compras" ');
    const Gastos = await pool.query ('SELECT Sum(MontoEfectivo) as EntradasEfectivo, Sum(MontoElectronico) as EntradasElectronico from Gastos where FechaEjecucion= now() ');

    res.render('Caja/caja',{Apertura,Entradas,Salidas,Gastos});
});

router.get('/InfoDiario',isLoggedin,async (req,res) =>{

    const Apertura = await pool.query ('SELECT MontoEfectivo,MontoElectronico from Aperturas where  Aperturas.FechaEjecucion= now();') ;
    const Entradas = await pool.query ('SELECT Sum(MontoEfectivo) as EntradasEfectivo, Sum(MontoTarjeta) as EntradasElectronico from Pagos where FechaEjecucion= now() and Tipo="Ventas" ');
    const Salidas = await pool.query ('SELECT Sum(MontoEfectivo) as EntradasEfectivo, Sum(MontoTarjeta) as EntradasElectronico from Pagos where FechaEjecucion= now() and Tipo="Compras" ');
    const Gastos = await pool.query ('SELECT Sum(MontoEfectivo) as EntradasEfectivo, Sum(MontoElectronico) as EntradasElectronico from Gastos where FechaEjecucion= now() ');

    res.send({Apertura,Entradas,Salidas,Gastos});
});

router.get('/Historico',isLoggedin,async (req,res) =>{
    const CajaMovimientos = await pool.query ('SELECT Aperturas.MontoElectronico,Aperturas.MontoEfectivo, Cierre.*  from Cierre,Aperturas  where Cierre.FechaEjecucion=Aperturas.FechaEjecucion order by FechaEjecucion Desc');
    res.send(CajaMovimientos);
});

router.get('/Gastos/Historico',isLoggedin,async (req,res) =>{
    const Gastos = await pool.query ('SELECT *  from Gastos order by FechaEjecucion Desc');
    res.send(Gastos);
});

router.get('/Historico/Ultimo',isLoggedin,async (req,res) =>{
    const CajaMovimientos = await pool.query ('SELECT *  from Cierre order by FechaEjecucion Desc limit 1');
    res.send(CajaMovimientos);
});

router.post('/Apertura',isLoggedin,async (req,res) =>{
    const Apertura = req.body;
    //console.log(Apertura);
    await pool.query ('INSERT INTO APERTURAS SET ?',[Apertura]);
    res.sendStatus(200);
});

module.exports =router;