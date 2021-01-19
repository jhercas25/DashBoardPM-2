const express = require('express');
const router = express.Router();
const path = require('path');

const multer = require('multer');
const storage = multer.diskStorage({
   destination: path.join(__dirname, '../public/uploads'),
   filename: (req, file, cb) => {
      //console.log(req.params);
      cb(null, req.params.id);
   }
});

const pool = require('../database');
const { isLoggedin } = require('../lib/auth');
const barcode = require('../lib/barcode');

router.get('/', isLoggedin, async (req, res) => {

   //const Productos = await pool.query ('SELECT * FROM Producto') ;
   //console.log(Productos[0].idProducto);
   //Prod= Productos
   res.render('./inventario/inventario');
   //res.render('./inventario/inventario');

});

router.get('/Nuevo', isLoggedin, async (req, res) => {

   //const Productos = await pool.query ('SELECT * FROM Producto') ;
   //console.log(Productos[0].idProducto);
   //Prod= Productos
   prov=true;
   res.render('./inventario/NuevoInv',{prov});
   //res.render('./inventario/inventario');

});

router.get('/Tinv', isLoggedin, async (req, res) => {

   const Productos = await pool.query('select producto.*, round (Producto.PVenta*(1+(Producto.Iva/100)),-1) as PVentaI , Sum(variaciones.cantidad) as Existencias, poc.Nombre as Proveedor  from producto,variaciones,poc where (Producto.Codigo=variaciones.Codigo_P)  and (Producto.poc=poc.NitoCC) GROUP BY variaciones.Codigo_P');
   //console.log(Productos);
   Prod = Productos
   return res.send(Prod);
   //res.render('./inventario/inventario');

});

router.get('/Tinv/:id', isLoggedin, async (req, res) => {
   const { id } = req.params;

   sql = `SELECT * FROM Producto Where Codigo like '%${id}%' `;

   //console.log(sql);
   const Productos = await pool.query(sql);
   //console.log(Productos);
   Prod = Productos
   return res.send(Prod);
   //res.render('./inventario/inventario');

});

router.post('/TinvE/:Trans&:Prov', isLoggedin, async (req, res) => {
   const { Trans, Prov } = req.params;
   const{Cod}=req.body;
   console.log(req.body);
   //console.log(Prov);

   if (Trans == "Compras") {
      sql = `SELECT * FROM Producto Where Codigo = '${Cod}' and PoC = '${Prov}' `;
   } else {
      sql = `SELECT Producto.*,Variaciones.Variacion FROM Producto,Variaciones Where Producto.Codigo = Variaciones.Codigo_p and Variaciones.Codigo= '${Cod}' `;
   }

   //console.log(sql);
   const Productos = await pool.query(sql);
   console.log(Productos);
   Prod = Productos
   return res.send(Prod);
   //res.render('./inventario/inventario');

});

router.get('/Tinv/Prod/:id', isLoggedin, async (req, res) => {
   const { id } = req.params;
   //console.log(id);
   const Productos = await pool.query(`SELECT * FROM Producto Where CampoBus like '%${id}%' `);
   //console.log(Productos);
   Prod = Productos
   return res.send(Prod);
   //res.render('./inventario/inventario');

});

router.get('/TCod', isLoggedin, async (req, res) => {
   const CodigoActual = await pool.query(`SELECT * From Codigos Where id = ( Select( Max(id) ) From Codigos )`);
   return res.send(CodigoActual);

});

router.get('/Carr/:id', isLoggedin, async (req, res) => {

   const { id } = req.params;
   //console.log(id);
   const TipoCar = await pool.query(`SELECT * From TipoCaracteristica `);
   const itemCar = await pool.query(`SELECT * From caracteristica `);
   const ProCar = await pool.query(`SELECT * From mapacaracteristicas where idProducto = ${id}`);
   const ProCaritem = await pool.query(`SELECT * From Stock Where idProductoP =${id}`);

   return res.send([TipoCar, ProCar, itemCar, ProCaritem]);

});

router.get('/Prov', isLoggedin, async (req, res) => {

   const Prov = await pool.query(`SELECT * FROM PoC Where PoC=1`);
   //console.log(Productos);

   return res.send(Prov);

});

router.get('/read', isLoggedin, async (req, res) => {

   //const Productos = await pool.query ('SELECT * FROM Producto') ;
   //console.log(Productos[0].idProducto);
   //Prod= Productos
   res.render('./inventario/leer',);
   //res.render('./inventario/inventario');

});

