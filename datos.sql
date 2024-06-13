-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.35 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando datos para la tabla jupiter.autor: ~5 rows (aproximadamente)
INSERT INTO `autor` (`id_autor`, `apellido1`, `apellido2`, `nombre`)
VALUES (1, 'SáezA', 'Vega', 'Daniel'),
       (5, 'a', 'A', 'Aa'),
       (6, 'a', 'A', 'Aa'),
       (7, 'APrueaba', NULL, 'APrueaba'),
       (10, 'Jiada', 'Jiada', 'Jiada'),
       (12, 'Chen', NULL, 'Jiada'),
       (23, 'A', NULL, 'JiadaA');

-- Volcando datos para la tabla jupiter.autor_seq: ~1 rows (aproximadamente)
INSERT INTO `autor_seq` (`next_val`)
VALUES (13);

-- Volcando datos para la tabla jupiter.comic: ~16 rows (aproximadamente)
INSERT INTO `comic` (`id_comic`, `ano_publicacion`, `idioma`, `portada`, `sinopsis`, `titulo`, `id_editorial`, `tipo`)
VALUES (1, 1231, 'español', 'http://localhost:8080/media/comic/comic-A.png', 'Asd', 'A', 1, 'Cómics Americano'),
       (2, 0, 'español', 'http://localhost:8080/media/comic/comic-A.png', 'Asd', 'A', 1, 'Cómics Americano'),
       (3, 2222, 'español', 'http://localhost:8080/media/comic/comic-Av-Manga-2222.png', 'a', 'Av', 1, 'Manga'),
       (4, 1233, 'Ad', 'http://localhost:8080/media/comic/comic-Bva-Manga-1233.webp', '', 'Bva', 1, 'Manga'),
       (5, 0, 'español', 'http://localhost:8080/media/comic/comic-A.png', 'Asd', 'A', 1, 'Cómics Americano'),
       (6, 0, 'español', 'http://localhost:8080/media/comic/comic-A.png', 'Asd', 'A', 1, 'Cómics Americano'),
       (7, 0, 'español', 'http://localhost:8080/media/comic/comic-A.png', 'Asd', 'A', 1, 'Cómics Americano'),
       (8, 0, 'español', 'http://localhost:8080/media/comic/comic-A.png', 'Asd', 'A', 1, 'Cómics Americano'),
       (12, 0, 'español', 'http://localhost:8080/media/comic/comic-A.png', 'Asd', 'A', 1, 'Cómics Americano'),
       (13, 1231, 'español', 'http://localhost:8080/media/comic/comic-TestA.png', 'A', 'TestA', 1, 'Manga'),
       (14, 1233, 'A', 'http://localhost:8080/media/comic/comic-APrueabaA-Manga-1233.png', 'A', 'APrueabaA', 1,
        'Manga'),
       (25, 123123, 'español', 'http://localhost:8080/media/comic/comic-TestA.png', 'A', 'TestA', 1, 'Manga'),
       (26, 0, 'español', 'http://localhost:8080/media/comic/comic-A.png', 'Asd', 'A', 1, 'Cómics Americano'),
       (27, 0, 'español', 'http://localhost:8080/media/comic/comic-A.png', 'Asd', 'A', 1, 'Cómics Americano'),
       (28, 1233, 'A', 'http://localhost:8080/media/comic/comic-APrueabaA-Manhwa-1233.png', 'a', 'APrueabaA', 3,
        'Manhwa'),
       (33, 1233, 'ASda', 'http://localhost:8080/media/comic/comic-TestA-C%C3%B3mics%20Americano-1233.png', 'a',
        'TestA', 2, 'Cómics Americano'),
       (34, 1333, 'español', 'http://localhost:8080/media/comic/comic-TestA-Manhwa-1333.webp', 'aa', 'TestA', 3,
        'Manhwa');

-- Volcando datos para la tabla jupiter.comic_autor: ~7 rows (aproximadamente)
INSERT INTO `comic_autor` (`id_comic`, `id_autor`)
VALUES (1, 1),
       (3, 1),
       (4, 1),
       (13, 1),
       (25, 1),
       (14, 7),
       (33, 10),
       (34, 12),
       (27, 23),
       (28, 23);

-- Volcando datos para la tabla jupiter.comic_genero: ~8 rows (aproximadamente)
INSERT INTO `comic_genero` (`id_comic`, `id_genero`)
VALUES (1, 7),
       (3, 7),
       (4, 7),
       (13, 7),
       (14, 7),
       (25, 7),
       (27, 7),
       (28, 7),
       (33, 7),
       (34, 7),
       (14, 8),
       (28, 8),
       (28, 9),
       (33, 9),
       (28, 10),
       (28, 11);

