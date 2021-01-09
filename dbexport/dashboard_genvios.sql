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
-- Table structure for table `genvios`
--

DROP TABLE IF EXISTS `genvios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genvios` (
  `id` int NOT NULL AUTO_INCREMENT,
  `NitoCC` bigint NOT NULL,
  `Destinatario` varchar(60) NOT NULL,
  `Remitente` varchar(3) NOT NULL,
  `Direccion` varchar(60) NOT NULL,
  `Telefono` varchar(16) NOT NULL,
  `Ciudad` varchar(32) NOT NULL,
  `Municipio` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genvios`
--

LOCK TABLES `genvios` WRITE;
/*!40000 ALTER TABLE `genvios` DISABLE KEYS */;
INSERT INTO `genvios` VALUES (1,1,'Detinos2','PMD','Av siempre Viva 5678','555-55555','springfield',NULL),(2,2,'Detinos2','PMD','Av siempre Viva 5678','555-55555','springfield',NULL),(3,900123407,'DetinosDSFSDF','PMD','Av siempre Viva 5678','555-55555','springfield',NULL),(4,900123407,'DetinosDSFSDF','PMD','Av siempre Viva 5678','555-55555','springfield',NULL),(5,900123407,'Detinosahora siF','PMD','Av siempre Viva 5678','555-55555','springfield',NULL),(6,900123407,'Detinosahora siF','PMD','Av siempre Viva 5678','555-55555','springfield',NULL),(7,900123407,'Detinosahora siF','LED','Av siempre Viva 5678','555-55555','springfield',NULL),(8,900123407,'Detinosahora siF','CUI','Av siempre Viva 5678','555-55555','springfield',NULL),(9,900123407,'Detinosahora siF','LED','Av siempre Viva 5678','555-55555','springfield',NULL),(10,900123407,'Detinosahora siF','PMD','Av siempre Viva 5678','555-55555','springfield',NULL),(11,900123407,'marge simpson ','LED','av siempre viva 1234','55-555555','springfield',''),(12,900123407,'homero Simpson ','CUI','av siempre viva 1234-25','55-555555-65','springfield','cali'),(13,900123407,'marge simpson ','LED','av siempre viva 1234','55-555555','springfield','cali');
/*!40000 ALTER TABLE `genvios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-10-26 11:53:32