router.get('/read/get_code', isLoggedin, async (req, res) => {

   //const Productos = await pool.query ('SELECT * FROM Producto') ;
   //console.log(Productos[0].idProducto);
   //Prod= Productos
   //console.log(req.body);
   res.send(req.body);
   //res.render('./inventario/inventario');

});

router.get('/ILFinv/:id', isLoggedin, async (req, res) => {
   const { id } = req.params;
   //console.log(id);
   const Productos = await pool.query(`SELECT * FROM StockInvLotFev Where Producto like '%${id}%' `);
   //console.log(Productos);
   Prod = Productos
   return res.send(Prod);
   //res.render('./inventario/inventario');

});

router.get('/ILFinvTemp/:id', isLoggedin, async (req, res) => {
   const { id } = req.params;

   var ILF = [];
   //console.log(id);
   const DetalleILF = await pool.query(`SELECT * FROM DetalleInvLotFevTemp Where Documento = '${id}'`);
   //console.log('Detalle len ' + DetalleILF.length);
   if (DetalleILF.length > 0) {
      DetalleILF.forEach(async (row, index) => {

         //console.log(row.ILF + 'ind' + index);
         if (row.ILF != "0") {
            resILF = await pool.query(`SELECT * FROM stockinvlotfev Where ID = '${row.ILF}' `);

            //console.log(resILF);
            ILF.push(resILF[0]);
         } else {
            resILF = {
               Lote: row.Lote,
               FechaVencimiento: row.FechaVencimiento,
               Invima: row.Invima,
               Producto: row.Producto,
            }
            ILF.push(resILF);
         }

         //console.log('ILF len ' + ILF.length);

         if (ILF.length == (DetalleILF.length)) {

            return res.send({ ILF, DetalleILF });
         }

      });

   } else {
      return res.send({ ILF, DetalleILF });
   }

});

router.post('/ILFinvAgr', isLoggedin, async (req, res) => {

   const body = req.body;
   console.log(body);

   //console.log(FV);

   if (body.Tipo == "Ventas") {

      const ILFd = await pool.query(`SELECT Invima,FechaVencimiento,Lote  FROM stockinvlotfev  WHERE ID= '${body.ILF}' `);

      //console.log(ILFd);

      Data = {
         Documento: body.DocT,
         ILF: body.ILF,
         Lote: ILFd[0].Lote,
         FechaVencimiento: ILFd[0].FechaVencimiento,
         Invima: ILFd[0].Invima,
         Cantidad: body.CntILF,
         item: body.Item,
         Tipo: body.Tipo,
         Producto: body.Data.Producto
      }
      //console.log(Data)
      await pool.query(`INSERT INTO DetalleInvLotFevTemp Set ?`, [Data]);

   }
   //console.log(Productos);

   if (body.Tipo == "Compras" || body.Tipo == "Ninv") {
      FV = body.Data.FechaVencimiento.split('/');
      Data = {
         Documento: body.DocT,
         ILF: body.ILF,
         Lote: body.Data.Lote,
         FechaVencimiento: FV[2] + "/" + FV[1] + "/" + FV[0],
         Invima: body.Data.Invima,
         Cantidad: body.CntILF,
         Producto: body.Data.Producto,
         item: body.Item,
         Tipo: body.Tipo,
         Producto: body.Data.Producto,
      }
      // console.log(Data);
      await pool.query(`INSERT INTO DetalleInvLotFevTemp set ? `, [Data]);
   }


   return res.sendStatus(200);
   //res.render('./inventario/inventario');

});

