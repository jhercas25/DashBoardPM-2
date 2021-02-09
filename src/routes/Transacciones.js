const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedin, isnotloggedin } = require('../lib/auth');
const { query } = require('../database');
const PDFcreator = require('../lib/PDF');

////////////////////////////////// LISTA DE TRANSACCIONES ////////////////////////

router.get('/Ventas', isLoggedin, async (req, res) => {

    const Trans = "Ventas";
    res.render('Trans/transacciones', { Trans });
});

router.get('/Compras', isLoggedin, (req, res) => {
    const Trans = "Compras";
    res.render('Trans/transacciones', { Trans });
});

router.get('/Cotizaciones', isLoggedin, (req, res) => {
    const Trans = "Cotizaciones";
    res.render('Trans/transacciones', { Trans });
});

router.get('/Pedidos', isLoggedin, (req, res) => {
    const Trans = "Pedidos";
    res.render('Trans/transacciones', { Trans });
});

router.get('/Pagos', isLoggedin, (req, res) => {
    const Trans = "Pagos";
    res.render('Trans/transacciones', { Trans });
});
///////////////////////////////////// HISTORIAL TRANSACCIONES ///////////////////////////////////////////////

router.get('/Ventas/His', isLoggedin, async (req, res) => {
    DatosTransaciones = []
    Trans = await pool.query(`SELECT Transacciones.* , poc.Nombre FROM Transacciones, PoC where  (Transacciones.PoC=PoC.NitoCC) and Transacciones.Tipo = 'Ventas' ORDER BY Transacciones.FechaEjecucion DESC`);
    //console.log(Trans);
    Trans.forEach(row => {
        FechaConFormato = new Date(row.FechaEmision);
        DatosTransaciones.push({ row, FechadeEmision: FechaConFormato.getDate() + '/' + FechaConFormato.getMonth() + '/' + FechaConFormato.getFullYear() })
        //console.log();
    });
    res.send(DatosTransaciones);
});
router.get('/Compras/His', isLoggedin, async (req, res) => {
    DatosTransaciones = []
    Trans = await pool.query(`SELECT Transacciones.* , poc.Nombre FROM Transacciones, PoC where  (Transacciones.PoC=PoC.NitoCC) and Transacciones.Tipo = 'Compras' ORDER BY Transacciones.FechaEjecucion DESC`);
    Trans.forEach(row => {
        FechaConFormato = new Date(row.FechaEmision);
        DatosTransaciones.push({ row, FechadeEmision: FechaConFormato.getDate() + '/' + FechaConFormato.getMonth() + '/' + FechaConFormato.getFullYear() })
        //console.log();
    });
    res.send(DatosTransaciones);
});
router.get('/Cotizaciones/His', isLoggedin, async (req, res) => {
    DatosTransaciones = []
    Trans = await pool.query(`SELECT Transacciones.* , poc.Nombre FROM Transacciones, PoC where  (Transacciones.PoC=PoC.NitoCC) and Transacciones.Tipo = 'Cotizaciones' ORDER BY Transacciones.FechaEjecucion DESC`);
    Trans.forEach(row => {
        FechaConFormato = new Date(row.FechaEmision);
        DatosTransaciones.push({ row, FechadeEmision: FechaConFormato.getDate() + '/' + FechaConFormato.getMonth() + '/' + FechaConFormato.getFullYear() })
        //console.log();
    });
    res.send(DatosTransaciones);
});
router.get('/Pedidos/His', isLoggedin, async (req, res) => {
    DatosTransaciones = []
    Trans = await pool.query(`SELECT Transacciones.* , poc.Nombre FROM Transacciones, PoC where  (Transacciones.PoC=PoC.NitoCC) and Transacciones.Tipo = 'Pedidos' ORDER BY Transacciones.FechaEjecucion DESC`);
    Trans.forEach(row => {
        FechaConFormato = new Date(row.FechaEmision);
        DatosTransaciones.push({ row, FechadeEmision: FechaConFormato.getDate() + '/' + FechaConFormato.getMonth() + '/' + FechaConFormato.getFullYear() })
        //console.log();
    });
    res.send(DatosTransaciones);
});
router.get('/Pagos/His', isLoggedin, async (req, res) => {
    DatosTransaciones = []
    Trans = await pool.query(`SELECT Transacciones.* , poc.Nombre FROM Transacciones, PoC where  (Transacciones.PoC=PoC.NitoCC) and Transacciones.Tipo = 'Pagos' ORDER BY Transacciones.FechaEjecucion DESC`);
    Trans.forEach(row => {
        FechaConFormato = new Date(row.FechaEmision);
        DatosTransaciones.push({ row, FechadeEmision: FechaConFormato.getDate() + '/' + FechaConFormato.getMonth() + '/' + FechaConFormato.getFullYear() })
        //console.log();
    });
    res.send(DatosTransaciones);
});

