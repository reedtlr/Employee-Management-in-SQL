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
}

module.exports = new db(connection);