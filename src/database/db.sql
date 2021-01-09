use Dashboard;

create table users(
    id int(11) not null primary key auto_increment ,
    fullname varchar (100) not null,
    usename varchar(16) not null,
    password varchar(60) not null
    
);


create table IMP_stiker(
    id int(11) not null primary key auto_increment ,
    Codigo varchar (60) not null,
    Nombre  varchar(16) not null,
    Precio varchar(60) not null,
    Cant varchar(60) not null
);


DESCRIBE Temp_stiker



 Create Table GEnvios (id INT(8) AUTO_INCREMENT PRIMARY KEY, 
 NitoCC INT(64) NOT NULL , 
 Destinatario VARCHAR(60) NOT NULL,
 Remitente VARCHAR (3) NOT NULL, 
 Direccion VARCHAR(60) NOT NULL, 
 Telefono VARCHAR(16) NOT NULL, 
 Ciudad VARCHAR(32) NOT NULL, 
 Municipio VARCHAR(32)  );

ALTER TABLE GEnvios
ADD Destinatario VARCHAR(60) NOT NULL,
DROP COLUMN Remitente,
ADD Remitente VARCHAR (3) NOT NULL   ;


--+--------------+-------------+------+-----+---------+----------------+
--| id           | int(8)      | NO   | PRI | NULL    | auto_increment |
--| NitoCC       | int(64)     | NO   |     | NULL    |                |
--| Direccion    | varchar(60) | NO   |     | NULL    |                |
--| Telefono     | varchar(16) | NO   |     | NULL    |                |
--| Ciudad       | varchar(32) | NO   |     | NULL    |                |
--| Municipio    | varchar(32) | YES  |     | NULL    |                |
--| Destinatario | varchar(60) | NO   |     | NULL    |                |
--| Remitente    | varchar(3)  | NO   |     | NULL    |                |
--+--------------+-------------+------+-----+---------+----------------+


INSERT INTO genvios (NitoCC, 
 Destinatario,
 Direccion, 
 Telefono, 
 Ciudad,
 Remitente)
VALUES (900123407,'DetinosDSFSDF' ,'Av siempre Viva 5678','555-55555','springfield','LED');


 Create Table PoC  (
 ID INT AUTO_INCREMENT PRIMARY KEY,
 NitoCC INT UNSIGNED  
 Nombre VARCHAR(120) NOT NULL,
 Contacto VARCHAR(120) ,
 Direccion VARCHAR(120) NOT NULL,
 Tel1 INT UNSIGNED NOT NULL, 
 Tel2 INT UNSIGNED,
 Ciudad VARCHAR(60) NOT NULL, 
 Departamento  VARCHAR(60),
 Email VARCHAR(120),
 Observaciones VARCHAR(200),
 FechaModificacion TIMESTAMP default current_timestamp, 
 Tipo VARCHAR(5) NOT NULL,
 Regimen VARCHAR(5) ,
 ActividadPricipal INT(8) UNSIGNED,
 Rut VARCHAR(200) ,
 CamaraComercio VARCHAR(200),
 PoC boolean not null

 );

Create Table Transaccion  (
 ID AUTO_INCREMENT PRIMARY KEY,
 Consecutivo INT(8) UNSIGNED, 
 FechaEmision TIMESTAMP default current_timestamp, 
 FechaVencimiento TIMESTAMP default current_timestamp, 
 FechaModificacion TIMESTAMP default current_timestamp, 
 MetodoEjecucion VARCHAR (60) NOT NULL, 
 Tipo VARCHAR(60) NOT NULL, 
 Operador INT(8) UNSIGNED NOT NULL ,
 Responsable VARCHAR(40) NOT NULL,
 Dependencia VARCHAR(40) NOT NULL,

 INDEX Operador,
 FOREIGN KEY (Operador) REFERENCES parent(id)

 );


Create Table RegistroTransacciones (
    
 ID AUTO_INCREMENT PRIMARY KEY,
 Consecutivo INT(8) UNSIGNED, 
 MetodoEjecucion VARCHAR (60) NOT NULL, 
 FechaModificacion TIMESTAMP default current_timestamp, 
 Tipo VARCHAR(60) NOT NULL, 
 Responsable VARCHAR(40) NOT NULL,
 
 );

 Create Table StockInvLotFev (
    
 ID AUTO_INCREMENT PRIMARY KEY,
 Producto VARCHAR (60) NOT NULL, 
 Invima VARCHAR (60) , 
 Lote VARCHAR (60) , 
 FechaVencimiento TIMESTAMP, 
 FechaIngreso TIMESTAMP default current_timestamp, 
 Cantidad INT UNSIGNED, 
 
 );

