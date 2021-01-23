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
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `NitoCC` bigint DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `Tel1` bigint DEFAULT NULL,
  `Tel2` bigint DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Email` varchar(255) DEFAULT NULL,
  `Observaciones` varchar(255) DEFAULT NULL,
  `FechaActualizacion_Cliente` datetime DEFAULT NULL,
  `Puntos` int DEFAULT NULL,
  `NumeroRegistros` int DEFAULT NULL,
  `Mayorista` bit(1) DEFAULT NULL,
  `Ciudad` varchar(60) NOT NULL,
  `Departamento` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'CLIENTE OCASIONAL ',1,3204124,'01','leddentltda@hotmail.com','CORREGIDO dos veces','2020-07-13 00:00:00',0,0,_binary '\0','BOGOTA DC ','CUNDINAMARCA'),(45,'NOMBRE CORREGIDO',5646849,32000592,'DIRECCION CORREGIDA','xxx@xxx','CORREGIDO','2020-07-16 00:00:00',0,0,_binary '\0','BOGOTA DC ',''),(112,'PRUEBA ',3546546854,0,'111111111111','','','2020-07-16 00:00:00',0,0,_binary '\0','',''),(39611525,'YOLANDA SAMACA ',3203426960,0,'FUZAGASUGA ','','','2020-01-28 00:00:00',0,0,_binary '\0','',''),(900123407,'LEDDENT LTDA',3208004666,3204124,'Carrera 13 #41-36','leddentltda@hotmail.com','Base','2019-03-01 00:00:00',0,0,_binary '','',''),(900505174,'SUMDISCOM SAS',3008043034,0,'Carrera 45 a #95-3','','','2020-01-27 00:00:00',0,0,_binary '\0','',''),(1032459578,'JHERSSON CASTAÑO ',3115292678,0,'CARRERA 13 #41-36','','','2020-07-11 00:00:00',0,0,_binary '\0','',''),(900123407,'LEDDENT LTDA',3208004666,3204124,'Carrera 13 #41-36','leddentltda@hotmail.com','CORREGIDO',NULL,NULL,NULL,NULL,'BOGOTA DC ','CUNDINAMARCA');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-23 16:35:18
