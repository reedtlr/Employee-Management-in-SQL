const inquirer = require("inquirer");
const mysql = require("mysql")
const cTable = require('console.table')
const db = require("./db/db.js")
const connection = require('./config/connect');
const util = require('util');

//promisifying the connection for async await
connection.query = util.promisify(connection.query);

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
          'Add employee',
          'Add role',
          'Add department',
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
  
          case 'Add employee':
            addEmployee();
            break;

          case 'Add role':
            addRole();
            break;

          case 'Add department':
            addDepartment();
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

  const empWithRoles = await db.getEmployeesWithRoles();
  const roles = empWithRoles.map(role => role.title);
  const managers = empWithRoles.filter(employee => employee.manager_id == null).map(employee => ({value: employee.id, name: employee.last_name}))
  
  inquirer
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
        message: "Select your employee's role from the list below",
        choices: roles, 
        name: "title"
      },
      {
        type: "list",
        name: "manager_id",
        message: "What is your employee's maanger's id?",
        choices: managers
      },
    ])
    .then((response) => {
     connection.query(
      'INSERT INTO employee LEFT JOIN role ON role.title = role.id  SET ?',
      {
        first_name: response.first_name,
        last_name: response.last_name,
        manager_id: response.manager_id,
        role_id: response.title
      },
      (err) => {
        if (err) throw err;
        console.log("successfully added employee")
        runProgram();
      })
    })
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

const viewAllRoles = async () => {
  const dbRoles = await db.getRoles();
  console.table(dbRoles);
  runProgram();
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

const addRole = async () => {
    
  connection.query('SELECT * FROM department',
    async (err, dRes) => {
      if (err) throw err;
      const departmentChoice = dRes.map(department => department.name)
    }, resolve)  
  
  
  await inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the title of the role you want to add?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary for this role?"
      },
      {
        type: "list",
        name: "department_id",
        message: "Which department should house this role?",
        choices: departmentChoice
      },
    ])
    .then((response) => {
      connection.query(
      'INSERT INTO role SET ?',
      {
        title: response.title,
        salary: response.salary,
        department_id: response.department_id
      },
      (err) => {
        if (err) throw err;
        console.log("successfully added a role")
        runProgram();
      })
    })
}


runProgram();