Create Table DetalleInvLotFev (
    
 ID int AUTO_INCREMENT PRIMARY KEY, 
 FechaRegistro TIMESTAMP default current_timestamp, 
 Cantidad INT UNSIGNED, 
 Documento VARCHAR (60) NOT NULL, 
 item INT UNSIGNED,  
 Tipo VARCHAR (60) NOT NULL, 
 
 );

 Create Table DetalleInvLotFevTemp (
    
 ID int AUTO_INCREMENT PRIMARY KEY, 
 FechaRegistro TIMESTAMP default current_timestamp, 
 Cantidad INT UNSIGNED, 
 Documento VARCHAR (60) NOT NULL, 
 item INT UNSIGNED,  
 Tipo VARCHAR (60) NOT NULL, 
 
 );

 Create Table DetalleT (
    
 ID AUTO_INCREMENT PRIMARY KEY,
 Documento  VARCHAR (60) NOT NULL, 
 Item INT UNSIGNED NOT NULL, 
 Producto VARCHAR (60) NOT NULL, 
 Cantidad INT UNSIGNED NOT NULL, 
 ValorV INT UNSIGNED NOT NULL,
 Descuento FLOAT UNSIGNED NOT NULL,
 Total INT UNSIGNED NOT NULL,
 Iva INT UNSIGNED NOT NULL,
 
 FechaEjecucion TIMESTAMP default current_timestamp, 
 Tipo VARCHAR(60) NOT NULL, 
 
 
 );

  Create Table DetalleTTemp (
    
 ID AUTO_INCREMENT PRIMARY KEY,
 Documento  VARCHAR (60) NOT NULL, 
 Item INT UNSIGNED NOT NULL, 
 Producto VARCHAR (60) NOT NULL, 
 Cantidad INT UNSIGNED NOT NULL, 
 ValorV INT UNSIGNED NOT NULL,
 Descuento FLOAT UNSIGNED NOT NULL,
 Total INT UNSIGNED NOT NULL,
 Iva INT UNSIGNED NOT NULL,
 
 FechaEjecucion TIMESTAMP default current_timestamp, 
 Tipo VARCHAR(60) NOT NULL, 
 
 
 );

 ALTER TABLE poc 
 ADD AE INT NOT NULL;

  ALTER TABLE poc 
 ADD Tica float  NOT NULL;


Create Table Transacciones(
    
 ID INT AUTO_INCREMENT PRIMARY KEY,
 Documento  VARCHAR (60) NOT NULL, 
 Tipo  VARCHAR (60) NOT NULL,
 PoC INT UNSIGNED NOT NULL,
 FechaEmision TIMESTAMP default current_timestamp, 
 FechaVencimiento TIMESTAMP default current_timestamp, 
 FechaEjecucion TIMESTAMP default current_timestamp, 
 MedioDePago  VARCHAR (60) NOT NULL,
 Plazo  VARCHAR (60) NOT NULL,
 Subtotal INT UNSIGNED NOT NULL,
 Descuento FLOAT UNSIGNED NOT NULL,
 Iva INT UNSIGNED NOT NULL,
 ReteIva float NOT NULL,
 ReteIca float NOT NULL,
 ReteFuente float NOT NULL,
 Total INT UNSIGNED NOT NULL,  
 
 );

 Create Table Pagos(
    
 ID INT AUTO_INCREMENT PRIMARY KEY,
 Documento  VARCHAR (60) NOT NULL, 
 Tipo  VARCHAR (60) NOT NULL,
 PoC INT UNSIGNED NOT NULL,
 FechaEjecucion TIMESTAMP default current_timestamp, 
 MedioDePago  VARCHAR (60) NOT NULL,
 Plazo  VARCHAR (60) NOT NULL,
 Referencia VARCHAR (60),
 MontoEfectivo FLOAT UNSIGNED NOT NULL,
 MontoTarjeta FLOAT UNSIGNED NOT NULL,  
 MontoRecibido FLOAT UNSIGNED NOT NULL,   
 Cambio FLOAT UNSIGNED NOT NULL,  
 Total FLOAT UNSIGNED NOT NULL,  
 
 );

 Create Table ProdutoTemp (
    
 ID int AUTO_INCREMENT PRIMARY KEY, 
 Codigo VARCHAR (60) NOT NULL, 
 Nombre VARCHAR (90) NOT NULL, 
 Cantidad INT UNSIGNED NOT NULL,
 Marca VARCHAR (60) NOT NULL, 
 Presentacion VARCHAR (60) NOT NULL, 
 Iva INT UNSIGNED,
 Descuento INT UNSIGNED,  
 PCompra INT UNSIGNED NOT NULL, 
 PVenta INT UNSIGNED NOT NULL, 
 PoC INT UNSIGNED NOT NULL,

 Responsable  VARCHAR (60) NOT NULL, 
 FechaRegistro TIMESTAMP default current_timestamp,  
 
 );

