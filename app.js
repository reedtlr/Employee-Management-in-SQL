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
  const roles = await connection.query(
    'SELECT * FROM role',
    (err, res) => {
      if (err) throw err;
      console.log("Role Table:" + '\n');
      console.table(res);
      return res;
    }
  );
  console.log(roles)

  // const employees = await connection.query(
  //   'SELECT * FROM employee',
  //   (err, res) => {
  //     if (err) throw err;
  //     console.log("Employee Table:" + '\n');
  //     console.table(res);
      
  //   }
  // );

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
      name: "role_id",
      message: "Enter your employee's role id from the table above",
      choices: roles.map(role => ({value: role.id, name: role.title}))
    },
    {
      name: "manager_id",
      message: "What is your employee's maanger's id?"
    },
  ])
  .then((response) => {
    connection.query(
  'INSERT INTO employee SET ?',
  {
    first_name: response.first_name,
    last_name: response.last_name,
    role_id: response.role_id,
    manager_id: response.manager_id
  },
  (err) => {
    if (err) throw err;
    console.log("successfully added employee")
    runProgram();
  }
)
  })
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

runProgram();