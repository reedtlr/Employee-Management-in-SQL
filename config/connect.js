var mysql = require("mysql");
const util = require('util');

// // //promisifying the connection for async await
// connection.query = util.promisify(connection.query);

var connection = mysql.createConnection({
host: 'localhost',
port: 3306,
user: 'root',
password: 'root',
database: 'employee_track_DB',
});

var mysql = require("mysql");
connection.connect(err => {
if (err) throw err;
console.log("connected as id " + connection.threadId + "\n");
});


module.exports = connection;
