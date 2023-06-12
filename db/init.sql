--CREATE  DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

SELECT 'CREATE DATABASE proyect_pg'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'proyect_pg')\gexec