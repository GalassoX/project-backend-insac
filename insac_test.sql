CREATE TABLE `insac_test`.`usuarios` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `documento` INT NOT NULL,
    `primer_nombre` TEXT NOT NULL,
    `segundo_nombre` TEXT NOT NULL DEFAULT '',
    `primer_apellido` TEXT NOT NULL,
    `segundo_apellido` TEXT NOT NULL,
    `celular` INT NOT NULL,
    `correo` TEXT NOT NULL,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
CREATE TABLE `insac_test`.`negocios` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `nombre` TEXT NOT NULL,
    `direccion` TEXT NOT NULL,
    `celular` INT NOT NULL,
    `correo` TEXT NOT NULL,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
CREATE TABLE `insac_test`.`usuarios_negocios` (
    `ID` INT NOT NULL AUTO_INCREMENT,
    `id_usuario` INT NOT NULL,
    `id_negocio` INT NOT NULL,
    PRIMARY KEY (`ID`)
) ENGINE = InnoDB;
ALTER TABLE `insac_test`.`usuarios_negocios`
ADD CONSTRAINT `user_fk_1` FOREIGN KEY (`id_usuario`) REFERENCES usuarios(`ID`);
ALTER TABLE `insac_test`.`usuarios_negocios`
ADD CONSTRAINT `negocio_fk_1` FOREIGN KEY (`id_negocio`) REFERENCES negocios(`ID`);