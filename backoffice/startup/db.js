const mysql = require('mysql2');
const config = require('config');
const dbData = config.get('dbConfig');
const debug = require('debug')('backoffice:db');

const connection = mysql.createConnection({
    host: dbData.host,
    user: dbData.user,
    password: dbData.password,
    database: dbData.database,
    port: dbData.port || 3306
});

// Function to test database connection
function testConnection() {
    return new Promise((resolve, reject) => {
        connection.connect(function (err) {
            if (err) {
                debug(`Failed to connect to database: ${err.message}`);
                reject(err);
            } else {
                debug(`Connected to database:
    - host: ${dbData.host}
    - username: ${dbData.user}
    - database: ${dbData.database}`);
                resolve(connection);
            }
        });
    });
}

module.exports = connection;
module.exports.testConnection = testConnection;