router.post('/ILFinvedit/:id', isLoggedin, async (req, res) => {
   const { id } = req.params;
   const body = req.body;
   console.log(body);
   console.log(id);

   if (body.Tipo == "Ventas") {

      const ILFd = await pool.query(`SELECT Invima,FechaVencimiento,Lote  FROM stockinvlotfev  WHERE ID= '${body.ILF}' `);

      console.log(ILFd);

      Data = {
         Documento: body.DocT,
         ILF: body.ILF,
         Lote: ILFd[0].Lote,
         FechaVencimiento: ILFd[0].FechaVencimiento,
         Invima: ILFd[0].Invima,
         Cantidad: body.CntILF,
         item: body.Item,
         Tipo: body.Tipo,
         Producto: body.Data.Producto,
      }
      await pool.query(`UPDATE DetalleInvLotFevTemp SET ?  WHERE ID= ${id} `, [Data]);
   }

   if (body.Tipo == "Compras" || body.Tipo == "Ninv") {
      FV = body.Data.FechaVencimiento.split('/');
      Data = {
         Documento: body.DocT,
         ILF: body.ILF,
         Lote: body.Data.Lote,
         FechaVencimiento: FV[2] + "/" + FV[1] + "/" + FV[0],
         Invima: body.Data.Invima,
         Cantidad: body.CntILF,
         item: body.Item,
         Tipo: body.Tipo,
         Producto: body.Data.Producto,
      }
      console.log(Data);
      await pool.query(`UPDATE DetalleInvLotFevTemp SET ? WHERE ID= ${id} `, [Data]);

   }

   //console.log(Productos);

   return res.sendStatus(200);
   //res.render('./inventario/inventario');

});

router.get('/invILF/eliminar/:id', isLoggedin, async (req, res) => {

   const { id } = req.params;
   //console.log(id);

   await pool.query(`DELETE FROM DetalleInvLotFevTemp WHERE ID='${id}' `);


   //console.log(Productos);

   return res.sendStatus(200);
   //res.render('./inventario/inventario');

});

router.get('/invILF/eliminar/item/:id', isLoggedin, async (req, res) => {

   const { id } = req.params;
   //console.log(id);

   await pool.query(`DELETE FROM DetalleInvLotFevTemp WHERE item ='${id}' `);
   await pool.query(`UPDATE DetalleInvLotFevTemp SET item=item-1 WHERE item>${id}`);
   //console.log(Productos);

   return res.sendStatus(200);
   //res.render('./inventario/inventario');

});

router.post('/Actualizar/:Doc', isLoggedin, async (req, res) => {

   const { Doc } = req.params;
   const { inodec } = req.body;

   //console.log(Doc);
   console.log(inodec);

   resp=await pool.query(`Select ActualizarInv2('${Doc}',${inodec})`);
   console.log(resp);
   await pool.query(`CAll ActualizarStockILF('${Doc}',${inodec},@Salida)`);
   salida = "Listo";
   // while (salida == "esperando") {

   //    aux = await pool.query(`Select @salida;`);
   //    //console.log(aux);
   //    if (aux[0]['@salida'] == "listos") {
   //       salida = aux[0]['@salida'];
   //    }

   // }
   return res.send(salida);


});

const Upload = multer({
   storage,
   dest: path.join(__dirname, "../public/uploads")
}).single('file');

router.post('/SubirImg/:id', isLoggedin, Upload, async (req, res) => {
   //console.log(req.file);
   res.send('subido');

});

const lapd = (s, width, char) => {
   return (s.length >= width) ? s : (new Array(width).join(char) + s).slice(-width);
}

router.get('/UltimoCodigo/:Responsable', isLoggedin, async (req, res) => {

   const { Responsable } = req.params;
   Ccod = await pool.query(`Select Consecutivo FROM RegistroInventario WHERE estado = 'Edicion' and Responsable = '${Responsable}'`);
   if (Ccod.length > 0) {

      Cons = Ccod[0].Consecutivo;
      Codigo = (Cons.length >= 5) ? Cons : (new Array(5).join('0') + Cons).slice(-5);
      console.log(Codigo);

   } else {

      Ccod = await pool.query(`Select Consecutivo,ID FROM RegistroInventario WHERE estado = 'Disponible' ORDER BY Consecutivo ASC`);
      console.log(Ccod);
      if (Ccod.length > 0) {

         Cons = Ccod[0].Consecutivo;
         Codigo = (Cons.length >= 5) ? Cons : (new Array(5).join('0') + Cons).slice(-5);
         console.log(Codigo);
         await pool.query(`UPDATE RegistroInventario set estado='Edicion',Responsable='${Responsable}' where ID= ${Ccod[0].ID} `);

      } else {
         Ccod = await pool.query(`Select Consecutivo FROM RegistroInventario WHERE estado = 'Edicion' OR estado = 'Formalizado' OR estado = 'Finalizado' ORDER BY Consecutivo DESC`);
         console.log(Ccod);

         if (Ccod.length > 0) { Cons = Ccod[0].Consecutivo + 1 } else { Cons = 1 }

         Codigo = (Cons.length >= 5) ? Cons : (new Array(5).join('0') + Cons).slice(-5);

         Data = {
            Codigo,
            estado: 'Edicion',
            Responsable,
            Tipo: 'Nuevo',
            Consecutivo: Cons,
         }
         console.log(Data);
         await pool.query(`INSERT INTO RegistroInventario SET ?`, [Data]);
      }


   }


   res.send(Codigo);

});


