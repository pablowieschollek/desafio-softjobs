--Crear base de datos
CREATE DATABASE softjobs;
--Acceder
\c softjobs;
--Crear tabla
CREATE TABLE usuarios ( id SERIAL, email VARCHAR(50) NOT NULL, password
VARCHAR(60) NOT NULL, rol VARCHAR(25), lenguage VARCHAR(20) );
--Seleccionar tabla
SELECT * FROM usuarios;