///////////////////////////////////// NUEVAS TRANSACCIONES ///////////////////////////////////////////////

router.get('/Nuevo/:Tipo&:Responsable', isLoggedin, async (req, res) => {
    const { Tipo, Responsable } = req.params


    if (Tipo != 'Compras') {


        await pool.query(`Call NuevaTransaccion('${Tipo}','${Responsable}', @Salida3)`);
        NumD = await pool.query(`SELECT Documento FROM Registrotransacciones WHERE  Transaccion = '${Tipo}' and Responsable='${Responsable}' and estado= 'Edicion' `);
        NumD = NumD[0].Documento;
        //console.log(NumD);
        if (Tipo == 'Pedidos') {
            prov = true;
        } else {
            prov = false;
        }

    }
    else {
        NumD = 0;
        prov = true;
    }

    const Hoy = Date(Date.now()).toString();
    const Trans = Tipo;
    const Asig = false;
    const Editar = false;
    res.render('Trans/transaccionesNuevos', { prov, Trans, NumD, Hoy, Editar, Asig });
});

router.get('/NuevoPago/:Responsable', isLoggedin, async (req, res) => {
    const { Responsable } = req.params;
    Tipo="Pagos"

    await pool.query(`Call NuevaTransaccion('${Tipo}','${Responsable}', @Salida3)`);
    NumD = await pool.query(`SELECT Documento FROM Registrotransacciones WHERE  Transaccion = '${Tipo}' and Responsable='${Responsable}' and estado= 'Edicion' `);
    NumD = NumD[0].Documento;
    //console.log(NumD);
   
    prov = true;

    const Hoy = Date(Date.now()).toString();
    const Trans = Tipo;
    const Asig = false;
    const Editar = false;
    res.render('Trans/Pagos', { prov, Trans, NumD, Hoy, Editar, Asig });
});

router.get('/NuevoU/:NumD&:Provedor&:Tipo', isLoggedin, async (req, res) => {
    const { NumD, Provedor, Tipo } = req.params

    prov = true;
    Asig = true;
    DT = { row: { PoC: Provedor } }
    const Hoy = Date(Date.now()).toString();
    const Trans = Tipo;
    const Editar = false;
    res.render('Trans/transaccionesNuevos', { prov, Trans, NumD, Hoy, Editar, DT, Asig });
});

router.post('/MP', isLoggedin, async (req, res) => {
    const { MPq, Tp } = req.body;
    //console.log(req.body);

    let NumD = await pool.query(`SELECT NumFacturas_Prov FROM RegistroTransacciones where Transaccion = 'Ventas' and MetodoEjecucion ='${MPq}' and Tipo= '${Tp}'`);
    NumD = parseInt(NumD[0].Consecutivo) + 1;
    //let NumD = await pool.query (`SELECT Consecutivo FROM RegistroTransacciones where Transaccion = 'Ventas' and MetodoEjecucion ='Credito'`);
    //NumD= parseInt(NumD[0].Consecutivo)+1;
    res.send({ NumD });

});


///////////////////////////////////// EDITAR TRANSACCIONES ///////////////////////////////////////////////

