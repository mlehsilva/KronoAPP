const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'aula',
    waitForConnections: true,
    connectionLimit: 10,
});

module.exports = db;