Create Table Variaciones (
    
 ID int AUTO_INCREMENT PRIMARY KEY, 
 Codigo VARCHAR (60) NOT NULL, 
 Variacion VARCHAR (90) NOT NULL, 
 Cantidad INT UNSIGNED,
 imagen INT UNSIGNED,  

 FechaRegistro TIMESTAMP default current_timestamp,  
 
 );

 Create Table RegistroInventario (
    
 ID AUTO_INCREMENT PRIMARY KEY,
 Consecutivo INT(8) UNSIGNED, 
 Codigo VARCHAR (60) NOT NULL, 
 FechaModificacion TIMESTAMP default current_timestamp, 
 Tipo VARCHAR(60) NOT NULL, 
 Responsable VARCHAR(40) NOT NULL,
 
 );


--------------------------- STORED PROCEDURE ---------------------------------------------------------------------------------
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActualizarInv`(in Doc INT unsigned,in incodec bool, out Salida varchar(60) )
BEGIN
	DECLARE Count INT DEFAULT 0;
    DECLARE CantStok INT DEFAULT 0;
	DECLARE Cod varchar(60) ;
    DECLARE CantDet INT DEFAULT 0;
    DECLARE a INT DEFAULT 0;
    
	SELECT COUNT(Item) 
	INTO Count
	FROM DetalleT Where Documento= Doc;
	
	simple_loop: LOOP
		SET a=a+1;
        
		Select Cantidad into CantDet from Detallet Where Documento=Doc and Item=a;
        Select Producto into Cod from Detallet Where Documento=Doc and Item=a;
        if incodec = true then
        UPDATE stock set existencias = existencias-CantDet where CodigoProducto=Cod;
        else 
        UPDATE stock set existencias = existencias+CantDet where CodigoProducto=Cod;
        end if;

		 IF a=Count THEN
			set Salida="listos";
			LEAVE simple_loop;
		 END IF;
		 
	END LOOP simple_loop;    

END

CREATE DEFINER=`root`@`localhost` PROCEDURE `ActualizarStockILF`(in Doc varchar(60),in incodec bool, out Salida varchar(60))
BEGIN
	DECLARE Count INT DEFAULT 0;
    DECLARE CantStok INT DEFAULT 0;
	DECLARE Cod varchar(60) ;
    DECLARE Lot varchar(60) ;
    DECLARE FeV varchar(60) ;
    DECLARE Inv varchar(60) ;
    
    DECLARE CantDet INT DEFAULT 0;
    DECLARE a INT DEFAULT 0;
    
	SELECT COUNT(Item) 
	INTO Count
	FROM detalleinvlotfev Where Documento= Doc;
    
    DROP TEMPORARY TABLE IF EXISTS auxt;
	CREATE TEMPORARY TABLE auxt
	(
	 idA int AUTO_INCREMENT PRIMARY KEY
	)
	SELECT ID,Producto,Invima,Lote,FechaVencimiento,Cantidad from DetalleinvLotFev WHERE Documento = Doc order by ID asc;
	Select * from auxT;
    
	simple_loop: LOOP
		SET a=a+1;
        
		Select Cantidad into CantDet from auxT Where  idA=a;
        Select Producto into Cod from auxT Where  idA=a;
        
        Select Lote  into Lot from auxT Where  idA=a;
        Select FechaVencimiento  into Fev from auxT Where idA=a;
        Select Invima  into Inv from auxT Where  idA=a;
		
        if incodec = true then
        UPDATE stockinvlotfev set Cantidad = Cantidad-CantDet where Producto=Cod and Invima=Inv and Lote=Lot and FechaVencimiento=Fev;
        else 
        UPDATE stockinvlotfev set Cantidad = Cantidad+CantDet where Producto=Cod and Invima=Inv and Lote=Lot and FechaVencimiento=Fev;
        end if;
		
		 IF a=Count THEN
			set Salida="listos";
			LEAVE simple_loop;
		 END IF;
		 
	END LOOP simple_loop;   
END

--------------------------- STORED PROCEDURE ---------------------------------------------------------------------------------

