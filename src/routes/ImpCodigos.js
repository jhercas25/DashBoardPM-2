const express =  require('express');
const router= express.Router();

const pool=require('../database');
const {isLoggedin}= require('../lib/auth')



router.get('/',isLoggedin,async(req,res)=>{

    const stikers = await pool.query ('SELECT * FROM Temp_stiker') ;
    console.log(stikers);
     res.render('./impCod/ingresar',{stikers});
 
 });

 router.get('/historial',isLoggedin,async(req,res)=>{

    const stikers = await pool.query ('SELECT * FROM impreso ORDER BY fecha ASC') ;
   // console.log(stikers);
     res.render('./impCod/historial',{stikers});
 
 });

 router.post('/agregar',isLoggedin,async(req,res)=>{

    //console.log(req.body)
    await pool.query ('INSERT INTO Temp_stiker SET ?',[req.body]) ;
    //console.log

     res.redirect('/impCod');
 
 });

 router.get('/historial/:id',isLoggedin,async(req,res)=>{

    const {id}=req.params;
    console.log(id)
    const stiker = await pool.query ('SELECT * FROM Impreso WHERE id= ? ',[id]);
    console.log(stiker)
    if(stiker){
        const {Nombre,Codigo,Cant,Precio}= stiker[0];
            newstiker = {
                Nombre,
                Codigo,
                Cant,
                Precio
            }
    await pool.query ('INSERT INTO Temp_stiker SET ?',[newstiker]) ;
    //console.log
    req.flash('success','stiker agregado a la lista de impresion')
    return res.redirect('/impCod/historial');
    }
    req.flash('msg','id no encontrado')
    return res.redirect('/impCod/historial');
 
 });


 router.post('/imprimir',isLoggedin,async(req,res)=>{

    
    await pool.query ('Delete from imp_stiker where id >0') ;
    const stikers = await pool.query ('SELECT * FROM Temp_stiker') ;
    //console.log('imprimiendo stikers ' + stikers[0].Nombre)
    
    if(stikers.length>0){
        console.log(stikers.length)
        for (i=0;i<(stikers.length);i++){
            console.log('historial');
            const {id,Nombre,Codigo,Cant,Precio}= stikers[i];
                
            newstiker = {
                id,
                Nombre,
                Codigo,
                Cant,
                Precio
            }
        
        await pool.query ('INSERT INTO Imp_stiker SET ?',[newstiker]) ;
        console.log('historial');
        await pool.query ('INSERT INTO Impreso SET ?',[newstiker]) ;
        
        }
        pool.query ('Delete from Temp_stiker where id >0') ;
        const TG={
            Tg:true
        }
        await pool.query ('INSERT INTO Imp_trigger SET ?',[TG]) ;
        req.flash('success','todo mono');
        return res.redirect('/impCod');
    }
    req.flash('success','No hay stikers para imprimir');
    res.redirect('/impCod');
    
 
 });

 router.get('/eliminar/:id',isLoggedin,async(req,res)=>{

    const {id}=req.params;
    //console.log(id)
    await pool.query ('DELETE FROM Temp_stiker WHERE id= ?',[id]) ;
    //console.log(req.body)
    //await pool.query ('INSERT INTO Temp_stiker SET ?',[req.body]) ;
     res.redirect('/impCod');
 
 });
 router.get('/:id',isLoggedin,async(req,res)=>{

    const {id}=req.params;
    const stiker = await pool.query ('SELECT * FROM Temp_stiker WHERE id= ?',[id]);
    const stikers = await pool.query ('SELECT * FROM Temp_stiker') ;
    //console.log(stiker.Codigo);

    res.render('./impCod/ingresar',{stiker:stiker[0],stikers});
    
    //res.redirect('/impCod',);
 
 });

 router.post('/agregar/:id',isLoggedin,async(req,res)=>{
    const {id}=req.params;
    const {Nombre,Codigo,Cant,Precio}=req.body
    console.log(req.body.Nombre);
    newstiker = {
        Nombre,
        Codigo,
        Cant,
        Precio
    }
    console.log(newstiker);
    await pool.query ('UPDATE Temp_stiker SET ? WHERE id=?',[newstiker,id]) ;
    //req.flash('success', 'link editado correctamente');

     res.redirect('/impCod');
 
 });

module.exports =router;

