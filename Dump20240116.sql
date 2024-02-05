CREATE DATABASE  IF NOT EXISTS `sajjanv1_ems2024` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sajjanv1_ems2024`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: sajjanv1_ems2024
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `street` varchar(255) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  `district_id` int DEFAULT NULL,
  PRIMARY KEY (`address_id`),
  KEY `state_id` (`state_id`),
  KEY `district_id` (`district_id`),
  CONSTRAINT `address_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `indian_states` (`state_id`),
  CONSTRAINT `address_ibfk_2` FOREIGN KEY (`district_id`) REFERENCES `district` (`district_id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (44,'135, Old Palasia','452005','India','2024-01-09 12:42:16','2024-01-10 10:10:04',NULL,NULL,20,360),(51,'235, Lohar Mohalla','452005','India','2024-01-13 06:19:35','2024-01-13 06:19:35',NULL,NULL,20,360),(52,'235, Lohar Mohalla','452005','India','2024-01-13 06:19:37','2024-01-13 06:19:37',NULL,NULL,20,360),(53,'235, Lohar Mohalla','452005','India','2024-01-13 06:20:09','2024-01-13 06:20:09',NULL,NULL,20,360),(54,'235, Lohar Mohalla','452005','India','2024-01-13 06:20:51','2024-01-13 06:20:51',NULL,NULL,20,360),(55,'54,Dravid Nagar','452501','India','2024-01-13 06:26:29','2024-01-13 06:26:29',NULL,NULL,20,361);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `assembly`
--

DROP TABLE IF EXISTS `assembly`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `assembly` (
  `assembly_id` int NOT NULL,
  `assembly_name` varchar(255) NOT NULL,
  `district_id` int DEFAULT NULL,
  PRIMARY KEY (`assembly_id`),
  KEY `district_id` (`district_id`),
  CONSTRAINT `assembly_ibfk_1` FOREIGN KEY (`district_id`) REFERENCES `district` (`district_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `assembly`
--

LOCK TABLES `assembly` WRITE;
/*!40000 ALTER TABLE `assembly` DISABLE KEYS */;
INSERT INTO `assembly` VALUES (1,'Sheopur',382),(2,'Vijaypur',382),(3,'Sabalgarh',368),(4,'Joura',368),(5,'Sumawali',368),(6,'Morena',368),(7,'Dimani',368),(8,'Ambah ',368),(9,'Ater',346),(10,'Bhind',346),(11,'Lahar',346),(12,'Mehgaon',346),(13,'Gohad (SC)',346),(14,'Gwalior Rural',357),(15,'Gwalior',357),(16,'Gwalior East',357),(17,'Gwalior South',357),(18,'Bhitarwar',357),(19,'Dabra (SC)',357),(20,'Sewda',352),(21,'Bhander (SC)',352),(22,'Datia',352),(23,'Karera (SC)',383),(24,'Pohari',383),(25,'Shivpuri',383),(26,'Pichhore',383),(27,'Kolaras',383),(28,'Bamori',356),(29,'Guna (SC)',356),(30,'Chachoura',356),(31,'Raghogarh',356),(32,'Ashok Nagar (SC)',342),(33,'Chanderi',342),(34,'Mungaoli',342),(35,'Bina (SC)',376),(36,'Khurai',376),(37,'Surkhi',376),(38,'Deori',376),(39,'Rehli',376),(40,'Naryoli',376),(41,'Sagar',376),(42,'Banda',376),(43,'Tikamgarh',386),(44,'Jatara (SC)',386),(45,'Prithvipur',757),(46,'Niwari',757),(47,'Khargapur',386),(48,'Maharajpur',349),(49,'Chandla (SC)',349),(50,'Rajnagar',349),(51,'Chhatarpur',349),(52,'Bijawar',349),(53,'Malhara',349),(54,'Pathariya',351),(55,'Damoh',351),(56,'Jabera',351),(57,'Hatta (SC)',351),(58,'Pawai',371),(59,'Gunnaor (SC)',371),(60,'Panna',371),(61,'Chitrakoot',377),(62,'Raigaon (SC)',377),(63,'Satna',377),(64,'Nagod',377),(65,'Maihar',377),(66,'Amarpatan',377),(67,'Rampur-Baghelan',377),(68,'Sirmour',375),(69,'Semariya',375),(70,'Teonthar',375),(71,'Mauganj',375),(72,'Deotalab',375),(73,'Mangawan (SC)',375),(74,'Rewa',375),(75,'Gurh',375),(76,'Churhat',384),(77,'Sidhi',384),(78,'Sihawa',384),(79,'Chitrangi (ST)',385),(80,'Singrauli',385),(81,'Devsar (SC)',385),(82,'Dhauhani (ST)',384),(83,'Beohari (ST)',380),(84,'Jaisingnagar (ST)',380),(85,'Jaitpur (ST)',380),(86,'Kotma',341),(87,'Anuppur (ST)',341),(88,'Pushprajgarh (ST)',341),(89,'Bandhavgarh (ST)',388),(90,'Manpur (ST)',388),(91,'Barwara (ST)',363),(92,'Vijayraghavgarh',363),(93,'Murwara',363),(94,'Bahoriband',363),(95,'Patan',361),(96,'Bargi',361),(97,'Jabalpur East (SC)',361),(98,'Jabalpur North',361),(99,'Jabalpur Cantonment',361),(100,'Jabalpur West',361),(101,'Panagar',361),(102,'Sihora (ST)',361),(103,'Shahpura (ST)',355),(104,'Dindori (SC)',355),(105,'Bichhiya (ST)',366),(106,'Niwas (ST)',366),(107,'Mandla (ST)',366),(108,'Baihar (ST)',343),(109,'Lanji',343),(110,'Paraswada',343),(111,'Balaghat',343),(112,'Waraseoni',343),(113,'Katangi',343),(114,'Barghat (ST)',379),(115,'Seoni',379),(116,'Keolari',379),(117,'Lakhnadon (ST)',379),(118,'Gotegaon (SC)',369),(119,'Narsingpur',369),(120,'Tendukheda',369),(121,'Gadarwara',369),(122,'Junnardeo (ST)',350),(123,'Amarwara (ST)',350),(124,'Chourai',350),(125,'Saunsar',350),(126,'Chhindwara',350),(127,'Parasia (SC)',350),(128,'Pandhurna (ST)',350),(129,'Multai',345),(130,'Amla',345),(131,'Betul',345),(132,'Ghoradongri (ST)',345),(133,'Bhainsdehi (ST)',345),(134,'Timarni (ST)',358),(135,'Harda',358),(136,'Seoni-Malwa',359),(137,'Hoshangabad',359),(138,'Sohagpur',359),(139,'Pipariya (SC)',359),(140,'Udaipura',372),(141,'Bhojpur',372),(142,'Sanchi (SC)',372),(143,'Silwani',372),(144,'Vidisha',389),(145,'Basoda',389),(146,'Kurwai (SC)',389),(147,'Sironj',389),(148,'Shamshabad',389),(149,'Berasia (SC)',347),(150,'Bhopal Uttar',347),(151,'Narela',347),(152,'Bhopal Dakshin-Paschim',347),(153,'Bhopal Madhya',347),(154,'Govindpura',347),(155,'Huzur',347),(156,'Budhni',378),(157,'Ashta (SC)',378),(158,'Ichhawar',378),(159,'Sehore',378),(160,'Narsinghgarh',373),(161,'Biaora',373),(162,'Rajgarh',373),(163,'Khilchipur',373),(164,'Sarangpur (SC)',373),(165,'Susner',339),(166,'Agar (SC)',339),(167,'Shajapur',381),(168,'Shujalpur',381),(169,'Kalapipal',381),(170,'Sonkatch (SC)',353),(171,'Dewas',353),(172,'Hatpipliya',353),(173,'Khategaon',353),(174,'Bagli (ST)',353),(175,'Mandhata',364),(176,'Harsud (ST)',364),(177,'Khandwa (SC)',364),(178,'Pandhana (ST)',364),(179,'Nepanagar',348),(180,'Burhanpur',348),(181,'Bhikangaon (ST)',365),(182,'Barwah',365),(183,'Maheshwar (SC)',365),(184,'Kasrawad',365),(185,'Khargone',365),(186,'Bhagwanpura (ST)',365),(187,'Sendhawa (ST)',344),(188,'Rajpur (ST)',344),(189,'Pansemal (ST)',344),(190,'Barwani (ST)',344),(191,'Alirajpur (ST)',340),(192,'Jobat (ST)',340),(193,'Jhabua (ST)',362),(194,'Thandla (ST)',362),(195,'Petlawad (ST)',362),(196,'Sardarpur (ST)',354),(197,'Gandhwani (ST)',354),(198,'Kukshi (ST)',354),(199,'Manawar (ST)',354),(200,'Dharampuri (ST)',354),(201,'Dhar',354),(202,'Badnawar',354),(203,'Depalpur',360),(204,'Indore-1',360),(205,'Indore-2',360),(206,'Indore-3',360),(207,'Indore-4',360),(208,'Indore-5',360),(209,'Dr. Ambedkar Nagar-Mhow',360),(210,'Rau',360),(211,'Sanwer (SC)',360),(212,'Nagda-Khachrod',387),(213,'Mahidpur',387),(214,'Tarana (SC)',387),(215,'Ghatiya (SC)',387),(216,'Ujjain North',387),(217,'Ujjain South',387),(218,'Badnagar',387),(219,'Ratlam Rural (ST)',374),(220,'Ratlam City',374),(221,'Sailana',374),(222,'Jaora',374),(223,'Alot (SC)',374),(224,'Mandsaur',367),(225,'Malhargarh (SC)',367),(226,'Suwasra',367),(227,'Garoth',367),(228,'Manasa',370),(229,'Neemuch',370),(230,'Jawad',370);
/*!40000 ALTER TABLE `assembly` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `district`
--

DROP TABLE IF EXISTS `district`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `district` (
  `district_id` int NOT NULL AUTO_INCREMENT,
  `district_name` varchar(255) DEFAULT NULL,
  `district_code` char(6) DEFAULT NULL,
  `state_id` int DEFAULT NULL,
  PRIMARY KEY (`district_id`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `district_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `indian_states` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=758 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `district`
--

LOCK TABLES `district` WRITE;
/*!40000 ALTER TABLE `district` DISABLE KEYS */;
INSERT INTO `district` VALUES (27,'Tawang','TAW',3),(28,'West Kameng','WKMG',3),(29,'East Kameng','EKMG',3),(30,'Papum Pare','PAP',3),(31,'Kurung Kumey','KKY',3),(32,'Kra Daadi','KRD',3),(33,'Lower Subansiri','LSB',3),(34,'Upper Subansiri','USB',3),(35,'West Siang','WSG',3),(36,'East Siang','ESG',3),(37,'Siang','SNG',3),(38,'Upper Siang','USG',3),(39,'Lower Siang','LSG',3),(40,'Lower Dibang Valley','LDV',3),(41,'Dibang Valley','DBV',3),(42,'Anjaw','ANJ',3),(43,'Lohit','LHT',3),(44,'Namsai','NSI',3),(45,'Changlang','CHG',3),(46,'Tirap','TRP',3),(47,'Longding','LNG',3),(48,'Kamle','KML',3),(49,'Lower Subansiri','LSB',3),(50,'Pakke-Kessang','PKK',3),(51,'Shi-Yomi','SHY',3),(52,'Lepa Rada','LPR',3),(53,'Srikakulam','SKLM',2),(54,'Vizianagaram','VZM',2),(55,'Visakhapatnam','VSP',2),(56,'East Godavari','EG',2),(57,'West Godavari','WG',2),(58,'Krishna','KRI',2),(59,'Guntur','GTR',2),(60,'Prakasam','PKM',2),(61,'Nellore','NLR',2),(62,'Chittoor','CTR',2),(63,'YSR Kadapa','KDP',2),(64,'Anantapur','ATP',2),(65,'Kurnool','KNL',2),(66,'Mahabubnagar','MBNR',2),(67,'Rangareddy','RNGR',2),(68,'Medchal-Malkajgiri','MDCL',2),(69,'Nalgonda','NLG',2),(70,'Wanaparthy','WNP',2),(71,'Nagarkurnool','NGKL',2),(72,'Jogulamba Gadwal','JGWL',2),(73,'Mahbubabad','MBBD',2),(74,'Khammam','KMM',2),(75,'Suryapet','SRYPT',2),(76,'Yadadri Bhuvanagiri','YDBR',2),(77,'Warangal Rural','WRRL',2),(78,'Warangal Urban','WRUR',2),(79,'Baksa','BK',4),(80,'Barpeta','BP',4),(81,'Biswanath','BT',4),(82,'Bongaigaon','BG',4),(83,'Cachar','CR',4),(84,'Charaideo','CD',4),(85,'Chirang','CG',4),(86,'Darrang','DG',4),(87,'Dhemaji','DJ',4),(88,'Dhubri','DB',4),(89,'Dibrugarh','DH',4),(90,'Dima Hasao','DH',4),(91,'Goalpara','GP',4),(92,'Golaghat','GH',4),(93,'Hailakandi','HK',4),(94,'Hojai','HJ',4),(95,'Jorhat','JT',4),(96,'Kamrup','KP',4),(97,'Kamrup Metropolitan','KM',4),(98,'Karbi Anglong','KA',4),(99,'Karimganj','KJ',4),(100,'Kokrajhar','KJ',4),(101,'Lakhimpur','LP',4),(102,'Majuli','MJ',4),(103,'Morigaon','MG',4),(104,'Nagaon','NG',4),(105,'Nalbari','NB',4),(106,'Sivasagar','SG',4),(107,'Sonitpur','SP',4),(108,'South Salmara-Mankachar','SM',4),(109,'Tinsukia','TK',4),(110,'Udalguri','UD',4),(111,'Araria','AR',5),(112,'Arwal','AW',5),(113,'Aurangabad','AD',5),(114,'Banka','BA',5),(115,'Begusarai','BG',5),(116,'Bhagalpur','BP',5),(117,'Bhojpur','BJ',5),(118,'Buxar','BX',5),(119,'Darbhanga','DB',5),(120,'East Champaran','EC',5),(121,'Gaya','GY',5),(122,'Gopalganj','GG',5),(123,'Jamui','JM',5),(124,'Jehanabad','JH',5),(125,'Kaimur','KM',5),(126,'Katihar','KH',5),(127,'Khagaria','KG',5),(128,'Kishanganj','KJ',5),(129,'Lakhisarai','LK',5),(130,'Madhepura','MP',5),(131,'Madhubani','MB',5),(132,'Munger','MG',5),(133,'Muzaffarpur','MZ',5),(134,'Nalanda','ND',5),(135,'Nawada','NW',5),(136,'Patna','PT',5),(137,'Purnia','PN',5),(138,'Rohtas','RT',5),(139,'Saharsa','SA',5),(140,'Samastipur','SP',5),(141,'Saran','SR',5),(142,'Sheikhpura','SK',5),(143,'Sheohar','SH',5),(144,'Sitamarhi','ST',5),(145,'Siwan','SW',5),(146,'Supaul','SP',5),(147,'Vaishali','VC',5),(148,'West Champaran','WC',5),(149,'Balod','BLD',7),(150,'Baloda Bazar','BDB',7),(151,'Balrampur','BRP',7),(152,'Bastar','BST',7),(153,'Bemetara','BMT',7),(154,'Bijapur','BJP',7),(155,'Bilaspur','BLP',7),(156,'Dantewada','DTW',7),(157,'Dhamtari','DHR',7),(158,'Durg','DRG',7),(159,'Gariaband','GRB',7),(160,'Janjgir-Champa','JJC',7),(161,'Jashpur','JSP',7),(162,'Kanker','KNK',7),(163,'Kabirdham','KBD',7),(164,'Kondagaon','KDN',7),(165,'Korba','KRB',7),(166,'Korea','KRA',7),(167,'Mahasamund','MSM',7),(168,'Mungeli','MNG',7),(169,'Narayanpur','NRP',7),(170,'Raigarh','RGH',7),(171,'Raipur','RPR',7),(172,'Rajnandgaon','RJN',7),(173,'Sukma','SKM',7),(174,'Surajpur','SRJ',7),(175,'Surguja','SRG',7),(176,'Gaurela-Pendra-Marwahi','GPM',7),(177,'Balodabazar-Bhatapara','BDB',7),(178,'Balrampur-Ramanujganj','BRG',7),(179,'Bijapur','BJP',7),(180,'Baloda Bazar','BDB',7),(181,'Balod','BLD',7),(182,'North Goa','NG',10),(183,'South Goa','SG',10),(184,'Ahmedabad','AMD',11),(185,'Amreli','AML',11),(186,'Anand','AND',11),(187,'Aravalli','ARV',11),(188,'Banaskantha','BNK',11),(189,'Bharuch','BHR',11),(190,'Bhavnagar','BVG',11),(191,'Botad','BTD',11),(192,'Chhota Udaipur','CHU',11),(193,'Dahod','DHD',11),(194,'Dang','DNG',11),(195,'Devbhoomi Dwarka','DVD',11),(196,'Gandhinagar','GNG',11),(197,'Gir Somnath','GSN',11),(198,'Jamnagar','JMR',11),(199,'Junagadh','JND',11),(200,'Kutch','KUT',11),(201,'Kheda','KHD',11),(202,'Mahisagar','MHS',11),(203,'Mehsana','MSN',11),(204,'Morbi','MRB',11),(205,'Narmada','NRD',11),(206,'Navsari','NVS',11),(207,'Panchmahal','PNM',11),(208,'Patan','PTN',11),(209,'Porbandar','PBD',11),(210,'Rajkot','RJT',11),(211,'Sabarkantha','SBK',11),(212,'Surat','SRT',11),(213,'Surendranagar','SRN',11),(214,'Tapi','TAP',11),(215,'Vadodara','VDR',11),(216,'Valsad','VSD',11),(217,'Ambala','AMB',12),(218,'Bhiwani','BHI',12),(219,'Charkhi Dadri','CKD',12),(220,'Faridabad','FRD',12),(221,'Fatehabad','FTH',12),(222,'Gurugram','GRG',12),(223,'Hisar','HSR',12),(224,'Jhajjar','JHJ',12),(225,'Jind','JND',12),(226,'Kaithal','KAI',12),(227,'Karnal','KAR',12),(228,'Kurukshetra','KUK',12),(229,'Mahendragarh','MHR',12),(230,'Nuh','NUH',12),(231,'Palwal','PLW',12),(232,'Panchkula','PCH',12),(233,'Panipat','PAN',12),(234,'Rewari','REW',12),(235,'Rohtak','ROH',12),(236,'Sirsa','SIR',12),(237,'Sonipat','SON',12),(238,'Yamunanagar','YMN',12),(239,'Bilaspur','BIL',13),(240,'Chamba','CHA',13),(241,'Hamirpur','HAM',13),(242,'Kangra','KAN',13),(243,'Kinnaur','KIN',13),(244,'Kullu','KUL',13),(245,'Lahaul and Spiti','LAH',13),(246,'Mandi','MAN',13),(247,'Shimla','SHI',13),(248,'Sirmaur','SIR',13),(249,'Solan','SOL',13),(250,'Una','UNA',13),(251,'Anantnag','ANT',14),(252,'Bandipora','BAN',14),(253,'Baramulla','BRM',14),(254,'Budgam','BDG',14),(255,'Doda','DOD',14),(256,'Ganderbal','GND',14),(257,'Jammu','JMU',14),(258,'Kathua','KAT',14),(259,'Kishtwar','KIS',14),(260,'Kulgam','KUL',14),(261,'Kupwara','KUP',14),(262,'Poonch','POO',14),(263,'Pulwama','PLM',14),(264,'Rajouri','RAJ',14),(265,'Ramban','RBN',14),(266,'Reasi','REA',14),(267,'Samba','SAM',14),(268,'Shopian','SHP',14),(269,'Srinagar','SRN',14),(270,'Udhampur','UDH',14),(271,'Bokaro','BOK',15),(272,'Chatra','CHA',15),(273,'Deoghar','DEO',15),(274,'Dhanbad','DHA',15),(275,'Dumka','DUM',15),(276,'East Singhbhum','ESI',15),(277,'Garhwa','GAR',15),(278,'Giridih','GIR',15),(279,'Godda','GOD',15),(280,'Gumla','GUM',15),(281,'Hazaribagh','HAZ',15),(282,'Jamtara','JAM',15),(283,'Khunti','KHU',15),(284,'Koderma','KOD',15),(285,'Latehar','LAT',15),(286,'Lohardaga','LOH',15),(287,'Pakur','PAK',15),(288,'Palamu','PAL',15),(289,'Ramgarh','RAM',15),(290,'Ranchi','RAN',15),(291,'Sahibganj','SAH',15),(292,'Seraikela-Kharsawan','SER',15),(293,'Simdega','SIM',15),(294,'West Singhbhum','WSI',15),(295,'Bagalkot','BGK',16),(296,'Ballari','BLR',16),(297,'Belagavi','BGM',16),(298,'Bengaluru Rural','BLR',16),(299,'Bengaluru Urban','BLU',16),(300,'Bidar','BDR',16),(301,'Chamarajanagar','CMR',16),(302,'Chikkaballapur','CKB',16),(303,'Chikkamagaluru','CKM',16),(304,'Chitradurga','CTR',16),(305,'Dakshina Kannada','DKD',16),(306,'Davanagere','DVG',16),(307,'Dharwad','DWD',16),(308,'Gadag','GAD',16),(309,'Hassan','HSN',16),(310,'Haveri','HVR',16),(311,'Kalaburagi','KLB',16),(312,'Kodagu','KDG',16),(313,'Kolar','KLR',16),(314,'Koppal','KOP',16),(315,'Mandya','MDY',16),(316,'Mysuru','MYS',16),(317,'Raichur','RCH',16),(318,'Ramanagara','RMG',16),(319,'Shivamogga','SVM',16),(320,'Tumakuru','TUM',16),(321,'Udupi','UDP',16),(322,'Uttara Kannada','UKN',16),(323,'Vijayapura','VJP',16),(324,'Yadgir','YDR',16),(325,'Alappuzha','ALP',17),(326,'Ernakulam','ERK',17),(327,'Idukki','IDK',17),(328,'Kannur','KNR',17),(329,'Kasaragod','KSD',17),(330,'Kollam','KLM',17),(331,'Kottayam','KTM',17),(332,'Kozhikode','KZD',17),(333,'Malappuram','MLP',17),(334,'Palakkad','PLK',17),(335,'Pathanamthitta','PTA',17),(336,'Thiruvananthapuram','TRV',17),(337,'Thrissur','TSR',17),(338,'Wayanad','WYD',17),(339,'Agar Malwa','AGM',20),(340,'Alirajpur','ALR',20),(341,'Anuppur','ANP',20),(342,'Ashoknagar','ASK',20),(343,'Balaghat','BLG',20),(344,'Barwani','BRW',20),(345,'Betul','BET',20),(346,'Bhind','BHD',20),(347,'Bhopal','BHO',20),(348,'Burhanpur','BHP',20),(349,'Chhatarpur','CTP',20),(350,'Chhindwara','CWA',20),(351,'Damoh','DMO',20),(352,'Datia','DTA',20),(353,'Dewas','DWS',20),(354,'Dhar','DHR',20),(355,'Dindori','DND',20),(356,'Guna','GUN',20),(357,'Gwalior','GWL',20),(358,'Harda','HRD',20),(359,'Hoshangabad','HBD',20),(360,'Indore','IDR',20),(361,'Jabalpur','JBP',20),(362,'Jhabua','JHA',20),(363,'Katni','KAT',20),(364,'Khandwa','KHN',20),(365,'Khargone','KRG',20),(366,'Mandla','MDL',20),(367,'Mandsaur','MSR',20),(368,'Morena','MOR',20),(369,'Narsinghpur','NSP',20),(370,'Neemuch','NEM',20),(371,'Panna','PAN',20),(372,'Raisen','RAI',20),(373,'Rajgarh','RAJ',20),(374,'Ratlam','RTL',20),(375,'Rewa','REW',20),(376,'Sagar','SAG',20),(377,'Satna','STN',20),(378,'Sehore','SEH',20),(379,'Seoni','SEO',20),(380,'Shahdol','SHD',20),(381,'Shajapur','SJP',20),(382,'Sheopur','SHE',20),(383,'Shivpuri','SHP',20),(384,'Sidhi','SID',20),(385,'Singrauli','SRI',20),(386,'Tikamgarh','TKM',20),(387,'Ujjain','UJJ',20),(388,'Umaria','UMR',20),(389,'Vidisha','VID',20),(390,'Ahmednagar','AHM',21),(391,'Akola','AKL',21),(392,'Amravati','AMR',21),(393,'Aurangabad','AUR',21),(394,'Beed','BEE',21),(395,'Bhandara','BHA',21),(396,'Buldhana','BUL',21),(397,'Chandrapur','CHA',21),(398,'Dhule','DHU',21),(399,'Gadchiroli','GAD',21),(400,'Gondia','GON',21),(401,'Hingoli','HIN',21),(402,'Jalgaon','JAL',21),(403,'Jalna','JAL',21),(404,'Kolhapur','KOL',21),(405,'Latur','LAT',21),(406,'Mumbai City','MUM',21),(407,'Mumbai Suburban','MUS',21),(408,'Nagpur','NAG',21),(409,'Nanded','NAN',21),(410,'Nandurbar','NAN',21),(411,'Nashik','NAS',21),(412,'Osmanabad','OSM',21),(413,'Palghar','PAL',21),(414,'Parbhani','PAR',21),(415,'Pune','PUN',21),(416,'Raigad','RAI',21),(417,'Ratnagiri','RAT',21),(418,'Sangli','SAN',21),(419,'Satara','SAT',21),(420,'Sindhudurg','SIN',21),(421,'Solapur','SOL',21),(422,'Thane','THA',21),(423,'Wardha','WAR',21),(424,'Washim','WAS',21),(425,'Yavatmal','YAV',21),(426,'Bishnupur','BPR',22),(427,'Chandel','CHD',22),(428,'Churachandpur','CCP',22),(429,'Imphal East','IME',22),(430,'Imphal West','IMW',22),(431,'Jiribam','JRB',22),(432,'Kakching','KKC',22),(433,'Kamjong','KMJ',22),(434,'Kangpokpi','KPI',22),(435,'Noney','NON',22),(436,'Pherzawl','PZW',22),(437,'Senapati','SPT',22),(438,'Tamenglong','TML',22),(439,'Tengnoupal','TGP',22),(440,'Thoubal','THB',22),(441,'Ukhrul','UKL',22),(442,'East Garo Hills','EGH',23),(443,'East Jaintia Hills','EJH',23),(444,'East Khasi Hills','EKH',23),(445,'North Garo Hills','NGH',23),(446,'Ribhoi','RIB',23),(447,'South Garo Hills','SGH',23),(448,'South West Garo Hills','SWGH',23),(449,'South West Khasi Hills','SWKH',23),(450,'West Garo Hills','WGH',23),(451,'West Jaintia Hills','WJH',23),(452,'West Khasi Hills','WKH',23),(453,'Aizawl','AIZ',24),(454,'Champhai','CHP',24),(455,'Kolasib','KLB',24),(456,'Lawngtlai','LAW',24),(457,'Lunglei','LUN',24),(458,'Mamit','MAM',24),(459,'Saiha','SAI',24),(460,'Serchhip','SER',24),(461,'Hnahthial','HNA',24),(462,'Khawzawl','KHW',24),(463,'Saitual','SAI',24),(464,'Dimapur','DN',25),(465,'Kohima','KH',25),(466,'Mokokchung','MK',25),(467,'Mon','MO',25),(468,'Peren','PE',25),(469,'Phek','PH',25),(470,'Tuensang','TN',25),(471,'Wokha','WK',25),(472,'Zunheboto','ZH',25),(473,'Kiphire','KP',25),(474,'Longleng','LL',25),(475,'Noklak','NK',25),(476,'Naginimora','NG',25),(477,'Tamlu','TM',25),(478,'Shamator','SM',25),(479,'Meluri','ML',25),(480,'Angul','AN',26),(481,'Balangir','BL',26),(482,'Balasore','BS',26),(483,'Bargarh','BR',26),(484,'Bhadrak','BD',26),(485,'Boudh','BO',26),(486,'Cuttack','CT',26),(487,'Deogarh','DG',26),(488,'Dhenkanal','DK',26),(489,'Gajapati','GA',26),(490,'Ganjam','GM',26),(491,'Jagatsinghpur','JP',26),(492,'Jajpur','JR',26),(493,'Jharsuguda','JH',26),(494,'Kalahandi','KL',26),(495,'Kandhamal','KD',26),(496,'Kendrapara','KP',26),(497,'Kendujhar','KJ',26),(498,'Khordha','KH',26),(499,'Koraput','KO',26),(500,'Malkangiri','MK',26),(501,'Mayurbhanj','MB',26),(502,'Nabarangpur','NR',26),(503,'Nayagarh','NY',26),(504,'Nuapada','ND',26),(505,'Puri','PU',26),(506,'Rayagada','RG',26),(507,'Sambalpur','SP',26),(508,'Subarnapur','SU',26),(509,'Sundargarh','SG',26),(510,'Amritsar','ASR',28),(511,'Barnala','BRL',28),(512,'Bathinda','BTH',28),(513,'Faridkot','FDK',28),(514,'Fatehgarh Sahib','FGS',28),(515,'Fazilka','FZK',28),(516,'Ferozepur','FRZ',28),(517,'Gurdaspur','GSP',28),(518,'Hoshiarpur','HSP',28),(519,'Jalandhar','JAL',28),(520,'Kapurthala','KAP',28),(521,'Ludhiana','LDH',28),(522,'Mansa','MSN',28),(523,'Moga','MOG',28),(524,'Muktsar','MKS',28),(525,'Pathankot','PTK',28),(526,'Patiala','PTL',28),(527,'Rupnagar','RPR',28),(528,'Sangrur','SAG',28),(529,'SAS Nagar','SAS',28),(530,'SBS Nagar','SBS',28),(531,'Tarn Taran','TTN',28),(532,'Ajmer','AJM',29),(533,'Alwar','ALW',29),(534,'Banswara','BNW',29),(535,'Baran','BRN',29),(536,'Barmer','BMR',29),(537,'Bharatpur','BHP',29),(538,'Bhilwara','BHL',29),(539,'Bikaner','BKN',29),(540,'Bundi','BND',29),(541,'Chittorgarh','CTG',29),(542,'Churu','CRU',29),(543,'Dausa','DSA',29),(544,'Dholpur','DHL',29),(545,'Dungarpur','DGP',29),(546,'Hanumangarh','HMH',29),(547,'Jaipur','JPR',29),(548,'Jaisalmer','JSM',29),(549,'Jalore','JLR',29),(550,'Jhalawar','JHW',29),(551,'Jhunjhunu','JHU',29),(552,'Jodhpur','JOD',29),(553,'Karauli','KRL',29),(554,'Kota','KOT',29),(555,'Nagaur','NGR',29),(556,'Pali','PAL',29),(557,'Pratapgarh','PTG',29),(558,'Rajsamand','RSD',29),(559,'Sawai Madhopur','SWM',29),(560,'Sikar','SIK',29),(561,'Sirohi','SIR',29),(562,'Tonk','TON',29),(563,'Udaipur','UDR',29),(564,'East Sikkim','ES',30),(565,'North Sikkim','NS',30),(566,'South Sikkim','SS',30),(567,'West Sikkim','WS',30),(568,'Central Sikkim','CS',30),(569,'North Sikkim','NSK',30),(570,'Ariyalur','ARI',31),(571,'Chengalpattu','CHN',31),(572,'Chennai','CHE',31),(573,'Coimbatore','CBE',31),(574,'Cuddalore','CUD',31),(575,'Dharmapuri','DPI',31),(576,'Dindigul','DGL',31),(577,'Erode','ERD',31),(578,'Kallakurichi','KAL',31),(579,'Kanchipuram','KPM',31),(580,'Kanyakumari','KKN',31),(581,'Karur','KAR',31),(582,'Krishnagiri','KRI',31),(583,'Madurai','MDU',31),(584,'Nagapattinam','NAG',31),(585,'Namakkal','NML',31),(586,'Nilgiris','NIL',31),(587,'Perambalur','PER',31),(588,'Pudukkottai','PDK',31),(589,'Ramanathapuram','RMD',31),(590,'Ranipet','RNP',31),(591,'Salem','SAL',31),(592,'Sivaganga','SVG',31),(593,'Tenkasi','TEN',31),(594,'Thanjavur','THJ',31),(595,'Theni','THN',31),(596,'Thoothukudi','TUT',31),(597,'Tiruchirappalli','TCR',31),(598,'Tirunelveli','TNI',31),(599,'Tirupathur','TPR',31),(600,'Tiruppur','TPU',31),(601,'Tiruvallur','TIR',31),(602,'Tiruvannamalai','TVL',31),(603,'Tiruvarur','TIR',31),(604,'Vellore','VEL',31),(605,'Viluppuram','VPM',31),(606,'Virudhunagar','VNR',31),(607,'Adilabad','ADB',32),(608,'Bhadradri Kothagudem','BHG',32),(609,'Hyderabad','HYD',32),(610,'Jagtial','JGT',32),(611,'Jangaon','JGN',32),(612,'Jayashankar Bhupalpally','JBP',32),(613,'Jogulamba Gadwal','JGW',32),(614,'Kamareddy','KMR',32),(615,'Karimnagar','KRM',32),(616,'Khammam','KMM',32),(617,'Komaram Bheem Asifabad','KBA',32),(618,'Mahabubabad','MBB',32),(619,'Mahabubnagar','MBN',32),(620,'Mancherial','MNL',32),(621,'Medak','MDK',32),(622,'Medchal-Malkajgiri','MKG',32),(623,'Nagarkurnool','NGK',32),(624,'Nalgonda','NLD',32),(625,'Nirmal','NRM',32),(626,'Nizamabad','NZB',32),(627,'Peddapalli','PDL',32),(628,'Rajanna Sircilla','RSL',32),(629,'Ranga Reddy','RRY',32),(630,'Sangareddy','SGY',32),(631,'Siddipet','SDP',32),(632,'Suryapet','SPT',32),(633,'Vikarabad','VKB',32),(634,'Wanaparthy','WPT',32),(635,'Warangal Rural','WRL',32),(636,'Warangal Urban','WUR',32),(637,'Yadadri Bhuvanagiri','YBD',32),(638,'Dhalai','DHL',33),(639,'Gomati','GMT',33),(640,'Khowai','KHW',33),(641,'North Tripura','NTR',33),(642,'Sepahijala','SPL',33),(643,'South Tripura','STR',33),(644,'Unakoti','UNK',33),(645,'West Tripura','WTR',33),(646,'Agra','AGR',34),(647,'Aligarh','ALG',34),(648,'Allahabad','ALD',34),(649,'Ambedkar Nagar','ABN',34),(650,'Amethi','AME',34),(651,'Amroha','AMR',34),(652,'Auraiya','AUR',34),(653,'Azamgarh','AZA',34),(654,'Baghpat','BGP',34),(655,'Bahraich','BRC',34),(656,'Ballia','BAL',34),(657,'Balrampur','BLP',34),(658,'Banda','BND',34),(659,'Barabanki','BBK',34),(660,'Bareilly','BRY',34),(661,'Basti','BST',34),(662,'Bhadohi','BHD',34),(663,'Bijnor','BJN',34),(664,'Budaun','BUD',34),(665,'Bulandshahr','BLS',34),(666,'Chandauli','CHD',34),(667,'Chitrakoot','CKT',34),(668,'Deoria','DEO',34),(669,'Etah','ETA',34),(670,'Etawah','ETW',34),(671,'Faizabad','FAZ',34),(672,'Farrukhabad','FBD',34),(673,'Fatehpur','FTP',34),(674,'Firozabad','FRZ',34),(675,'Gautam Buddh Nagar','GBN',34),(676,'Ghaziabad','GZB',34),(677,'Ghazipur','GZR',34),(678,'Gonda','GON',34),(679,'Gorakhpur','GKP',34),(680,'Hamirpur','HAM',34),(681,'Hapur','HPR',34),(682,'Hardoi','HAR',34),(683,'Hathras','HAT',34),(684,'Jalaun','JAL',34),(685,'Jaunpur','JNP',34),(686,'Jhansi','JHS',34),(687,'Kannauj','KNJ',34),(688,'Kanpur Dehat','KDP',34),(689,'Kanpur Nagar','KAN',34),(690,'Kasganj','KSG',34),(691,'Kaushambi','KSM',34),(692,'Kushinagar','KUS',34),(693,'Lakhimpur Kheri','LKH',34),(694,'Lalitpur','LLP',34),(695,'Lucknow','LKO',34),(696,'Maharajganj','MGJ',34),(697,'Mahoba','MHB',34),(698,'Mainpuri','MNP',34),(699,'Mathura','MTA',34),(700,'Mau','MAU',34),(701,'Meerut','MET',34),(702,'Mirzapur','MZP',34),(703,'Moradabad','MOR',34),(704,'Muzaffarnagar','MUZ',34),(705,'Pilibhit','PLB',34),(706,'Pratapgarh','PTP',34),(707,'Raebareli','RBL',34),(708,'Rampur','RMP',34),(709,'Saharanpur','SRN',34),(710,'Sambhal','SMB',34),(711,'Sant Kabir Nagar','SKN',34),(712,'Shahjahanpur','SJP',34),(713,'Shamli','SML',34),(714,'Shrawasti','SWT',34),(715,'Siddharthnagar','SDR',34),(716,'Sitapur','STP',34),(717,'Sonbhadra','SBR',34),(718,'Sultanpur','SLN',34),(719,'Unnao','UNA',34),(720,'Varanasi','VAR',34),(721,'Almora','ALM',35),(722,'Bageshwar','BGS',35),(723,'Chamoli','CHM',35),(724,'Champawat','CHP',35),(725,'Dehradun','DED',35),(726,'Haridwar','HRD',35),(727,'Nainital','NAN',35),(728,'Pauri Garhwal','PRG',35),(729,'Pithoragarh','PTH',35),(730,'Rudraprayag','RPG',35),(731,'Tehri Garhwal','TEH',35),(732,'Udham Singh Nagar','USN',35),(733,'Uttarkashi','UTK',35),(734,'Alipurduar','AD',36),(735,'Bankura','BNK',36),(736,'Birbhum','BB',36),(737,'Cooch Behar','CB',36),(738,'Dakshin Dinajpur','DD',36),(739,'Darjeeling','DR',36),(740,'Hooghly','HL',36),(741,'Howrah','HR',36),(742,'Jalpaiguri','JP',36),(743,'Jhargram','JH',36),(744,'Kalimpong','KP',36),(745,'Kolkata','KO',36),(746,'Malda','MD',36),(747,'Murshidabad','MBD',36),(748,'Nadia','ND',36),(749,'North 24 Parganas','N24P',36),(750,'Paschim Bardhaman','PB',36),(751,'Paschim Medinipur','PM',36),(752,'Purba Bardhaman','PB',36),(753,'Purba Medinipur','PM',36),(754,'Purulia','PL',36),(755,'South 24 Parganas','S24P',36),(756,'Uttar Dinajpur','UD',36),(757,'Niwari','NW',20);
/*!40000 ALTER TABLE `district` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `indian_states`
--

DROP TABLE IF EXISTS `indian_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `indian_states` (
  `state_id` int NOT NULL AUTO_INCREMENT,
  `state_name` varchar(255) DEFAULT NULL,
  `state_code` char(2) DEFAULT NULL,
  PRIMARY KEY (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `indian_states`
--

LOCK TABLES `indian_states` WRITE;
/*!40000 ALTER TABLE `indian_states` DISABLE KEYS */;
INSERT INTO `indian_states` VALUES (1,'Andaman and Nicobar Islands','AN'),(2,'Andhra Pradesh','AP'),(3,'Arunachal Pradesh','AR'),(4,'Assam','AS'),(5,'Bihar','BR'),(6,'Chandigarh','CH'),(7,'Chhattisgarh','CT'),(8,'Dadra and Nagar Haveli and Daman and Diu','DN'),(9,'Delhi','DL'),(10,'Goa','GA'),(11,'Gujarat','GJ'),(12,'Haryana','HR'),(13,'Himachal Pradesh','HP'),(14,'Jammu and Kashmir','JK'),(15,'Jharkhand','JH'),(16,'Karnataka','KA'),(17,'Kerala','KL'),(18,'Ladakh','LA'),(19,'Lakshadweep','LD'),(20,'Madhya Pradesh','MP'),(21,'Maharashtra','MH'),(22,'Manipur','MN'),(23,'Meghalaya','ML'),(24,'Mizoram','MZ'),(25,'Nagaland','NL'),(26,'Odisha','OD'),(27,'Puducherry','PY'),(28,'Punjab','PB'),(29,'Rajasthan','RJ'),(30,'Sikkim','SK'),(31,'Tamil Nadu','TN'),(32,'Telangana','TG'),(33,'Tripura','TR'),(34,'Uttar Pradesh','UP'),(35,'Uttarakhand','UK'),(36,'West Bengal','WB');
/*!40000 ALTER TABLE `indian_states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parliament`
--

DROP TABLE IF EXISTS `parliament`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parliament` (
  `parliament_id` int NOT NULL AUTO_INCREMENT,
  `parliament_name` varchar(255) NOT NULL,
  `state_id` int DEFAULT NULL,
  PRIMARY KEY (`parliament_id`),
  KEY `state_id` (`state_id`),
  CONSTRAINT `parliament_ibfk_1` FOREIGN KEY (`state_id`) REFERENCES `indian_states` (`state_id`)
) ENGINE=InnoDB AUTO_INCREMENT=545 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parliament`
--

LOCK TABLES `parliament` WRITE;
/*!40000 ALTER TABLE `parliament` DISABLE KEYS */;
INSERT INTO `parliament` VALUES (1,'Morena',20),(2,'Bhind',20),(3,'Gwalior',20),(4,'Guna',20),(5,'Sagar',20),(6,'Vidisha',20),(7,'Bhopal',20),(8,'Rajgarh',20),(9,'Dewas',20),(10,'Ujjain',20),(11,'Mandsaur',20),(12,'Ratlam',20),(13,'Dhar',20),(14,'Indore',20),(15,'Khargone',20),(16,'Khandwa',20),(17,'Betul',20),(18,'Hoshangabad',20),(19,'Satna',20),(20,'Rewa',20),(21,'Sidhi',20),(22,'Shahdol',20),(23,'Jabalpur',20),(24,'Mandla',20),(25,'Balaghat',20),(26,'Chhindwara',20),(27,'Damoh',20),(28,'Khajuraho',20),(29,'Tikamgarh',20),(30,'Araku',2),(31,'Srikakulam',2),(32,'Vizianagaram',2),(33,'Visakhapatnam',2),(34,'Anakapalli',2),(35,'Kakinada',2),(36,'Amalapuram',2),(37,'Rajahmundry',2),(38,'Narasapuram',2),(39,'Eluru',2),(40,'Machilipatnam',2),(41,'Vijayawada',2),(42,'Guntur',2),(43,'Narasaraopet',2),(44,'Bapatla',2),(45,'Ongole',2),(46,'Nandyal',2),(47,'Kurnool',2),(48,'Anantapur',2),(49,'Hindupur',2),(50,'Kadapa',2),(51,'Nellore',2),(52,'Tirupati',2),(53,'Rajampet',2),(54,'Chittoor',2),(55,'Arunachal West',3),(56,'Arunachal East',3),(57,'Kokrajhar',4),(58,'Dhubri',4),(59,'Barpeta',4),(60,'Mangaldoi',4),(61,'Gauhati',4),(62,'Diphu',4),(63,'Karimganj',4),(64,'Silchar',4),(65,'Nagaon',4),(66,'Kaziranga',4),(67,'Sonitpur',4),(68,'Lakhimpur',4),(69,'Dibrugarh',4),(70,'Jorhat',4),(71,'Valmiki Nagar',5),(72,'Paschim Champaran',5),(73,'Purvi Champaran',5),(74,'Sheohar',5),(75,'Sitamarhi',5),(76,'Madhubani',5),(77,'Jhanjharpur',5),(78,'Supaul',5),(79,'Araria',5),(80,'Kishanganj',5),(81,'Katihar',5),(82,'Purnia',5),(83,'Madhepura',5),(84,'Darbhanga',5),(85,'Muzaffarpur',5),(86,'Vaishali',5),(87,'Gopalganj',5),(88,'Siwan',5),(89,'Maharajganj',5),(90,'Saran',5),(91,'Hajipur',5),(92,'Ujiarpur',5),(93,'Samastipur',5),(94,'Begusarai',5),(95,'Khagaria',5),(96,'Bhagalpur',5),(97,'Banka',5),(98,'Munger',5),(99,'Nalanda',5),(100,'Patna Sahib',5),(101,'Pataliputra',5),(102,'Arrah',5),(103,'Buxar',5),(104,'Sasaram',5),(105,'Karakat',5),(106,'Jahanabad',5),(107,'Aurangabad',5),(108,'Gaya',5),(109,'Nawada',5),(110,'Jamui',5),(112,'Chandigarh',6),(113,'Sarguja',7),(114,'Raigarh',7),(115,'Janjgir-Champa',7),(116,'Korba',7),(117,'Bilaspur',7),(118,'Rajnandgaon',7),(119,'Durg',7),(120,'Raipur',7),(121,'Mahasamund',7),(122,'Bastar',7),(123,'Kanker',7),(124,'North Goa',10),(125,'South Goa',10),(126,'Dadra and Nagar Haveli',8),(127,'Daman and Diu',8),(128,'Chandni Chowk',9),(129,'North East Delhi',9),(130,'East Delhi',9),(131,'New Delhi',9),(132,'North West Delhi',9),(133,'West Delhi',9),(134,'South Delhi',9),(135,'Kachchh',11),(136,'Banaskantha',11),(137,'Patan',11),(138,'Mahesana',11),(139,'Sabarkantha',11),(140,'Gandhinagar',11),(141,'Ahmedabad East',11),(142,'Ahmedabad West',11),(143,'Surendranagar',11),(144,'Rajkot',11),(145,'Porbandar',11),(146,'Jamnagar',11),(147,'Junagadh',11),(148,'Amreli',11),(149,'Bhavnagar',11),(150,'Anand',11),(151,'Kheda',11),(152,'Panchmahal',11),(153,'Dahod',11),(154,'Vadodara',11),(155,'Chhota Udaipur',11),(156,'Bharuch',11),(157,'Bardoli',11),(158,'Surat',11),(159,'Navsari',11),(160,'Valsad',11),(161,'Ambala',12),(162,'Kurukshetra',12),(163,'Sirsa',12),(164,'Hisar',12),(165,'Karnal',12),(166,'Sonipat',12),(167,'Rohtak',12),(168,'Bhiwani-Mahendragarh',12),(169,'Gurgaon',12),(170,'Faridabad',12),(171,'Kangra',13),(172,'Mandi',13),(173,'Hamirpur',13),(174,'Shimla',13),(175,'Baramulla',14),(176,'Srinagar',14),(177,'Anantnag-Rajouri',14),(178,'Udhampur',14),(179,'Jammu',14),(180,'Rajmahal',15),(181,'Dumka',15),(182,'Godda',15),(183,'Chatra',15),(184,'Kodarma',15),(185,'Giridih',15),(186,'Dhanbad',15),(187,'Ranchi',15),(188,'Jamshedpur',15),(189,'Singhbhum',15),(190,'Khunti',15),(191,'Lohardaga',15),(192,'Palamau',15),(193,'Hazaribagh',15),(194,'Chikkodi',16),(195,'Belgaum',16),(196,'Bagalkot',16),(197,'Bijapur',16),(198,'Gulbarga',16),(199,'Raichur',16),(200,'Bidar',16),(201,'Koppal',16),(202,'Bellary',16),(203,'Haveri',16),(204,'Dharwad',16),(205,'Uttara Kannada',16),(206,'Davanagere',16),(207,'Shimoga',16),(208,'Udupi Chikmagalur',16),(209,'Hassan',16),(210,'Dakshina Kannada',16),(211,'Chitradurga',16),(212,'Tumkur',16),(213,'Mandya',16),(214,'Mysore',16),(215,'Chamarajanagar',16),(216,'Bangalore Rural',16),(217,'Bangalore North',16),(218,'Bangalore Central',16),(219,'Bangalore South',16),(220,'Chikballapur',16),(221,'Kolar',16),(222,'Kasaragod',17),(223,'Kannur',17),(224,'Vatakara',17),(225,'Wayanad',17),(226,'Kozhikode',17),(227,'Malappuram',17),(228,'Ponnani',17),(229,'Palakkad',17),(230,'Alathur',17),(231,'Thrissur',17),(232,'Chalakudy',17),(233,'Ernakulam',17),(234,'Idukki',17),(235,'Kottayam',17),(236,'Alappuzha',17),(237,'Mavelikara',17),(238,'Pathanamthitta',17),(239,'Kollam',17),(240,'Attingal',17),(241,'Thiruvananthapuram',17),(242,'Ladakh',18),(243,'Lakshadweep',19),(244,'Nandurbar',21),(245,'Dhule',21),(246,'Jalgaon',21),(247,'Raver',21),(248,'Buldhana',21),(249,'Akola',21),(250,'Amravati',21),(251,'Wardha',21),(252,'Ramtek',21),(253,'Nagpur',21),(254,'Bhandara-Gondiya',21),(255,'Gadchiroli-Chimur',21),(256,'Chandrapur',21),(257,'Yavatmal-Washim',21),(258,'Hingoli',21),(259,'Nanded',21),(260,'Parbhani',21),(261,'Jalna',21),(262,'Aurangabad',21),(263,'Dindori',21),(264,'Nashik',21),(265,'Palghar',21),(266,'Bhiwandi',21),(267,'Kalyan',21),(268,'Thane',21),(269,'Mumbai North',21),(270,'Mumbai North West',21),(271,'Mumbai North East',21),(272,'Mumbai North Central',21),(273,'Mumbai South Central',21),(274,'Mumbai South',21),(275,'Raigad',21),(276,'Maval',21),(277,'Pune',21),(278,'Baramati',21),(279,'Shirur',21),(280,'Ahmednagar',21),(281,'Shirdi',21),(282,'Beed',21),(283,'Osmanabad',21),(284,'Latur',21),(285,'Solapur',21),(286,'Madha',21),(287,'Sangli',21),(288,'Satara',21),(289,'Ratnagiri-Sindhudurg',21),(290,'Kolhapur',21),(291,'Hatkanangle',21),(292,'Inner Manipur',22),(293,'Outer Manipur',22),(294,'Shillong',23),(295,'Tura',23),(296,'Mizoram',24),(297,'Nagaland',25),(298,'Bargarh',26),(299,'Sundargarh',26),(300,'Sambalpur',26),(301,'Keonjhar',26),(302,'Mayurbhanj',26),(303,'Balasore',26),(304,'Bhadrak',26),(305,'Jajpur',26),(306,'Dhenkanal',26),(307,'Bolangir',26),(308,'Kalahandi',26),(309,'Nabarangpur',26),(310,'Kandhamal',26),(311,'Cuttack',26),(312,'Kendrapara',26),(313,'Jagatsinghpur',26),(314,'Puri',26),(315,'Bhubaneswar',26),(316,'Aska',26),(317,'Berhampur',26),(318,'Koraput',26),(319,'Puducherry',27),(320,'Gurdaspur',28),(321,'Amritsar',28),(322,'Khadoor Sahib',28),(323,'Jalandhar',28),(324,'Hoshiarpur',28),(325,'Anandpur Sahib',28),(326,'Ludhiana',28),(327,'Fatehgarh Sahib',28),(328,'Faridkot',28),(329,'Firozpur',28),(330,'Bathinda',28),(331,'Sangrur',28),(332,'Patiala',28),(333,'Ganganagar',29),(334,'Bikaner',29),(335,'Churu',29),(336,'Jhunjhunu',29),(337,'Sikar',29),(338,'Jaipur Rural',29),(339,'Jaipur',29),(340,'Alwar',29),(341,'Bharatpur',29),(342,'Karauli-Dholpur',29),(343,'Dausa',29),(344,'Tonk-Sawai Madhopur',29),(345,'Ajmer',29),(346,'Nagaur',29),(347,'Pali',29),(348,'Jodhpur',29),(349,'Barmer',29),(350,'Jalore',29),(351,'Udaipur',29),(352,'Banswara',29),(353,'Chittorgarh',29),(354,'Rajsamand',29),(355,'Bhilwara',29),(356,'Kota',29),(357,'Jhalawar-Baran',29),(358,'Sikkim',30),(359,'Thiruvallur',31),(360,'Chennai North',31),(361,'Chennai South',31),(362,'Chennai Central',31),(363,'Sriperumbudur',31),(364,'Kancheepuram',31),(365,'Arakkonam',31),(366,'Vellore',31),(367,'Krishnagiri',31),(368,'Dharmapuri',31),(369,'Tiruvannamalai',31),(370,'Arani',31),(371,'Villupuram',31),(372,'Kallakurichi',31),(373,'Salem',31),(374,'Namakkal',31),(375,'Erode',31),(376,'Tiruppur',31),(377,'Nilgiris',31),(378,'Coimbatore',31),(379,'Pollachi',31),(380,'Dindigul',31),(381,'Karur',31),(382,'Tiruchirappalli',31),(383,'Perambalur',31),(384,'Cuddalore',31),(385,'Chidambaram',31),(386,'Mayiladuturai',31),(387,'Nagapattinam',31),(388,'Thanjavur',31),(389,'Sivaganga',31),(390,'Madurai',31),(391,'Theni',31),(392,'Virudhunagar',31),(393,'Ramanathapuram',31),(394,'Thoothukkudi',31),(395,'Tenkasi',31),(396,'Tirunelveli',31),(397,'Kanyakumari',31),(398,'Adilabad',32),(399,'Peddapalle',32),(400,'Karimnagar',32),(401,'Nizamabad',32),(402,'Zahirabad',32),(403,'Medak',32),(404,'Malkajgiri',32),(405,'Secunderabad',32),(406,'Hyderabad',32),(407,'Chevella',32),(408,'Mahbubnagar',32),(409,'Nagarkurnool',32),(410,'Nalgonda',32),(411,'Bhongir',32),(412,'Warangal',32),(413,'Mahabubabad',32),(414,'Khammam',32),(415,'Tripura West',33),(416,'Tripura East',33),(417,'Saharanpur',34),(418,'Kairana',34),(419,'Muzaffarnagar',34),(420,'Bijnor',34),(421,'Nagina',34),(422,'Moradabad',34),(423,'Rampur',34),(424,'Sambhal',34),(425,'Amroha',34),(426,'Meerut',34),(427,'Baghpat',34),(428,'Ghaziabad',34),(429,'Gautam Buddha Nagar',34),(430,'Bulandshahr',34),(431,'Aligarh',34),(432,'Hathras',34),(433,'Mathura',34),(434,'Agra',34),(435,'Fatehpur Sikri',34),(436,'Firozabad',34),(437,'Mainpuri',34),(438,'Etah',34),(439,'Badaun',34),(440,'Aonla',34),(441,'Bareilly',34),(442,'Pilibhit',34),(443,'Shahjahanpur',34),(444,'Kheri',34),(445,'Dhaurahra',34),(446,'Sitapur',34),(447,'Hardoi',34),(448,'Misrikh',34),(449,'Unnao',34),(450,'Mohanlalganj',34),(451,'Lucknow',34),(452,'Rae Bareli',34),(453,'Amethi',34),(454,'Sultanpur',34),(455,'Pratapgarh',34),(456,'Farrukhabad',34),(457,'Etawah',34),(458,'Kannauj',34),(459,'Kanpur Urban',34),(460,'Akbarpur',34),(461,'Jalaun',34),(462,'Jhansi',34),(463,'Hamirpur',34),(464,'Banda',34),(465,'Fatehpur',34),(466,'Kaushambi',34),(467,'Phulpur',34),(468,'Prayagraj',34),(469,'Barabanki',34),(470,'Ayodhya',34),(471,'Ambedkar Nagar',34),(472,'Bahraich',34),(473,'Kaiserganj',34),(474,'Shrawasti',34),(475,'Gonda',34),(476,'Domariyaganj',34),(477,'Basti',34),(478,'Sant Kabir Nagar',34),(479,'Maharajganj',34),(480,'Gorakhpur',34),(481,'Kushi Nagar',34),(482,'Deoria',34),(483,'Bansgaon',34),(484,'Lalganj',34),(485,'Azamgarh',34),(486,'Ghosi',34),(487,'Salempur',34),(488,'Ballia',34),(489,'Jaunpur',34),(490,'Machhlishahr',34),(491,'Ghazipur',34),(492,'Chandauli',34),(493,'Varanasi',34),(494,'Bhadohi',34),(495,'Mirzapur',34),(496,'Robertsganj',34),(497,'Tehri Garhwal',35),(498,'Garhwal',35),(499,'Almora',35),(500,'Nainital-Udhamsingh Nagar',35),(501,'Haridwar',35),(502,'Cooch Behar',36),(503,'Alipurduars',36),(504,'Jalpaiguri',36),(505,'Darjeeling',36),(506,'Raiganj',36),(507,'Balurghat',36),(508,'Maldaha Uttar',36),(509,'Maldaha Dakshin',36),(510,'Jangipur',36),(511,'Baharampur',36),(512,'Murshidabad',36),(513,'Krishnanagar',36),(514,'Ranaghat',36),(515,'Bangaon',36),(516,'Barrackpore',36),(517,'Dum Dum',36),(518,'Barasat',36),(519,'Basirhat',36),(520,'Jaynagar',36),(521,'Mathurapur',36),(522,'Diamond Harbour',36),(523,'Jadavpur',36),(524,'Kolkata Dakshin',36),(525,'Kolkata Uttar',36),(526,'Howrah',36),(527,'Uluberia',36),(528,'Srerampur',36),(529,'Hooghly',36),(530,'Arambag',36),(531,'Tamluk',36),(532,'Kanthi',36),(533,'Ghatal',36),(534,'Jhargram',36),(535,'Medinipur',36),(536,'Purulia',36),(537,'Bankura',36),(538,'Bishnupur',36),(539,'Bardhaman Purba',36),(540,'Bardhaman-Durgapur',36),(541,'Asansol',36),(542,'Bolpur',36),(543,'Birbhum',36),(544,'Andaman & Nicobar Islands',1);
/*!40000 ALTER TABLE `parliament` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_type`
--

DROP TABLE IF EXISTS `role_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_type` (
  `role_type_id` int NOT NULL AUTO_INCREMENT,
  `role_type_name` varchar(255) DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`role_type_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_type`
--

LOCK TABLES `role_type` WRITE;
/*!40000 ALTER TABLE `role_type` DISABLE KEYS */;
INSERT INTO `role_type` VALUES (1,'Super Admin','2023-12-28 09:50:40','2024-01-10 05:29:22','none','none'),(2,'Parliament','2024-01-10 05:30:18','2024-01-10 05:30:18','Super Admin',NULL),(3,'Assembly','2024-01-10 05:30:59','2024-01-10 05:30:59','Super Admin',NULL),(4,'Subadmin','2024-01-11 12:26:37','2024-01-11 12:27:17','Super Admin',NULL),(5,'Mandal Officer','2024-01-11 12:18:21','2024-01-11 12:18:21','Super Admin',NULL),(6,'IT Cell Officer','2024-01-11 12:19:31','2024-01-11 12:19:31','Super Admin',NULL),(7,'Fake Voter Officer','2024-01-11 12:19:31','2024-01-11 12:19:31','Super Admin',NULL),(8,'Outer Voter Officer','2024-01-11 12:19:56','2024-01-11 12:19:56','Super Admin',NULL),(9,'BLA','2024-01-11 12:20:34','2024-01-11 12:20:34','Super Admin',NULL),(10,'BLO','2024-01-11 12:20:34','2024-01-11 12:20:34','Super Admin',NULL),(11,'Booth Officer','2024-01-10 09:19:17','2024-01-11 12:27:23','Super Admin',NULL);
/*!40000 ALTER TABLE `role_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_login`
--

DROP TABLE IF EXISTS `user_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_login` (
  `user_login_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otp` varchar(10) DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_login_id`),
  UNIQUE KEY `username` (`username`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_login`
--

LOCK TABLES `user_login` WRITE;
/*!40000 ALTER TABLE `user_login` DISABLE KEYS */;
INSERT INTO `user_login` VALUES (1,'superad','123456',NULL,1,'2024-01-02 08:50:03','2024-01-10 10:11:19','Super Admin',NULL),(7,'jeetubhai','Jeetu@123',NULL,8,'2024-01-13 06:19:35','2024-01-13 06:19:35','superad',NULL),(8,'vivek','Vivek@123',NULL,12,'2024-01-13 06:26:30','2024-01-13 06:26:30','jeetubhai',NULL);
/*!40000 ALTER TABLE `user_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_profile`
--

DROP TABLE IF EXISTS `user_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `contact` varchar(20) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `image` blob,
  `user_status` varchar(500) DEFAULT 'active',
  `created_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_by` varchar(255) DEFAULT NULL,
  `updated_by` varchar(255) DEFAULT NULL,
  `address_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `address_id` (`address_id`),
  CONSTRAINT `user_profile_ibfk_2` FOREIGN KEY (`address_id`) REFERENCES `address` (`address_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile`
--

LOCK TABLES `user_profile` WRITE;
/*!40000 ALTER TABLE `user_profile` DISABLE KEYS */;
INSERT INTO `user_profile` VALUES (1,'Sagar','Malviya','9893011711','dosomething@gmail.com',NULL,'active','2023-12-28 09:49:56','2024-01-10 10:09:24','Super Admin',NULL,44),(8,'Jeetu','Patwari','7854695965','jeetupatwari@gmail.com',NULL,'active','2024-01-13 06:19:35','2024-01-13 06:21:41','superad',NULL,51),(12,'Vivek','Chauhan','7564537497','vivekc@gmail.com',NULL,'active','2024-01-13 06:26:30','2024-01-13 06:26:30','jeetubhai',NULL,55);
/*!40000 ALTER TABLE `user_profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_role_id` int NOT NULL AUTO_INCREMENT,
  `role_type_id` int DEFAULT NULL,
  `user_id` int DEFAULT NULL,
  `role_place` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`user_role_id`),
  KEY `fk_role_1_idx` (`role_type_id`),
  KEY `fk_user_2_idx` (`user_id`),
  CONSTRAINT `fk_role_1` FOREIGN KEY (`role_type_id`) REFERENCES `role_type` (`role_type_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `fk_user_2` FOREIGN KEY (`user_id`) REFERENCES `user_profile` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES (1,1,1,'Indore'),(7,2,8,'Indore'),(8,6,12,'Rau');
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-16 11:51:10
