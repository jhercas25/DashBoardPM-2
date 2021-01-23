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
-- Table structure for table `transacciones`
--

DROP TABLE IF EXISTS `transacciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transacciones` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Documento` varchar(60) DEFAULT NULL,
  `Tipo` varchar(60) NOT NULL,
  `PoC` int unsigned NOT NULL,
  `FechaEmision` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaVencimiento` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `FechaEjecucion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `MedioDePago` varchar(60) NOT NULL,
  `Plazo` varchar(60) NOT NULL,
  `Subtotal` int unsigned NOT NULL,
  `Descuento` float unsigned NOT NULL,
  `Iva` float unsigned NOT NULL,
  `ReteIva` float NOT NULL,
  `ReteIca` float NOT NULL,
  `ReteFuente` float NOT NULL,
  `Total` float unsigned NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Documento` (`Documento`)
) ENGINE=InnoDB AUTO_INCREMENT=196 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transacciones`
--

LOCK TABLES `transacciones` WRITE;
/*!40000 ALTER TABLE `transacciones` DISABLE KEYS */;
INSERT INTO `transacciones` VALUES (194,'MAR15','Compras',900659252,'2021-01-23 05:00:00','2021-01-23 05:00:00','2021-01-23 19:21:10','OpcEfectivo','Contado',31092,0,5900,0,0,0,37000),(195,'VEN2','Ventas',1032459578,'2021-01-23 05:00:00','2021-01-23 05:00:00','2021-01-23 20:50:33','OpcEfectivo','Contado',166387,0,31600,0,0,0,198000);
/*!40000 ALTER TABLE `transacciones` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-23 16:35:15
