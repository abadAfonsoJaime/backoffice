const mysql = require('mysql');
const config = require('config');
const dbData = config.get('db');
const debug = require('debug')('purisima:db');

const connection = mysql.createConnection({
    host: dbData.host,
    user: dbData.user,
    password: dbData.password,
    database: dbData.database
});

connection.connect(function (err) {
    if (err) {
        throw err

    } else {
        debug(`connected to
    - host:${dbData.host},
    - username:${dbData.user},
    - password:${dbData.password}`);
    }
});

module.exports = connection;