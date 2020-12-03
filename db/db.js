const connection = require('../config/connect');

class db {
    constructor(connection) {
        this.connection = connection;
    }
    getEmployeesWithRoles() {
        return this.connection.query("SELECT employee.id, employee.first_name, employee.last_name, role.title, manager_id FROM employee INNER JOIN role ON employee.role_id = role.id");
    }
    getRoles() {
        return this.connection.query("SELECT * FROM role");
    }
    getDepartments() {
        return this.connection.query("SELECT * FROM department");
    }
    addRole(addRole) {
        return this.connection.query("INSERT INTO role SET ?",
            {
                title: addRole.title,
                salary: addRole.salary,
                department_id: addRole.department_id,
            });
    }
    addDepartment(department) {
        return this.connection.query(
            "INSERT INTO department SET ?",
            {
                name: department.name,
            });
    }
    updateEmployeeRole(joinQ) {
        return this.connection.query("UPDATE employee SET ? WHERE ?", [{
            role_id: joinQ.updateRoleID
        },
        {
            id: joinQ.updateID
        }]);
    }
    updateEmployeeManager(updateMngrs) {
        return this.connection.query("UPDATE employee SET ? WHERE ?",
            [{
                manager_id: updateMngrs.updateMngrID,
            },
            {
                id: updateMngrs.updateMngr
            }
            ]);
    }
}

module.exports = new db(connection);