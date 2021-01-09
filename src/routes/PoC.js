const express =  require('express');
const router= express.Router();
const pool=require('../database');
const passport=require('passport');
const {isLoggedin,isnotloggedin}=require('../lib/auth');

router.get('/',isLoggedin,(req,res) =>{
    res.render('/');
});

router.get('/Clientes',isLoggedin,async (req,res)  =>{
    
    //await pool.query ('Select * Clientes') ;
    const prov=false;
    res.render('PoC/poc',{prov});
});

router.get('/Proveedores',isLoggedin,async (req,res)  =>{
    
    // await pool.query ('Select * Proveedores ') ;
    const prov=true;
     res.render('PoC/poc',{prov});
 });
//Todos los datos
router.get('/Clientes/datos',isLoggedin,async (req,res)  =>{  
    const Clientes= await pool.query ('Select * from poc Where PoC = 0');
    //console.log(Clientes);
    return res.send(Clientes);
});

 
router.get('/Proveedores/datos',isLoggedin,async (req,res)  =>{
     const Provedores=await pool.query ('Select * from poc Where PoC = 1 ') ;
     //console.log(Provedores);
     return res.send(Provedores);
 });

 //Todos los datos individuales nit 
 router.get('/Clientes/datos/nit/:id',isLoggedin,async (req,res)  =>{  
    const {id} = req.params;
    const Clientes= await pool.query (`Select * from poc where NitoCC like '%${id}%'  and PoC = 0`);
    //console.log(Clientes);
    return res.send(Clientes);
});

router.get('/Proveedores/datos/nit/:id',isLoggedin,async (req,res)  =>{
    const {id} = req.params;
     const Provedores = await pool.query (`Select * from poc where NitoCC like '%${id}%'  and PoC = 1`) ;
     //console.log(Provedores);
     return res.send(Provedores);
 });
 
  //Todos los datos individuales nit unicos
  router.get('/Clientes/datos/nit/U/:id',isLoggedin,async (req,res)  =>{  
    const {id} = req.params;
    const Clientes= await pool.query (`Select * from poc where NitoCC = ${id} and  PoC = 0 `);
   // console.log("el cliente es "+Clientes +"y el nit"+id );
    return res.send(Clientes);
});

router.get('/Proveedores/datos/nit/U/:id',isLoggedin,async (req,res)  =>{
    const {id} = req.params;
     const Provedores=await pool.query (`Select * from poc where NitoCC = ${id} and PoC=1 `) ;
     //console.log(Provedores);
     return res.send(Provedores);
 });

 //Todos los datos individuales nombre 
 router.get('/Clientes/datos/nomb/:id',isLoggedin,async (req,res)  =>{  
     const {id} = req.params;
    const Clientes= await pool.query (`Select * from PoC where Nombre like  '%${id}%' and PoC = 0`);
    //console.log(Clientes);
    return res.send(Clientes);
});

router.get('/Proveedores/datos/nomb/:id',isLoggedin,async (req,res)  =>{
    const {id} = req.params;
     const Provedores=await pool.query (`Select * from provedores where Nombre like '%${id}%' and PoC = 1`) ;
     //console.log(Provedores);
     return res.send(Provedores);
 });

 //Editar o Crear 

 router.post('/Clientes/CoE',isLoggedin,async (req,res)  =>{
    const {NitoCC,Nombre,Direccion,Telefono,Telefono2,Ciudad,Departamento,Email,Observaciones} = req.body;
    
    const PoC={NitoCC,Nombre,Direccion,Tel1:Telefono,Tel2 : Telefono2,Ciudad,Departamento,Email,Observaciones,PoC:"0"}
    if(req.body.Editar =="0"){
        //console.log("Creando");
        await pool.query ('INSERT INTO poc SET ?',[PoC]) ;
    }else{
        const PoC={Nombre,Direccion,Tel1:Telefono,Tel2 : Telefono2,Ciudad,Departamento,Email,Observaciones,PoC:"0"}
        // console.log("Editando");
        //console.log(PoC);
        await pool.query ('UPDATE poc SET ? where NitoCC = ?',[PoC,req.body.NitoCC]) ;
    }
    
    res.redirect('/poc/Clientes');
    
 });


 router.post('/Proveedores/CoE',isLoggedin,async (req,res)  =>{
     
    const {NitoCC,Nombre,Direccion,Telefono,Telefono2,Ciudad,Departamento,Email,Observaciones} = req.body;
    
    const PoC={NitoCC,Nombre,Direccion,Tel1:Telefono,Tel2 : Telefono2,Ciudad,Departamento,Email,Observaciones,PoC:"1"}
     //const Provedores=await pool.query (`Select * from provedores where Nombre like '%${id}%'`) ;
     if(req.body.Editar =="0"){
       // console.log("Creando");
        await pool.query ('INSERT INTO poc  SET ?',[PoC]) ;
    }else{
        const PoC={Nombre,Direccion,Tel1:Telefono,Tel2 : Telefono2,Ciudad,Departamento,Email,Observaciones,PoC:"1"}
       /// console.log("Editando");
        await pool.query ('UPDATE poc  SET ? where NitoCC = ?',[PoC,req.body.NitoCC]) ;
    }

    
    res.redirect('/poc/Proveedores');

 });


 router.post('/ActReg/:id',isLoggedin,async (req,res)  =>{
     
    const {id} = req.params;
    
    await pool.query (`UPDATE poc set NumFacturas=NumFacturas+1 where NitoCC = '${id}'`) ;
    
    res.sendStatus(200);

 });
 






module.exports =router;