router.get('/Editar/:NumD&:Tipo', isLoggedin, async (req, res) => {
    Editar = true
    const { NumD, Tipo } = req.params
    const Trans = Tipo;
    const prov = false;

    info = await pool.query(`SELECT Transacciones.* , poc.Nombre FROM Transacciones, PoC where  (Transacciones.PoC=PoC.NitoCC) and Transacciones.Documento = '${NumD}' ORDER BY Transacciones.FechaEjecucion DESC`);
    Detalle = await pool.query(`select ID from Detallettemp where Documento='${NumD}' `);
    //console.log(Detalle.length);
    if (Detalle.length == 0) {
        await pool.query(`INSERT INTO detallettemp(Documento,Item,Producto,Cantidad,Valor,Descuento,Total,Iva,FechaEjecucion,Tipo,Codigo) (select Documento,Item,Producto,Cantidad,Valor,Descuento,Total,Iva,FechaEjecucion,Tipo,Codigo from Detallet where Documento='${NumD}') `);
        await pool.query(`INSERT INTO Detalleinvlotfevtemp(ILF,FechaRegistro,Cantidad,Documento,item,Tipo,Invima,FechaVencimiento,Lote,Producto) (select ILF,FechaRegistro,Cantidad,Documento,item,Tipo,Invima,FechaVencimiento,Lote,Producto from Detalleinvlotfev where Documento='${NumD}') `);
    }

    FechaConFormato = new Date(info[0].FechaEmision);
    DT = {
        row: info[0],
        FechadeEmision: FechaConFormato.getDate() + '/' + FechaConFormato.getMonth() + '/' + FechaConFormato.getFullYear()
    }
    //console.log(DT);
    Asig = false;
    res.render('Trans/transaccionesNuevos', { Trans, Editar, NumD, DT, Editar, prov, Asig });

});

///////////////////////////////////// DETALLE TRANSACCIONES ///////////////////////////////////////////////

router.get('/DetalleT/:id&:Tp', isLoggedin, async (req, res) => {
    const { id, Tp } = req.params;
    //console.log(id+' tipo '+Tp);

    Detalle = await pool.query(`SELECT detallettemp.* , producto.Nombre, Variaciones.variacion FROM detallettemp,producto,Variaciones where (detallettemp.Codigo=producto.Codigo) and  (detallettemp.Producto=Variaciones.Codigo)  and (Documento = '${id}' and Tipo= '${Tp}')`);
    //console.log(Detalle);
    res.send(Detalle);
});

router.post('/DetalleT/:tipo', isLoggedin, async (req, res) => {
    const { tipo } = req.params;
    const body = req.body;
    Codigo = req.body.Cod.split('#')
    //console.log(body);
    await pool.query(`INSERT INTO detallettemp (Documento,Item,Producto,Codigo,Valor,Iva,Descuento,Cantidad,Total,Tipo) values ('${body.DocT}','${body.Item}','${body.Cod}','${Codigo[0]}','${body.ValorU}','${body.Iva}','${body.Des}','${body.Cnt}','${body.ValorT}','${tipo}' )`);
    res.sendStatus(200);
});

router.post('/DetalleT/Editar/:id&:Tp', isLoggedin, async (req, res) => {
    const { id, Tp } = req.params;
    const body = req.body;
    Codigo = req.body.Cod.split('#')
    // console.log(body);

    await pool.query(`UPDATE detallettemp SET Codigo='${Codigo[0]}', Documento='${body.DocT}', Item='${body.Item}', Producto='${body.Cod}', Valor='${body.ValorU}', Iva='${body.Iva}', Descuento='${body.Des}', Cantidad='${body.Cnt}', Total='${body.ValorT}'  WHERE  (Item=${body.Item} and Documento = '${id}' and Tipo= '${Tp}')`);


    res.sendStatus(200);
});

router.get('/DetalleTtemp/eliminar/:id&:Doc', isLoggedin, async (req, res) => {
    const { id, Doc } = req.params;

    // console.log(id);
    await pool.query(`Delete from detallettemp WHERE  ID = '${id}'`);
    await pool.query(`CALL OrdenarItem('${Doc}' ,@SALIDA); `);
    res.sendStatus(200);
});

