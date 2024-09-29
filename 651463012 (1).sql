-- phpMyAdmin SQL Dump
-- version 4.0.10.17
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Sep 29, 2024 at 12:09 PM
-- Server version: 5.1.73-community
-- PHP Version: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `651463012`
--

-- --------------------------------------------------------

--
-- Table structure for table `cafes`
--

CREATE TABLE IF NOT EXISTS `cafes` (
  `cafeID` int(3) unsigned zerofill NOT NULL,
  `openingHours` varchar(255) NOT NULL,
  `cafeName` varchar(255) NOT NULL,
  `detailsCafe` varchar(255) NOT NULL,
  `likes` int(100) NOT NULL,
  `img` longtext NOT NULL,
  `reviews` varchar(255) NOT NULL,
  `ratings` int(5) NOT NULL,
  `countyID` int(3) NOT NULL,
  PRIMARY KEY (`cafeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `cafes`
--

INSERT INTO `cafes` (`cafeID`, `openingHours`, `cafeName`, `detailsCafe`, `likes`, `img`, `reviews`, `ratings`, `countyID`) VALUES
(001, '09:00 - 17:30', 'Ctrl + ES', 'เป็นคาเฟ่สีน้ำเงิน ให้อารมณ์ เหมือนชายหาด', 24, 'img/CtrlES.jpg', '5', 0, 103),
(002, '09:00-17:30', 'Horizon', 'เป็นคาเฟ่แนวอบอุ่น มีน้ำตกภายในร้าน', 71, 'img/Horizon.jpg', '', 0, 103),
(003, '08:00-17:30', 'Texas Cafe', 'เป็นคาเฟ่แนว วัยรุ่นเมกา สไตล์สีดำแดงในร้าน', 20, 'img/Texas.jpg', '', 0, 101),
(004, '09:00-17:30', 'Coffe Se', 'เป็นคาเฟ่ริมแม่น้ำ วิวน้ำสวยๆ', 4, 'img/Coffe-Se.jpg', '', 0, 104),
(005, '08:00-17:30', 'Error Smith', 'เป็นคาเฟ่แนวศิลปะ สามารถไปวาดรูปได้', 3, 'img/ErrorSmith.jpg', '', 0, 101),
(006, '08:00-17:30', 'CAMP 71', 'เป็นคาเฟ่แนว แคมป์ปิ้งค์', 1, 'img/CAMP-71.jpg', '', 0, 106),
(007, '08:00-17:30', 'Green dream ', 'เป็นคาเฟ่ โทนสีเขียวตัดกับสีไข่', 2, 'img/Green-dream.jpg', '', 0, 101),
(008, '08:00-17:30', 'CAT ''n'' A CUP Cat', 'เป็นคาเฟ่แมวน่ารักๆหลายสายพันธุ์', 2, 'img/CAT ''n'' A CUP Cat.jpg', '', 0, 101),
(009, '08:00-17:30', 'Kyoto shi Cafe’', 'เป็นคาเฟ่แนวญี่ปุ่น', 2, 'img/Kyoto shi Cafe’.jpg', '', 0, 101),
(010, '08:00-17:30', 'Friendcation Cafe’', 'เป็นคาเฟ่สีขาว ดูมินิมอล', 1, 'img/Friendcation Cafe’.jpg', '', 0, 101),
(011, '08:00-17:30', 'The Dark cafe’', 'เป็นคาเฟ่สีดำ แนวแม่มด', 1, 'img/TheDarkcafe’.jpg', '', 0, 103),
(012, '08:00-17:30', 'Layo Cafe’', 'เป็นคาเฟ่แนวธรรมชาติ รับชมกับบรรยากาศกับดอยผาหมี', 1, 'img/Layo Cafe’.jpg', '', 0, 102),
(013, '08:00-17:30', 'สวนคุณปู่', 'เป็นคาเฟ่แนวธรรมชาติ รับชมกับบรรยากาศกับดอยผาหมี มีอ่างน้ำเล็กๆ กับวิวถ่ายรูปหลายที่', 2, 'img/สวนคุณปู่.jpg', '', 0, 102),
(014, '08:00-17:30', 'BearHouse', 'เป็นคาเฟ่แนวธรรมชาติ รับชมกับบรรยากาศกับดอยผาหมี และมีวิวที่เป็นเอกลักษณ์เฉพาะคาเฟ่นี้', 1, 'img/BearHouse.jpg', '', 0, 102),
(015, '08:00-17:30', 'Hoppy cafe’', 'เป็นคาเฟ่สีขาว แนวมินิมอล', 0, 'img/Hoppy cafe’.jpg', '', 0, 101),
(016, '08:00-17:30', 'ตาโฮ่', 'เป็นคาเฟ่แนวธรรมชาติ ใกล้เขื่อนน้ำ ', 0, 'img/ตาโฮ่.jpg', '', 0, 102),
(017, '08:00-17:30', 'TD cafe’', 'เป็นคาเฟ่แนวโมเดิร์น สองชั้น และมีแมวด้วย', 0, 'img/TD cafe’.jpg', '', 0, 102),
(018, '08:00-17:30', 'Akha PhamiO', 'เป็นคาเฟ่แนวธรรรมชาติให้ความรู้สึกเหมือนบ้านหมี', 0, 'img/Akha PhamiO.jpg', '', 0, 102),
(019, '08:00-17:30', 'Akha FarmVillie', 'เป็นคาเฟ่ดอยแกะ ที่มีวิวสวยมาก', 0, 'img/Akha FarmVillie.jpg', '', 0, 104),
(020, '08:00-17:30', 'Triple A', 'เป็นคาแฟ่สามเหลี่ยม มีวิวที่เป็นเอกลักษณ์', 0, 'img/Triple A.jpg', '', 0, 104),
(021, '08:00-17:30', 'Abonzo', 'เป็นคาเฟ่แบบเปิดวิว', 0, 'img/Abonzo.jpg', '', 0, 104),
(022, '08:00-17:30', 'Orasa Cafe’', 'เป็นคาเฟ่ที่มีแสงไฟสวยมาก', 0, 'img/Orasa Cafe’.jpg', '', 0, 102),
(023, '08:00-17:30', 'Something Journey', 'เป็นคาเฟ่ที่มีจุดถ่ายรูปเยอะมาก โทนสีขาวอ่อนๆ ให้ความอบอุ่น', 0, 'img/Something Journey.jpg', '', 0, 101),
(024, '08:00-17:30', 'space 99', 'เป็นคาเฟ่แนวโมเดิร์น สไตล์สีดำ', 0, 'img/space99.jpg', '', 0, 103),
(025, '08:00-17:30', 'lis’ta Cafe’', 'เป็นคาเฟ่แนวธรรมชาติ มีที่ถ่ายรูปหลายจุด ', 0, 'img/listaCafe.jpg', '', 0, 105),
(026, '08:00-17:30', 'Melt in your mouth', 'เป็นคาเฟ่แนวธรรมาชาติ', 0, 'img/Melt in your mouth.jpg', '', 0, 101),
(027, '08:00-17:30', 'Lalitta Cafe’', 'เป็นคาเฟ่แนวธรรมชาติ มีน้ำตก กับสวนดอกไม้สะสวนใหญ่', 0, 'img/Lalitta Cafe’.jpg', '', 0, 101),
(028, '08:00-17:30', 'UD cafe’', 'เป็นคาเฟ่แนวธรรมชาติ ให้ความรู้สึกเหมือนอยู่ใต้เงาต้นไม้', 0, 'img/UD cafe’.jpg', '', 0, 103),
(029, '08:00-17:30', 'chaichivit  cafe’', 'เป็นคาเฟ่แนว ธรรมชาติ ที่เป็นบ้านเล็กๆในการใช้ชีวิต', 0, 'img/chaichivit  cafe’.jpg', '', 0, 102),
(030, '08:00-17:30', 'The cups cafe’', 'เป็นคาเฟ่แนวมินิมอล', 0, 'img/The cups cafe’.jpg', '', 0, 103);

-- --------------------------------------------------------

--
-- Table structure for table `county`
--

CREATE TABLE IF NOT EXISTS `county` (
  `countyName` varchar(255) NOT NULL,
  `countyID` int(3) NOT NULL,
  PRIMARY KEY (`countyID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `county`
--

INSERT INTO `county` (`countyName`, `countyID`) VALUES
('เชียงราย', 101),
('แม่สาย', 102),
('บ้านดู่', 103),
('แม่สรวย', 104),
('นางแล', 105),
('แม่จัน', 106);

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE IF NOT EXISTS `likes` (
  `user_id` int(11) NOT NULL DEFAULT '0',
  `cafeID` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`cafeID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`user_id`, `cafeID`) VALUES
(0, 1),
(0, 2),
(0, 3),
(0, 4),
(0, 5),
(0, 8),
(0, 13);

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE IF NOT EXISTS `review` (
  `reviewID` int(5) NOT NULL,
  `cafeID` int(5) NOT NULL,
  `userID` int(5) NOT NULL,
  `rating` int(5) NOT NULL,
  `comment` varchar(255) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profliePicture` text,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=8 ;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `profliePicture`, `role`) VALUES
(1, 'new', '$2y$10$BdxJEG9Rtolh7ZzWadpzSOtOw7lxTxXVrBRhrCzXDq9iTYLEu0BC2', NULL, 'admin'),
(3, 'tong', '$2y$10$ceffJXSzKSlyEXth4VaBZeDfjIZiAtOeU6d2xok4nWSwY45wlof92', NULL, ''),
(4, 'test', '$2y$10$Y/PZKIaBkAb.cgJqK91IouBPjPmVbUm4IeYlOsgsYQ06cNCZsDWq2', NULL, 'user'),
(5, 'kkk', '$2y$10$MZ4PGqbXbUgYZkyIeIi59.z0wKaoZQLezbfum6lUZhOglEJC.88Oi', NULL, 'user'),
(6, 'ttt', '$2y$10$KFcYg6j8S1ihgRSwTYjFSOaFaD7z6Sbs28kphWQI0DbvnwTfTZnRe', NULL, 'user'),
(7, 'hhh', '$2y$10$FmOHF3gY/wHREvINh5z8GOBAZivJNQqrV1OVTKTlI6GiSh.BareNe', NULL, 'user');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
