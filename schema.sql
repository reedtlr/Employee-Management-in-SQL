DROP DATABASE IF EXISTS employee_track_DB;
CREATE database employee_track_DB;

USE employee_track_DB;

CREATE TABLE department (	
  id INT AUTO_INCREMENT NOT NULL,	
  name VARCHAR(30) NULL,	
  PRIMARY KEY (id)
);

CREATE TABLE role (	
  id INT AUTO_INCREMENT NOT NULL,	
  title VARCHAR(30) NULL,	 
  salary DECIMAL(15,4) NULL,	 
  department_id INT NULL,	  
  PRIMARY KEY (id), 
   FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);	

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE
);