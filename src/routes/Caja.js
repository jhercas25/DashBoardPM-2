const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedin, isnotloggedin } = require('../lib/auth');

router.get('/', isLoggedin, async (req, res) => {
    const Apertura = await pool.query('SELECT MontoEfectivo as Efectivo ,MontoElectronico as Electronico,FechaEjecucion from Aperturas,OperacionDiaria where Aperturas.Id=OperacionDiaria.idApertura and  OperacionDiaria.idCierre=0 ');
    console.log(Apertura.length);
    if(Apertura.length==0){return res.render('Caja/caja', {  }); }

    FE=new Date(Apertura[0].FechaEjecucion)
    FE=FE.getFullYear()+'-'+(FE.getMonth()+1)+'-'+ FE.getDate()
    console.log(FE);
    const Entradas = await pool.query(`SELECT Sum(MontoEfectivo) as Efectivo, Sum(MontoTarjeta) as Electronico from Pagos where  (unix_timestamp(FechaEjecucion)  >= unix_timestamp('${FE}')    and Tipo="Ventas") or (unix_timestamp(FechaEjecucion)   >= unix_timestamp('${FE}')  and  Tipo="PagosVentas" )`);
    const Salidas = await pool.query(`SELECT Sum(MontoEfectivo) as Efectivo, Sum(MontoTarjeta) as Electronico from Pagos where (unix_timestamp(FechaEjecucion)   >=unix_timestamp('${FE}')    and Tipo="Compras") or (unix_timestamp(FechaEjecucion)  >= unix_timestamp('${FE}')  and Tipo="PagosCompras") `);
    const Gastos = await pool.query(`SELECT Sum(MontoEfectivo) as Efectivo, Sum(MontoElectronico) as Electronico from Gastos where unix_timestamp(FechaEjecucion)   >= unix_timestamp('${FE}')  `);

    const Total = {
        Efectivo: Apertura[0].Efectivo + Entradas[0].Efectivo - Salidas[0].Efectivo - Gastos[0].Efectivo,
        Electronico: Apertura[0].Electronico + Entradas[0].Electronico - Salidas[0].Electronico - Gastos[0].Electronico
    }
    Datos = { Apertura: Apertura[0], Entradas: Entradas[0], Salidas: Salidas[0], Gastos: Gastos[0], Total:Total };
    //console.log(Datos);

    res.render('Caja/caja', { Datos  });
});

router.get('/Actualizar', isLoggedin, async (req, res) => {
    const Apertura = await pool.query('SELECT MontoEfectivo as Efectivo ,MontoElectronico as Electronico,FechaEjecucion from Aperturas,OperacionDiaria where Aperturas.Id=OperacionDiaria.idApertura and  OperacionDiaria.idCierre=0 ');
    FE=new Date(Apertura[0].FechaEjecucion)
    FE=FE.getDate()+'/'+(FE.getMonth()+1)+'/'+FE.getFullYear()
    const Entradas = await pool.query(`SELECT Sum(MontoEfectivo) as Efectivo, Sum(MontoTarjeta) as Electronico from Pagos where  (DATE_FORMAT(FechaEjecucion , "%d/%m/%Y")  >= '${FE}'  and Tipo="Ventas") or (DATE_FORMAT(FechaEjecucion , "%d/%m/%Y")  >= '${FE}' and  Tipo="PagosVentas" )`);
    const Salidas = await pool.query(`SELECT Sum(MontoEfectivo) as Efectivo, Sum(MontoTarjeta) as Electronico from Pagos where (DATE_FORMAT(FechaEjecucion , "%d/%m/%Y")  >='${FE}'   and Tipo="Compras") or (DATE_FORMAT(FechaEjecucion , "%d/%m/%Y")  >= '${FE}'  and Tipo="PagosCompras") `);
    const Gastos = await pool.query(`SELECT Sum(MontoEfectivo) as Efectivo, Sum(MontoElectronico) as Electronico from Gastos where DATE_FORMAT(FechaEjecucion , "%d/%m/%Y")  >= ${FE}   `);

    const Total = {
        Efectivo: Apertura[0].Efectivo + Entradas[0].Efectivo - Salidas[0].Efectivo - Gastos[0].Efectivo,
        Electronico: Apertura[0].Electronico + Entradas[0].Electronico - Salidas[0].Electronico - Gastos[0].Electronico
    }
    Datos = { Apertura: Apertura[0], Entradas: Entradas[0], Salidas: Salidas[0], Gastos: Gastos[0], Total:Total };
    //console.log(Datos);

    res.send(Datos);
});

router.get('/Historico', isLoggedin, async (req, res) => {
    const CajaMovimientos = await pool.query('SELECT Aperturas.MontoElectronico,Aperturas.MontoEfectivo,  (DATE_FORMAT( Aperturas.FechaEjecucion , "%d/%m/%Y")) as FechaApertura, (DATE_FORMAT( Cierre.FechaEjecucion , "%d/%m/%Y")) as FechaCierre, Cierre.*  from Cierre,Aperturas,OperacionDiaria  where Aperturas.Id=OperacionDiaria.idApertura and  OperacionDiaria.idCierre=Cierre.id   order by Cierre.FechaEjecucion Desc');
    res.send(CajaMovimientos);
});

router.get('/Gastos', isLoggedin, async (req, res) => {
    const Gastos = await pool.query('SELECT *,DATE_FORMAT(FechaEjecucion , "%d/%m/%Y") as FE,MontoEfectivo + MontoElectronico as Monto  from Gastos order by FechaEjecucion Desc');
    res.send(Gastos);
});

router.post('/Gastos', isLoggedin, async (req, res) => {
    const Gastos = req.body
    console.log(Gastos);
    await pool.query('INSERT INTO Gastos SET ?',[Gastos]);
    res.sendStatus(200);
});

router.post('/Gastos/Edit/:id', isLoggedin, async (req, res) => {
    const {id}=req.params;
    const Gastos = req.body;
    await pool.query(`UPDATE Gastos SET ? WHERE ID=${id}`,[Gastos]);
    res.sendStatus(200);
});

router.get('/Movimiento/Ultimo', isLoggedin, async (req, res) => {
    const CajaMovimientos = await pool.query('SELECT *  from Operaciondiaria order by id Desc limit 1');
    res.send(CajaMovimientos);
});

router.get('/Cierre/Ultimo', isLoggedin, async (req, res) => {
    const Cierre = await pool.query('SELECT *  from Cierre order by id Desc limit 1');
    res.send(Cierre);
});

router.post('/Apertura', isLoggedin, async (req, res) => {
    const Apertura = req.body;
    //console.log(Apertura);
    await pool.query('INSERT INTO APERTURAS SET ?', [Apertura]);
    res.sendStatus(200);
});

router.post('/Cierre', isLoggedin, async (req, res) => {
    const Cierre = req.body;
    //console.log(Apertura);
    await pool.query('INSERT INTO Cierre SET ?', [Cierre]);
    res.sendStatus(200);
});

module.exports = router;