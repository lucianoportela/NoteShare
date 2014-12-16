-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               5.6.21-log - MySQL Community Server (GPL)
-- Server OS:                    Win64
-- HeidiSQL Version:             8.3.0.4694
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Dumping database structure for noteshare
CREATE DATABASE IF NOT EXISTS `noteshare` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `noteshare`;


-- Dumping structure for table noteshare.comentario
CREATE TABLE IF NOT EXISTS `comentario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `nota_id` int(11) NOT NULL,
  `descricao` text NOT NULL,
  `data` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=76 DEFAULT CHARSET=latin1;

-- Dumping data for table noteshare.comentario: ~11 rows (approximately)
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
INSERT INTO `comentario` (`id`, `usuario_id`, `nota_id`, `descricao`, `data`) VALUES
	(75, 11, 15, 'Uma das maiores empresas públicas...', '2014-10-25 16:49:39');
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;


-- Dumping structure for table noteshare.nota
CREATE TABLE IF NOT EXISTS `nota` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `usuario_id` int(11) NOT NULL,
  `titulo` varchar(200) NOT NULL,
  `descricao` text NOT NULL,
  `data` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;

-- Dumping data for table noteshare.nota: ~8 rows (approximately)
/*!40000 ALTER TABLE `nota` DISABLE KEYS */;
INSERT INTO `nota` (`id`, `usuario_id`, `titulo`, `descricao`, `data`) VALUES
	(2, 11, 'Aulas', 'Em aulas ou em palestras pode ser útil otimizar suas técnicas de anotações. Na foto, aparece um exemplo de anotação no método Cornell, apresentado pela Universidade de Stanford. ', '2014-10-22 21:30:05'),
	(3, 11, 'Método Cornell', 'O método Cornell consiste em dividir o espaço da folha de papel em três partes: a das informações principais, a das palavras-chave e a das relações entre os conteúdos ', '2014-10-22 21:30:08'),
	(4, 12, 'Nota Cornell', ' A técnica do método Cornell sistematiza as anotações e facilita a revisão de conteúdos. Economiza tempo, pois não é preciso passar a limpo. E, segundo especialistas, não tem desvantagens', '2014-10-22 21:30:10'),
	(5, 2, 'Nota Linhas Gerais', 'O método das linhas gerais consiste em anotar as informações com travessões e margens. ', '2014-10-22 21:30:11'),
	(12, 12, 'Henry Gantt', 'Henry Gantt (1919), parceiro de Taylor, estudou a ordem das operações, que muitas vezes eram executadas sem nenhum sincronismo ou ligação.', '2014-10-22 22:25:12'),
	(13, 12, 'PIB', 'Após registrar a maior alta mensal em seis anos em julho, o nível de atividade da economia brasileira continuou avançando em agosto, o que indica que o Produto Interno Bruto (PIB) poderá sair do "atoleiro" no terceiro trimestre deste ano – nos dois primeiros trimestres, o país entrou na chamada recessão técnica.', '2014-10-22 22:38:48'),
	(14, 11, 'Dólar em Alta', 'O dólar fechou em alta nesta quinta-feira (16), após pesquisas do Datafolha e do Ibope mostrarem estabilidade na corrida eleitoral, com Dilma Rousseff (PT) e Aécio Neves (PSDB) em empate técnico, sem que o tucano desse continuidade ao crescimento visto nos últimos levantamentos.', '2014-10-24 10:01:29'),
	(15, 10, 'Denúncia sobre Petrobras', 'Órgão dos EUA investiga se denúncia sobre Petrobras prejudicou acionistas\nObjetivo é apurar se denúncias feriram lei anticorrupção norte-americana.\nEstatal informou que ainda não foi notificada sobre apuração.', '2014-10-22 01:28:49');
/*!40000 ALTER TABLE `nota` ENABLE KEYS */;


-- Dumping structure for table noteshare.usuario
CREATE TABLE IF NOT EXISTS `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `senha` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=latin1;

-- Dumping data for table noteshare.usuario: ~9 rows (approximately)
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`) VALUES
	(2, 'Nadia', 'nadia@yahoo.com', 'QW48wUImBq0180411efda602218fb325d43f0c16b1'),
	(10, 'Jorge Taylor', 'jorge@yahoo.com', 'QW48wUImBq0180411efda602218fb325d43f0c16b1'),
	(11, 'Portela', 'portela@gmail.com', 'L0P963Cw2U9417cd349417e1032883cf94ebffd5f8'),
	(12, 'maria', 'maria@gmail.com', 'UAIywiO3z19e2e38b714bf3765a287c5d09501cd32');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
