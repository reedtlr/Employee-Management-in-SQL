const inquirer = require("inquirer");
const mysql = require("mysql")
const cTable = require('console.table')

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
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
          'View all roles?',
          'View all departments?',
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
  
          case 'View all roles?':
              viewAllRoles();
              break;
    
          case 'View all departments?':
            viewAllDepartments();
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

const addEmployee = async () => {
  try {
  
    const firstQuery = () => {
      return new Promise (resolve => {
        connection.query(
          'SELECT * FROM role',
          async (err, res) => {
            if (err) throw err;
           const roles = res.map(role => role.title)
          }, resolve)  
        
     })
    }
    
    const secondQuery = () => {
      return new Promise (resolve => {
        connection.query(
          'SELECT * FROM employee',
          async (err, managerRes) => {
            if (err) throw err;
           const employeeManagers = managerRes.filter(employee => {
            if (employee.manager_id == null){
              return employee;
            }})}, resolve) 
      
     })
    }
    
   

    const myFunc = async () => {
        let firstData = await firstQuery()
        let secondData = await secondQuery()

      await inquirer
  .prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the employee's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is your employee's last name?"
    },
    {
      type: "list",
      name: "title",
      message: "Select your employee's role from the list below",
      choices: roles
    },
    {
      type: "list",
      name: "manager_id",
      message: "What is your employee's maanger's id?",
      choices: employeeManagers,
      default: "null"
    },
  ])
  .then((response) => {
    connection.query(
  'INSERT INTO employee, role SET ?',
  {
    first_name: response.first_name,
    last_name: response.last_name,
    manager_id: response.manager_id,
    title: response.title
  },
  (err) => {
    if (err) throw err;
    console.log("successfully added employee")
    runProgram();
  })
  })
 
 } } catch (error){
    console.log(error)
  }
  myFunc();
}

const viewAllEmployees = () => {
    connection.query(
        'SELECT * FROM employee',
        (err, res) => {
          if (err) throw err;
          console.table(res);
          runProgram();
        }
      );
}

const viewAllRoles = () => {
  connection.query(
      'SELECT * FROM role',
      (err, res) => {
        if (err) throw err;
        console.table(res);
        runProgram();
      }
    );
}

const viewAllDepartments = () => {
  connection.query(
      'SELECT * FROM department',
      (err, res) => {
        if (err) throw err;
        console.table(res);
        runProgram();
      }
    );
}

runProgram();