-- Volcando datos para la tabla jupiter.comic_seq: ~1 rows (aproximadamente)
INSERT INTO `comic_seq` (`next_val`)
VALUES (35);

-- Volcando datos para la tabla jupiter.editorial: ~8 rows (aproximadamente)
INSERT INTO `editorial` (`id_editorial`, `nombre`)
VALUES (1, 'Test'),
       (2, 'prueba'),
       (3, 'admin'),
       (4, 'prueba1'),
       (5, 'adminaaaaa'),
       (6, 'aasad'),
       (7, 'asdsadsa'),
       (52, 'Caja de almacenamiento para refrigerador');

-- Volcando datos para la tabla jupiter.editorial_seq: ~0 rows (aproximadamente)
INSERT INTO `editorial_seq` (`next_val`)
VALUES (251);

-- Volcando datos para la tabla jupiter.genero: ~5 rows (aproximadamente)
INSERT INTO `genero` (`id_genero`, `nombre`)
VALUES (7, 'prueba'),
       (8, 'Terror'),
       (9, 'Comedia'),
       (10, 'Caja de almacenamiento para refrigerador'),
       (11, 'Drama');

-- Volcando datos para la tabla jupiter.genero_seq: ~0 rows (aproximadamente)
INSERT INTO `genero_seq` (`next_val`)
VALUES (12);

-- Volcando datos para la tabla jupiter.libro: ~7 rows (aproximadamente)
INSERT INTO `libro` (`id_libro`, `isbn`, `ano_publicacion`, `idioma`, `num_pag`, `portada`, `sinopsis`, `titulo`,
                     `id_editorial`)
VALUES (1, NULL, 1111, 'español', 0, 'http://localhost:8080/media/libro/libro-TestAA.png', '422', 'TestAA', 1),
       (3, NULL, 1111, 'español', 13, 'http://localhost:8080/media/libro/libro-TestAAa.png', 'a', 'TestAAa', 1),
       (4, NULL, 3232, 'español', 13, 'http://localhost:8080/media/libro/libro-TestAAa-3232-13.png', '2', 'TestAAa', 1),
       (5, NULL, 3232, 'español', 0, 'http://localhost:8080/media/libro/libro-TestAAa-3232-0.png', '', 'TestAAa', 1),
       (6, NULL, 3232, 'español', 0, 'http://localhost:8080/media/libro/libro-TestAAa-3232-0.png', 'a', 'TestAAa', 3),
       (7, NULL, 2000, 'español', 5555, 'http://localhost:8080/media/libro/libro-MIMI-2000-5555.png', 'e', 'MIMI', 1),
       (8, NULL, 9999, 'chino', 88, 'http://localhost:8080/media/libro/libro-MIMIpp-9999-88.png', 'dd', 'MIMIpp', 2);

