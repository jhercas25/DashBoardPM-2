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
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Codigo` varchar(60) DEFAULT NULL,
  `Nombre` varchar(90) NOT NULL,
  `Cantidad` int unsigned NOT NULL,
  `Marca` varchar(60) NOT NULL,
  `Presentacion` varchar(60) NOT NULL,
  `Iva` int unsigned DEFAULT NULL,
  `Descuento` int unsigned DEFAULT NULL,
  `PCompra` int unsigned NOT NULL,
  `PVenta` int unsigned NOT NULL,
  `PoC` int unsigned NOT NULL,
  `Responsable` varchar(60) NOT NULL,
  `FechaRegistro` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `ImagenP` varchar(60) DEFAULT NULL,
  `CampoBus` varchar(160) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Codigo` (`Codigo`),
  UNIQUE KEY `Codigo_2` (`Codigo`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (29,'00001','GEL ANTIBACTERIAL CLEAN HEART 3 Ldasdasd',0,'CLEAN HEART asdasd','asd',0,0,20000,25000,900123407,'Leonor','2021-01-18 20:25:49','00001-P.jpg','GEL ANTIBACTERIAL CLEAN HEART 3 Ldasdasd'),(30,'00002','OTRO PRODUCTO ',0,'CLEAN HEART asdasd','asd',19,0,50000,55460,900659252,'Leonor','2021-01-20 18:14:08','00002-P.jpg','OTRO PRODUCTO '),(31,'00003','GLUTARALDEHIDO GARHOX',0,'MARKET','GALON',19,0,2000,5040,900659252,'Leonor','2021-01-23 18:42:05','00003-P.jpg','GLUTARALDEHIDO GARHOX'),(32,'00005','GUANTES LATEX',0,'SAFE HEART','ASD',19,0,60000,71430,900123407,'Leonor','2021-01-23 18:54:50','00005-P.jpg','GUANTES LATEX'),(33,'00006','GUANTES NITRILO',0,'SAFE GLOVES','UNIDAD',19,0,5000,8000,900659252,'Leonor','2021-01-23 19:01:12','00006-P.jpg','GUANTES NITRILO');
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-23 16:35:24
