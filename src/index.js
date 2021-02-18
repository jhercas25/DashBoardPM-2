const express = require('express');

const morgan = require ('morgan');
const exphbs=require('express-handlebars');
const path=require('path'); 
const fs = require('fs');
const https=require('https');

const Quagga = require('@ericblade/quagga2').default; // Common JS (important: default);

const flash = require('connect-flash');

const session = require('express-session');
const Mysqlstore =require('express-mysql-session');

const passport=require('passport');
const { database } = require('./keys');
const { strict } = require('assert');


// inicializaciones 
require('./lib/passport');

const app= express ();
//
//seting

const httpsOpstions={
    cert: fs.readFile(path.join(__dirname,'ssl/','server.crt'),"utf8", function (err, data) {
        if(err) console.log('error', err); }),
    keys: fs.readFile(path.join(__dirname,'ssl/','server.key'),"utf8", function (err, data) {
    if(err) console.log('error', err); }),   

}

app.set('port', process.env.PORT || 8000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:"main",
    layoutsDir:path.join(app.get('views'),'layouts'),
    partilsDir :path.join(app.get('views'),'partials'),
    extname:".hbs",
    helpers : require('./lib/handlebars')
}));

app.set('view engine','hbs');

//MIDDLEWARES
app.use(session({
    secret:'secretesdskye',
    resave: false,
    saveUninitialized: false,
    store: new Mysqlstore(database)

}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());


//variables globales 
app.use((req,res,next) =>{
    app.locals.success=req.flash('success');
    app.locals.msg=req.flash('msg');
    app.locals.user = req.user;
    //app.locals.productos=;
    //console.log(app.locals.success);
    next();
})


//rutas 
app.use(require('./routes/index.js'));
app.use(require('./routes/autentication.js'));
app.use('/impCod',require('./routes/ImpCodigos.js'));
app.use('/Inv',require('./routes/inventario.js'));
app.use('/Tran',require('./routes/Transacciones.js'));
app.use('/envios',require('./routes/envios.js'));
app.use('/PoC',require('./routes/PoC.js'));
app.use('/Rep',require('./routes/reportes.js'));
app.use('/Caja',require('./routes/caja.js'));

//Publicos 
app.use(express.static(path.join(__dirname,'public')));

app.use(require('./routes'));
app.use((req, res,next)=>{
    res.render('./errors/404');
 });

// iniciar servidor https.createServer(httpsOpstions,app)
app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});