-- Volcando datos para la tabla jupiter.libro_autor: ~8 rows (aproximadamente)
INSERT INTO `libro_autor` (`id_libro`, `id_autor`)
VALUES (1, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (7, 1),
       (5, 5),
       (8, 6),
       (1, 23),
       (5, 23);

-- Volcando datos para la tabla jupiter.libro_genero: ~9 rows (aproximadamente)
INSERT INTO `libro_genero` (`id_libro`, `id_genero`)
VALUES (1, 7),
       (3, 7),
       (4, 7),
       (5, 7),
       (7, 7),
       (8, 7),
       (5, 8),
       (8, 8),
       (5, 9);

-- Volcando datos para la tabla jupiter.libro_seq: ~1 rows (aproximadamente)
INSERT INTO `libro_seq` (`next_val`)
VALUES (21);

-- Volcando datos para la tabla jupiter.pedido: ~5 rows (aproximadamente)
INSERT INTO `pedido` (`id_pedido`, `estado`, `fecha`, `precio`, `id_comprador`, `id_producto`, `id_vendedor`)
VALUES (3, 'Enviado', '2024-01-29 20:49:28.000000', 11101, 2, 7, 1),
       (4, 'Pediente', '2024-01-29 20:55:44.000000', 1110, 2, 8, 2),
       (5, 'Pediente', '2024-01-29 20:58:10.000000', 1, 2, 9, 2),
       (6, 'Pediente', '2024-01-29 20:59:10.000000', 1, 2, 10, 2),
       (7, 'Enviado', '2024-01-31 19:15:42.000000', 0.01, 1, 11, 1),
       (8, 'Pediente', '2024-05-31 18:18:35.595000', 1, 1, 12, 1),
       (9, 'Entregado', '2024-05-31 20:28:34.000000', 0, 5, 13, 1),
       (12, 'Pediente', '2024-05-31 21:19:10.690000', 1, 7, 15, 5),
       (13, 'Pediente', '2024-05-31 21:19:21.027000', 0, 7, 17, 1);

-- Volcando datos para la tabla jupiter.pedido_seq: ~0 rows (aproximadamente)
INSERT INTO `pedido_seq` (`next_val`)
VALUES (14);

-- Volcando datos para la tabla jupiter.producto: ~4 rows (aproximadamente)
INSERT INTO `producto` (`id_producto`, `descripcion`, `imagen`, `precio`, `id_usuario`, `comprado`, `nombre`)
VALUES (7, 'a', 'http://localhost:8080/media/producto/producto-Nevera-1-11101.png', 11101, 1, b'1', 'Nevera'),
       (8, 'a', 'http://localhost:8080/media/producto/producto-Nevera-2-1110.png', 1110, 2, b'1', 'Nevera'),
       (9, '1', 'http://localhost:8080/media/producto/producto-Nevera-2-0.png', 1, 2, b'1', 'Nevera'),
       (10, '123', 'http://localhost:8080/media/producto/producto-Nevera-2-1.png', 1, 2, b'1', 'Nevera'),
       (11, 'A', 'http://localhost:8080/media/producto/producto-Nevera-1-0.01.png', 0.01, 1, b'1', 'Nevera'),
       (12, 'A', 'http://localhost:8080/media/producto/producto-A-1-1.png', 1, 1, b'1', 'A'),
       (13, '', 'http://localhost:8080/media/producto/producto-A-1-0.png', 0, 1, b'1', 'A'),
       (14, '', 'http://localhost:8080/media/producto/producto-ASd-1-1.png', 1, 1, b'1', 'ASd'),
       (15, 'Adasd', 'http://localhost:8080/media/producto/producto-Prueba-5-1.png', 1, 5, b'1', 'PruebaAAAAAAAA'),
       (17, 'Ad', 'http://localhost:8080/media/producto/producto-admin-1-0.png', 0, 1, b'1', 'admin'),
       (18, 'A',
        'http://localhost:8080/media/producto/producto-Caja%20de%20almacenamiento%20para%20refrigerador%20V-1-1111.png',
        1111, 1, b'0', 'Caja de almacenamiento para refrigerador V'),
       (19, 'asd',
        'http://localhost:8080/media/producto/producto-Caja%20de%20almacenamiento%20para%20refrigerador%20ASd-1-1230.webp',
        1, 1, b'0', 'Caja de almacenamiento para refrigerador ASd'),
       (20, 'asd', 'http://localhost:8080/media/producto/producto-admin-7-13.png', 13, 7, b'0', 'admin');

-- Volcando datos para la tabla jupiter.producto_seq: ~0 rows (aproximadamente)
INSERT INTO `producto_seq` (`next_val`)
VALUES (21);

-- Volcando datos para la tabla jupiter.resena: ~2 rows (aproximadamente)
INSERT INTO `resena` (`id_resena`, `calificacion`, `texto`, `id_comic`, `id_libro`, `id_usuario`)
VALUES (8, 5, 'ASd', NULL, 1, 2),
       (9, 5, 'ASdasdSS', 1, NULL, 2),
       (11, 5, 'A', 4, NULL, 1),
       (12, 3, 'APrueba', 1, NULL, 5),
       (13, 5, 'Asad', NULL, 1, 5),
       (16, 1, 'ASd', NULL, 1, 1),
       (17, 4, 'ADsdASd', 1, NULL, 1);

-- Volcando datos para la tabla jupiter.resena_seq: ~0 rows (aproximadamente)
INSERT INTO `resena_seq` (`next_val`)
VALUES (18);

-- Volcando datos para la tabla jupiter.usuario: ~2 rows (aproximadamente)
INSERT INTO `usuario` (`id_usuario`, `contrasena`, `correo`, `imagen`, `nombre`, `direccion`, `rol`)
VALUES (1, 'admin', 'admin@admin.com', 'http://localhost:8080/media/usuario/usuario-admin-admin@admin.com.webp',
        'admin', 'SDasd', 'admin'),
       (2, '1234', 'prueba@a.com', 'http://localhost:8080/media/usuario/default-perfil.webp', 'admin2', 'Bhrams 6',
        'usuario'),
       (5, 'jiada', 'jiada@a.com', 'http://localhost:8080/media/usuario/default-perfil.webp', 'jiadaA', 'a', 'usuario'),
       (7, 'jiada', 'jiada@b.com', 'http://localhost:8080/media/usuario/default-perfil.webp', 'jiada', 'A', 'admin');

-- Volcando datos para la tabla jupiter.usuario_seq: ~1 rows (aproximadamente)
INSERT INTO `usuario_seq` (`next_val`)
VALUES (8);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
