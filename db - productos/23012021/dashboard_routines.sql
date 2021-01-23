CREATE DATABASE  IF NOT EXISTS `dashboard` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `dashboard`;
-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: dashboard
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping routines for database 'dashboard'
--
/*!50003 DROP FUNCTION IF EXISTS `ActualizarInv2` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `ActualizarInv2`(Doc varchar(60),incodec bool) RETURNS int
    MODIFIES SQL DATA
    DETERMINISTIC
BEGIN
	DECLARE Count INT DEFAULT 0;
    DECLARE CantStok INT DEFAULT 0;
	DECLARE Cod varchar(60) ;
    DECLARE CantDet INT DEFAULT 0;
    DECLARE a INT DEFAULT 0;
    
	SELECT COUNT(Item) 
	INTO Count
	FROM DetalleT Where Documento= Doc;
    
	if Count>0 then
		simple_loop: LOOP
			SET a=a+1;
			
			Select Cantidad into CantDet from Detallet Where Documento=Doc and Item=a limit 1;
			Select Producto into Cod from Detallet Where Documento=Doc and Item=a limit 1;
			if incodec = true then
			UPDATE Variaciones set Cantidad = Cantidad-CantDet where Codigo=Cod;
			else 
			UPDATE Variaciones set Cantidad = Cantidad+CantDet where Codigo=Cod;
			end if;
			
			 IF a=Count THEN
				LEAVE simple_loop;
			 END IF;
			 
		END LOOP simple_loop;    
	end if;
    select Cantidad into CantDet from Variaciones where Codigo=Cod;
	RETURN CantDet;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarInv` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `ActualizarInv`(in Doc varchar(60),in incodec bool, out Salida varchar(60) )
BEGIN
	DECLARE Count INT DEFAULT 0;
    DECLARE CantStok INT DEFAULT 0;
	DECLARE Cod varchar(60) ;
    DECLARE CantDet INT DEFAULT 0;
    DECLARE a INT DEFAULT 0;
    
	SELECT COUNT(Item) 
	INTO Count
	FROM DetalleT Where Documento= Doc;
    
	if Count>0 then
	simple_loop: LOOP
		SET a=a+1;
        
		Select Cantidad into CantDet from Detallet Where Documento=Doc and Item=a limit 1;
        Select Producto into Cod from Detallet Where Documento=Doc and Item=a limit 1;
        if incodec = true then
        UPDATE Variaciones set Cantidad = Cantidad-CantDet where Codigo=Cod;
        else 
        UPDATE Variaciones set Cantidad = Cantidad+CantDet where Codigo=Cod;
        end if;
        
		 IF a=Count THEN
			set Salida="listos";
			LEAVE simple_loop;
		 END IF;
		 
	END LOOP simple_loop;    
	end if;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `ActualizarStockILF` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
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
    if Count>0 then
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
	end if ;
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `NuevaTransaccion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `NuevaTransaccion`(in T varchar(60),in Resp varchar(60), out Cons int unsigned)
BEGIN
Declare ConsAux int unsigned;
Declare idAux int unsigned;
Declare Prefijo varchar(3);
Select Count(Responsable) into ConsAux from Registrotransacciones where Responsable=Resp and Estado = 'Edicion' and Transaccion = T;

if ConsAux>0 then 
	Select Consecutivo into ConsAux from Registrotransacciones where Responsable=Resp and Estado = 'Edicion' and Transaccion = T order by Consecutivo desc LIMIT 1;
	set Cons=ConsAux;
else
    Select Count(Responsable) into ConsAux from Registrotransacciones where Estado = 'Disponible' and Transaccion  = T ;
    if ConsAux>0 then 
		Select Consecutivo,Id into ConsAux,idaux from Registrotransacciones Where Estado = 'Disponible' and Transaccion  = T order by Consecutivo asc LIMIT 1;
        Update  Registrotransacciones set Estado = 'Edicion' where id=idAux;
		set Cons=ConsAux;
	else
		Select Consecutivo into ConsAux from Registrotransacciones Where (Estado = 'Finalizado' or Estado = 'Edicion') and Transaccion = T  order by Consecutivo Desc LIMIT 1;
        set Cons=ConsAux+1;
        select SUBSTRING(T,1,3) into Prefijo; 
        insert into  Registrotransacciones set Transaccion=T, MetodoEjecucion='Contado',  Tipo=0, Consecutivo=Cons, Documento=CONCAT(UPPER(Prefijo),Cons), Responsable=Resp, Estado = 'Edicion' ;
	end if;
end if;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `OrdenarItem` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `OrdenarItem`(in Doc varchar(60),out Salida varchar(60) )
BEGIN

DROP TEMPORARY TABLE IF EXISTS my_temp_table;
CREATE TEMPORARY TABLE my_temp_table
(
 idA int AUTO_INCREMENT PRIMARY KEY,
 ID int 
)
SELECT ID from DetalletTemp WHERE Documento = Doc order by ID asc;
Select * from my_temp_table;

UPDATE DetalletTemp AS dest , (SELECT * FROM my_temp_table WHERE id>0) AS src
SET dest.Item = src.idA
WHERE dest.ID=src.id ;

set Salida="listos";

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-23 16:35:27
