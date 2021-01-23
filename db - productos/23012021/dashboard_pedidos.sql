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
-- Table structure for table `pedidos`
--

DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedidos` (
  `IdPedido` int DEFAULT NULL,
  `Fecha_Pedido` datetime DEFAULT NULL,
  `FechaEntrega_Pedido` datetime DEFAULT NULL,
  `FechaSolicitado_Pedido` datetime DEFAULT NULL,
  `FechaAprobado_Pedido` datetime DEFAULT NULL,
  `FechaCancelado_Pedido` datetime DEFAULT NULL,
  `Proveedor_Pedido` int DEFAULT NULL,
  `TotalPedido_Pedido` double DEFAULT NULL,
  `TotalIva_Pedido` double DEFAULT NULL,
  `TotalVIva_Pedido` double DEFAULT NULL,
  `Creado_Pedido` bit(1) DEFAULT NULL,
  `Recibido_Pedido` bit(1) DEFAULT NULL,
  `Solicitado_Pedido` bit(1) DEFAULT NULL,
  `Cancelado_Pedido` bit(1) DEFAULT NULL,
  `Aprobado_Pedido` bit(1) DEFAULT NULL,
  `Observaciones_Pedido` mediumtext,
  `TipodePago_Pedido` varchar(255) DEFAULT NULL,
  `Item` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedidos`
--

LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
INSERT INTO `pedidos` VALUES (-7,'2020-09-10 00:00:00',NULL,NULL,NULL,NULL,900123407,124950,19950,105000,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',NULL,'CONTADO',0),(1,'2020-09-01 00:00:00','2020-09-04 00:00:00','2020-09-01 00:00:00','2020-09-01 00:00:00',NULL,900659252,264000,11496,252504,_binary '',_binary '',_binary '',_binary '\0',_binary '',NULL,'CONTADO',0),(2,'2020-09-08 00:00:00',NULL,'2020-09-08 00:00:00','2020-09-08 00:00:00',NULL,2,45000,0,45000,_binary '',_binary '\0',_binary '',_binary '\0',_binary '',NULL,'CONTADO',0),(3,'2020-09-08 00:00:00',NULL,'2020-09-08 00:00:00','2020-09-08 00:00:00','2020-09-08 00:00:00',900123407,231930,0,231930,_binary '',_binary '\0',_binary '',_binary '',_binary '',NULL,'CONTADO',0),(4,'2020-09-08 00:00:00',NULL,'2020-08-09 00:00:00','2020-09-08 00:00:00','2020-09-08 00:00:00',830087745,374850,59850,315000,_binary '',_binary '\0',_binary '',_binary '',_binary '',NULL,'CONTADO',0),(5,'2020-09-10 00:00:00','2020-09-10 00:00:00','2020-09-10 00:00:00','2020-09-10 00:00:00',NULL,900123407,374850,59850,315000,_binary '',_binary '',_binary '',_binary '\0',_binary '',NULL,'CONTADO',0),(6,'2020-09-11 00:00:00','2020-09-11 00:00:00','2020-09-11 00:00:00','2020-09-11 00:00:00',NULL,900357850,245600,0,245600,_binary '',_binary '',_binary '',_binary '\0',_binary '',NULL,'CONTADO',0),(7,'2020-09-10 00:00:00',NULL,NULL,NULL,NULL,900123407,105000,19950,124950,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',NULL,'CONTADO',0),(8,'2020-09-12 00:00:00',NULL,NULL,NULL,NULL,900659252,168000,0,168000,_binary '',_binary '\0',_binary '\0',_binary '\0',_binary '\0',NULL,'CONTADO',0),(9,'2020-09-19 00:00:00',NULL,NULL,NULL,NULL,830041488,1148000,0,1148000,_binary '\0',_binary '\0',_binary '\0',_binary '\0',_binary '\0',NULL,'CONTADO',0);
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-23 16:35:25
