const connection = require('../config/connect');
class db {
    constructor(connection) {
        this.connection = connection;
    }
    getEmployeesWithRoles() {
        return this.connection.query("SELECT employees.id, employees.first_name, employees.last_name, roles.title, manager_id FROM employees INNER JOIN roles ON employees.role_id = roles.id");
    }
}
module.exports = new db(connection);