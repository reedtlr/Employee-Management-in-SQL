const inquirer = require("inquirer");
const mysql = require("mysql")
const cTable = require('console.table')

var connection = mysql.createConnection({
    host: 'localhost',
    // Your port; if not 3306
    port: 3306,
    // Your username
    user: 'root',
    // Your password
    password: 'root',
    database: 'employee_track_DB',
  });

  
  connection.connect(err => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
  });

  const runProgram = () => {
    inquirer
      .prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
          'View all employees?',
          'View all employees by department?',
          'View all employees by manager?',
          'Add employee',
          'Update employee role',
          'Update employee maanger',
          'exit',
        ],
      })
      .then((answer) => {
        switch (answer.action) {
          case 'View all employees?':
            viewAllEmployees();
            break;
  
          case 'View all employees by department?':
            viewAllEmployeesByDepartment();
            break;
  
          case 'View all employees by manager?':
            viewAllEmployeesByManager();
            break;
  
          case 'Add employee':
            addEmployee();
            break;
  
          case 'Update employee role':
            changeEmployeeRole();
            break;

          case 'Update employee maanger':
            changeEmployeeManager();
            break;
          
          case 'exit':
            connection.end();
            break;
        }
      });
  };

const viewAllEmployees = () => {
    connection.query(
        'SELECT * FROM mployee_track_DB',
        (err, res) => {
          if (err) throw err;
          console.table(['id', 'first_name', 'last_name', 'title', 'department', 'salary', 'manager'], values);
          runProgram();
        }
      );
}

runProgram();