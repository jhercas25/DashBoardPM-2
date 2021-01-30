const express =  require('express');
const router= express.Router();
const pool=require('../database');
const passport=require('passport');
const {isLoggedin,isnotloggedin}=require('../lib/auth');
const PDFcreator = require('../lib/PDF');

router.get('/',isLoggedin,(req,res) =>{
    res.render('Reportes/Reportes');
});


const CrearPDF = async (req, res, next) => {

    const { Data,T } = req.body;
    
    console.log('Datos imp ',T);
    r = await PDFcreator.Crear(0,{ Data, T });

    return next();
}


router.get('/His/:Tipo&:FD&:FH',isLoggedin, async (req,res)  =>{ 
    const{Tipo,FD,FH}=req.params
    //console.log({Tipo,FD,FH});
   
    const Detalle = await pool.query(` SELECT Transacciones.*, sum( detallet.Valor) as TotalSP,PoC.Nombre FROM transacciones,detallet,producto,PoC where (transacciones.documento=detallet.documento) and (detallet.Codigo = Producto.Codigo) and (transacciones.PoC = PoC.NitoCC) and (transacciones.FechaEmision between '${FD}' and  '${FH}') and  detallet.Tipo='${Tipo}'  group by detallet.Documento`);
    //console.log(Detalle);
    res.send(Detalle);
});

router.get('/HisPoC/:PoC&:Tipo&:FD&:FH',isLoggedin, async (req,res)  =>{ 

    const{Tipo,FD,FH,PoC}=req.params

    console.log({Tipo,FD,FH,PoC});
    const Detalle = await pool.query(`SELECT Transacciones.*, sum( detallet.Valor) as TotalSP,PoC.Nombre FROM transacciones,detallet,producto,PoC where (transacciones.documento=detallet.documento) and (transacciones.PoC = PoC.NitoCC) and (detallet.Codigo = Producto.Codigo) and (transacciones.FechaEmision between'${FD}'  and  '${FH}') and  detallet.Tipo='${Tipo}' and  (producto.PoC='${PoC}')  group by detallet.Documento`);

    res.send(Detalle);
});

router.get('/RepDet/:Doc&:PoC',isLoggedin, async (req,res)  =>{ 

    const{PoC,Doc}=req.params

    console.log({PoC,Doc});

    if(PoC!='NOPOC'){
        sql=`SELECT detallet.*, producto.Nombre,producto.Iva,producto.PCompra,producto.PoC FROM detallet,producto where (detallet.Codigo=producto.Codigo) and detallet.Documento='${Doc}' and Producto.PoC='${PoC}'`
    }else{
        sql=`SELECT detallet.*, producto.Nombre,producto.Iva,producto.PCompra,producto.PoC FROM detallet,producto where (detallet.Codigo=producto.Codigo) and detallet.Documento='${Doc}' `
    }

    const Detalle = await pool.query(sql);

    res.send(Detalle);
});

router.post('/ImpReporte',isLoggedin,CrearPDF, async (req,res)  =>{
        console.log('peticion',req.body);
        res.sendStatus(200);
});

module.exports =router;