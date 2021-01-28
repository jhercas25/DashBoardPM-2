const express =  require('express');
const router= express.Router();
const pool=require('../database');
const passport=require('passport');
const {isLoggedin,isnotloggedin}=require('../lib/auth');

router.get('/',isLoggedin,(req,res) =>{
    res.render('Reportes/Reportes');
});


const CrearPDF = async (req, res, next) => {

    const { Doc, Tp } = req.params;
    //console.log(Doc+' tipo '+Tp);
    const Detalle = await pool.query(`SELECT detallet.* , producto.Nombre FROM detallet,producto where (detallet.Codigo=producto.Codigo) and (Producto.PoC = '${PoC}'  and detallet.Tipo='Ventas')`);
    //const T = await pool.query(`SELECT transacciones.Documento,transacciones.Tipo,transacciones.FechaEmision,transacciones.Total,transacciones.poc,PoC.Nombre FROM transacciones,PoC where (transacciones.PoC=PoC.NitoCC) and (transacciones.Documento = '${Doc}' and transacciones.Tipo= '${Tp}')`);
    //console.log(T, Detalle);
    r = await PDFcreator.Crear(0, { Detalle, T });

    return next();
}


router.get('/His/:Tipo&:FD&:FA',isLoggedin, async (req,res)  =>{ 
    const{Tipo,FD,FA}=req.params
    console.log({Tipo,FD,FA});
    const Detalle = await pool.query(`SELECT detallet.* , producto.Nombre FROM detallet,producto where (detallet.Codigo=producto.Codigo) and (detallet.FechaEjecucion between'${FD}'  and  '${FA}') and (detallet.Tipo='${Tipo}')`);
    console.log(Detalle);
    res.send(Detalle);
});

router.get('/:Tipo&:FD&:FA&:PoC',isLoggedin,CrearPDF, async (req,res)  =>{ 

    const{Tipo,FD,FA,PoC}=res.params
    console.log({Tipo,FD,FA,PoC});
    const Detalle = await pool.query(`SELECT detallet.* , producto.Nombre FROM detallet,producto where (detallet.Codigo=producto.Codigo) and (detallet.FechaEjecucion between'${FD}'  and  '${FA}') and (Producto.Fech = '${PoC}'  and detallet.Tipo='${Tipo}')`);

    res.send(Detalle);
});

router.post('/ImpReporte',isLoggedin,CrearPDF, async (req,res)  =>{
    
    res.render('envios/envios');
});

module.exports =router;