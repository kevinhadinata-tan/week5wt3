-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2019 at 08:56 AM
-- Server version: 10.1.40-MariaDB
-- PHP Version: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wt3_w05`
--

-- --------------------------------------------------------

--
-- Table structure for table `songs`
--

CREATE TABLE `songs` (
  `kode_lagu` varchar(11) NOT NULL,
  `judul_lagu` varchar(200) NOT NULL,
  `nama_album` varchar(200) NOT NULL,
  `tahun_rilis` int(11) NOT NULL,
  `genre` varchar(50) DEFAULT NULL,
  `durasi` varchar(4) NOT NULL,
  `nama_penyanyi` varchar(200) NOT NULL,
  `nama_pengarang` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `songs`
--

INSERT INTO `songs` (`kode_lagu`, `judul_lagu`, `nama_album`, `tahun_rilis`, `genre`, `durasi`, `nama_penyanyi`, `nama_pengarang`) VALUES
('1', 'Permanent', 'Kids in Love', 2017, 'Pop', '3:48', 'Kygo', 'Oliver Nelson'),
('2', 'Natural', 'Natural', 2018, 'Rock', '3:09', 'Imagine Dragons', 'Mattias Larsson'),
('4', 'This is me', 'Dream', 2001, 'Dance-Pop', '3:12', 'It Was All a Dream', 'Frank');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `songs`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`kode_lagu`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