router.post('/Formalizar/:id&:Editar', isLoggedin, async (req, res) => {

    const { id, Editar } = req.params;
    const { Transaccion } = req.body.bodyMsg;
    const { Pago } = req.body.bodyMsg;

    //console.log(id);
    //console.log(req.body.bodyMsg);
    //console.log('Edita->');
    //console.log(Transaccion);

    if (Editar == "true") {

        if (Transaccion.Tipo == "Ventas") {
            inodec = false;
            await pool.query(`Select ActualizarInv2('${id}',${inodec})`);
            await pool.query(`CALL ActualizarStockILF('${id}',${inodec},@Salida2)`);
        }
        if (Transaccion.Tipo == "Compras") {
            inodec = true;
            await pool.query(`Select ActualizarInv2('${id}',${inodec})`);
            await pool.query(`CALL ActualizarStockILF('${id}',${inodec},@Salida2)`);
        }

        await pool.query(`DELETE FROM detallet WHERE Documento = '${id}' `);
        await pool.query(`DELETE FROM detalleinvlotfev WHERE Documento = '${id}' `);
        await pool.query(`DELETE FROM transacciones WHERE Documento = '${id}' `);
        await pool.query(`DELETE FROM pagos WHERE Documento = '${id}' `);

        await pool.query(`INSERT INTO detallet(Documento,Item,Producto,Codigo,Cantidad,Valor,Descuento,Total,Iva,Tipo) SELECT Documento,Item,Producto,Codigo,Cantidad,Valor,Descuento,Total,Iva,Tipo FROM detallettemp WHERE (Documento = '${id}' )`);
        await pool.query(`DELETE FROM detallettemp WHERE Documento = '${id}' `);
        await pool.query(`INSERT INTO transacciones SET ? `, [Transaccion]);

        //console.log(!inodec);

        await pool.query(`INSERT INTO pagos SET ?`, [Pago]);
        await pool.query(`INSERT INTO detalleinvlotfev(ILF,FechaRegistro, Cantidad, Documento,item,Tipo,Invima,Lote,FechaVencimiento,Producto) SELECT ILF,FechaRegistro,Cantidad,Documento,item,Tipo,Invima,Lote,FechaVencimiento,Producto FROM detalleinvlotfevtemp WHERE (Documento = '${id}' )`);

        await pool.query(`DELETE FROM detalleinvlotfevtemp WHERE Documento = '${id}' `);
        await pool.query(`UPDATE RegistroTransacciones Set Estado = 'Finalizado' where Documento = '${id}'`)

        if(Transaccion.Plazo.indexOf('Credito')>=0){

            Cartera={
                Documento :id,  
                PoC :Transaccion.PoC, 
                Tipo : Transaccion.Tipo, 
                FechaVencimiento: Transaccion.FechaVencimientoa, 
                Total: Transaccion.Total, 
                Responsable :Transaccion.Responsable, 
            }
            Total=Pago.MontoEfectivo-Pago.MontoTarjeta
            await pool.query(`UPDATE Cartera SET ?, Saldo=Saldo-${Total} WHERE Documento='${id}'`, [Cartera]);
        }

    } else {

        await pool.query(`INSERT INTO detallet(Documento,Item,Producto,Codigo,Cantidad,Valor,Descuento,Total,Iva,Tipo) SELECT Documento,Item,Producto,Codigo,Cantidad,Valor,Descuento,Total,Iva,Tipo FROM detallettemp WHERE (Documento = '${id}' )`);
        await pool.query(`DELETE FROM detallettemp WHERE Documento = '${id}' `);
        await pool.query(`INSERT INTO transacciones SET ? `, [Transaccion]);
        await pool.query(`INSERT INTO pagos SET ?`, [Pago]);
        await pool.query(`INSERT INTO detalleinvlotfev(ILF,FechaRegistro, Cantidad, Documento,item,Tipo,Invima,Lote,FechaVencimiento,Producto) SELECT ILF,FechaRegistro,Cantidad,Documento,item,Tipo,Invima,Lote,FechaVencimiento,Producto FROM detalleinvlotfevtemp WHERE (Documento = '${id}' )`);
        await pool.query(`DELETE FROM detalleinvlotfevtemp WHERE Documento = '${id}' `);
        //await pool.query(`UPDATE registrotransacciones SET Consecutivo=Consecutivo+1 WHERE Transaccion = '${Transaccion.Tipo}' `);

        if (Transaccion.Tipo == "Compras") {
            await pool.query(`INSERT INTO RegistroTransacciones Set Estado = 'Finalizado', Documento = '${id}', Transaccion = '${Transaccion.Tipo}', Consecutivo = 0, Responsable = '${Transaccion.Responsable}', MetodoEjecucion = '${Transaccion.Plazo}', Tipo = '0' `);
        }

        await pool.query(`UPDATE RegistroTransacciones Set Estado = 'Finalizado' where Documento = '${id}'`);

        //console.log({Tiene:Transaccion.Plazo.indexOf('Credito'), Plazo:Transaccion.Plazo});
        if(Transaccion.Plazo.indexOf('Credito')>=0){

            Total=Pago.MontoEfectivo-Pago.MontoTarjeta
            Cartera={
                Documento :id,  
                PoC :Transaccion.PoC, 
                Tipo : Transaccion.Tipo, 
                FechaVencimiento: Transaccion.FechaVencimientoa, 
                Total: Transaccion.Total, 
                Saldo: Transaccion.Total-Total, 
                Responsable :Transaccion.Responsable, 
            }
            //console.log(Cartera);

            await pool.query(`INSERT INTO Cartera SET ? `, [Cartera]);
        }


    }

    res.sendStatus(200);


});

