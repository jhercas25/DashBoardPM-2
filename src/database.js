const mysql=require('mysql');
const {promisify}=require('util');
const {database} =require('./keys');

const pool = mysql.createPool(database);

pool.getConnection((err,connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONECTION_LOST'){
            console.error('DATABASE CONECTION LOST');
        }
        if(err.code==='ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }
        if(err.cod === 'ECONNREFUSED'){
            console.erro('DATABASE CONECCION REFUSE');
        }
    }
    if(connection) connection.release();
    console.log('DB is Coneccted');
    return;
});

pool.query=promisify(pool.query);

module.exports = pool;