router.post('/VariantesPAgg', isLoggedin, async (req, res) => {
   //console.log(req.body);
   Data = {
      Codigo_P:req.body.Codp,
      Codigo: req.body.Cod,
      Variacion: req.body.Variante,
      Cantidad: req.body.CntVar,
      imagen: req.body.img
   };

   console.log(Data);

   await pool.query(`INSERT INTO variaciones SET ? `, [Data]);

   res.sendStatus(200);

});

router.post('/VariantesPEdit/:id', isLoggedin, async (req, res) => {
   const { id } = req.params
   //console.log(id);
   Data = {
      Codigo_P:req.body.Codp,
      Codigo: req.body.Cod,
      Variacion: req.body.Variante,
      Cantidad: req.body.CntVar,
      imagen: req.body.img
   };
    console.log(Data);
   await pool.query(`UPDATE Variaciones set ? WHERE id = ${id} `, [Data]);


   res.sendStatus(200);

});

router.get('/VariantesPDel/:id', isLoggedin, async (req, res) => {
   const { id } = req.params
   //console.log(id);

   await pool.query(`DELETE FROM Variaciones WHERE id ='${id}' `);
   //console.log(Data);

   res.sendStatus(200);

});

router.get('/Variantes/:Cod', isLoggedin, async (req, res) => {
   const { Cod } = req.params
   console.log(Cod);
   //console.log(Data);
   Variantes=[];

   Variantes = await pool.query(`Select * from variaciones Where Codigo like '%${Cod}%' `);

   res.send(Variantes);

});


router.get('/VariantesTemp/:Cod', isLoggedin, async (req, res) => {
   const { Cod } = req.params
   //console.log(Cod);
   //console.log(Data);
   Variantes=[];

   Variantes = await pool.query(`Select * from variacionestemp Where Codigo like '%${Cod}%' `);

   res.send(Variantes);

});

router.post('/VariantesAgg', isLoggedin, async (req, res) => {
   //console.log(req.body);
   Data = {
      Codigo_P:req.body.Codp,
      Codigo: req.body.Cod,
      Variacion: req.body.Variante,
      Cantidad: req.body.CntVar,
      imagen: req.body.img
   };

   console.log(Data);

   await pool.query(`INSERT INTO variacionestemp SET ? `, [Data]);

   res.sendStatus(200);

});

router.get('/VariantesDel/:id', isLoggedin, async (req, res) => {
   const { id } = req.params
   //console.log(id);

   await pool.query(`DELETE FROM Variacionestemp WHERE id ='${id}' `);
   //console.log(Data);

   res.sendStatus(200);

});

router.post('/VariantesEdit/:id', isLoggedin, async (req, res) => {
   const { id } = req.params
   //console.log(id);
   Data = {
      Codigo_P:req.body.Codp,
      Codigo: req.body.Cod,
      Variacion: req.body.Variante,
      Cantidad: req.body.CntVar,
      imagen: req.body.img
   };
    console.log(Data);
   await pool.query(`UPDATE Variacionestemp set ? WHERE id = ${id} `, [Data]);


   res.sendStatus(200);

});

router.post('/NuevoInv', isLoggedin, async (req, res) => {

   console.log('Nuevo');

   const { Data } = req.body;
   // console.log(Data);
   await pool.query(`INSERT INTO  productotemp set ?`, [Data]);
   await pool.query(`UPDATE RegistroInventario set estado='Finalizado' where Codigo= ${Data.Codigo} `);

   res.sendStatus(200);

});

router.post('/NuevoInvEdit/:id', isLoggedin, async (req, res) => {
   const { id } = req.params
   //console.log(id);
   const { Data } = req.body
   //console.log(Data);
   await pool.query(`UPDATE productotemp set ? WHERE ID=${id}`, [Data]);


   res.sendStatus(200);

});