const CrearPDF = async (req, res, next) => {

    const { Doc, Tp } = req.params;
    //console.log(Doc+' tipo '+Tp);
    const Detalle = await pool.query(`SELECT detallet.* , producto.Nombre FROM detallet,producto where (detallet.Codigo=producto.Codigo) and (Documento = '${Doc}' and Tipo= '${Tp}')`);
    const T = await pool.query(`SELECT transacciones.Documento,transacciones.Tipo,transacciones.FechaEmision,transacciones.Total,transacciones.poc,PoC.Nombre FROM transacciones,PoC where (transacciones.PoC=PoC.NitoCC) and (transacciones.Documento = '${Doc}' and transacciones.Tipo= '${Tp}')`);
    console.log({T, Detalle});
    r = await PDFcreator.Crear(0, { Detalle, T });

    return next();
}

router.get('/imprimir/:Doc&:Tp', isLoggedin, CrearPDF, async (req, res) => {

    console.log('Redirigiendo');
    res.sendStatus(200);

});

router.get('/Transformar/:Doc1&:Doc2&:Tp', isLoggedin, async (req, res) => {

    const { Doc1, Doc2, Tp } = req.params
    //console.log('Redirigiendo',{Doc1,Doc2,Tp});
    res.sendStatus(200);
    await pool.query(`INSERT INTO detallettemp(Documento,Item,Producto,Codigo,Cantidad,Valor,Descuento,Total,Iva,Tipo) SELECT Documento,Item,Producto,Codigo,Cantidad,Valor,Descuento,Total,Iva,Tipo FROM detallet WHERE (Documento = '${Doc1}' )`);
    await pool.query(`INSERT INTO detalleinvlotfevtemp (ILF,FechaRegistro, Cantidad, Documento,item,Tipo,Invima,Lote,FechaVencimiento,Producto) SELECT ILF,FechaRegistro,Cantidad,Documento,item,Tipo,Invima,Lote,FechaVencimiento,Producto FROM detalleinvlotfev WHERE (Documento = '${Doc1}' )`);

    await pool.query(`Update detallettemp SET  Documento='${Doc2}',Tipo='Compras' Where Documento='${Doc1}'`);
    await pool.query(`Update detalleinvlotfevtemp SET  Documento='${Doc2}',Tipo='Compras' Where Documento='${Doc1}'`);



});

router.get('/TraerPendientes/:PoC', isLoggedin, async (req, res) => {

    const { PoC } = req.params
    console.log(PoC);
    //console.log('Redirigiendo',{Doc1,Doc2,Tp});
    
    Pendientes = await pool.query(`SELECT * FROM cartera WHERE (PoC = '${PoC}' )`);
    console.log(Pendientes);
    res.send(Pendientes);



});

router.get('/TraerPendientes/:Doc', isLoggedin, async (req, res) => {

    const { Doc } = req.params
    console.log(Doc);
    //console.log('Redirigiendo',{Doc1,Doc2,Tp});
    
    Pendientes = await pool.query(`SELECT * FROM cartera WHERE (PoC = '${PoC}' )`);
    console.log(Pendientes);
    res.send(Pendientes);



});


module.exports = router;