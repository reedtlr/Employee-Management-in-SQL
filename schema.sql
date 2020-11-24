DROP DATABASE IF EXISTS employee_track_DB;
CREATE database employee_track_DB;

USE employee_track_DB;

CREATE TABLE employee (
  position INT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  rolde_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (position)
);

CREATE TABLE role (
  position INT NOT NULL,
  title VARCHAR(30) NULL,
 salary DECIMAL(15,4) NULL,
  department_id INT NULL,
  PRIMARY KEY (position)
);

CREATE TABLE department (
  position INT NOT NULL,
  name VARCHAR(30) NULL,
  PRIMARY KEY (position)
);
