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
            }})
          }, resolve) 
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
        choices: firstData
      },
      {
        type: "list",
        name: "manager_id",
        message: "What is your employee's maanger's id?",
        choices: secondData
      },
    ])
    .then((response) => {
      connection.query(
      'INSERT INTO employee SET ?',
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
    myFunc();
    } 
  } catch (error){
        console.log(error)
        }
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