router.get('/NuevoInv', isLoggedin, async (req, res) => {

   //console.log(id);

   const Productos = await pool.query(`SELECT * FROM productotemp `);

   //console.log(Productos);

   res.send(Productos);

});

router.get('/NuevoInv/:User', isLoggedin, async (req, res) => {
   const {User}=req.params
   console.log(User);

   const Productos = await pool.query(`SELECT * FROM productotemp WHERE Responsable = '${User}' `);

   //console.log(Productos);

   res.send(Productos);

});

router.get('/NuevoInvDel/:id&:Cod', isLoggedin, async (req, res) => {
   const { id, Cod } = req.params
   //console.log(id);

   await pool.query(`DELETE FROM productotemp WHERE id ='${id}' `);

   await pool.query(`DELETE FROM variacionestemp WHERE Codigo like '%${Cod}%' `);

   await pool.query(`DELETE FROM DetalleInvLotFevTemp WHERE Producto = '${Cod}' && Tipo='Ninv'`);

   await pool.query(`UPDATE RegistroInventario set estado='Disponible' where Codigo= ${Cod} `);

   //console.log(Data);

   res.sendStatus(200);

});

router.get('/NuevoInvFormalizar/:id&:Cod', isLoggedin, async (req, res) => {
   const { id, Cod } = req.params
   //console.log(id);
   await pool.query(`DELETE FROM IMPCODIGO WHERE id>0 `); 
   await pool.query(`INSERT INTO producto (Codigo,Nombre,Marca,Iva,Descuento,PCompra,PVenta,PoC,Responsable,FechaRegistro,Cantidad,Presentacion,ImagenP,CampoBus) SELECT Codigo,Nombre,Marca,Iva,Descuento,PCompra,PVenta,PoC,Responsable,FechaRegistro,Cantidad,Presentacion,ImagenP,CampoBus FROM productotemp WHERE id ='${id}' `);
   await pool.query(`INSERT INTO variaciones (Codigo_P,Codigo,Variacion,Cantidad,imagen) SELECT Codigo_P,Codigo,Variacion,Cantidad,imagen FROM variacionestemp WHERE Codigo like '%${Cod}%'  `);
   await pool.query(`INSERT INTO stockinvlotfev (Cantidad,FechaVencimiento,Invima,Lote,Producto ) SELECT Cantidad,FechaVencimiento,Invima,Lote,Producto FROM detalleinvlotfevtemp WHERE Producto = '${Cod}' && Tipo='Ninv' `);
   await pool.query(`INSERT INTO detalleinvlotfev (Cantidad,FechaVencimiento,Invima,Lote,Producto,Documento,Tipo) SELECT Cantidad,FechaVencimiento,Invima,Lote,Producto,Documento,Tipo FROM detalleinvlotfevtemp WHERE Producto = '${Cod}' && Tipo='Ninv' `);
   
   await pool.query(`INSERT INTO stock (Existencias,Codigo,Codigo_p) SELECT Cantidad,Codigo,Codigo_P FROM variacionestemp WHERE Codigo like '%${Cod}%' `)
   //SELECT variaciones.Codigo,producto.Nombre,variaciones.Variacion,variaciones.Cantidad,round(producto.PVenta*(1+(producto.iva/100)),-1) FROM variaciones,producto  WHERE  (variaciones.Codigo_p = producto.Codigo) and (producto.Codigo = '${Cod}');
   
   await pool.query( `INSERT INTO impCodigo (Codigo,Nombre,Variacion,Cantidad, Precio) SELECT variaciones.Codigo,producto.Nombre,variaciones.Variacion,variaciones.Cantidad, round(producto.PVenta*(1+(producto.iva/100)),-1) FROM variaciones,producto  WHERE  (variaciones.Codigo_p = producto.Codigo) and (producto.Codigo = '${Cod}')`); 
   await pool.query(`INSERT INTO imp_trigger_2 set Codigo='1' `);
   await pool.query(`DELETE FROM productotemp WHERE id ='${id}' `);
   await pool.query(`DELETE FROM variacionestemp WHERE Codigo like '%${Cod}%' `);
   await pool.query(`DELETE FROM DetalleInvLotFevTemp WHERE Producto = '${Cod}' && Tipo='Ninv'`);
   await pool.query(`UPDATE RegistroInventario set estado='Formalizado' where Codigo= ${Cod} `);

   //console.log(Data);

   res.sendStatus(200);

});

module.exports = router;

