const jwt = require('jsonwebtoken');
const config = require('config');

function generateToken(_id, _username, _isAdmin) {
    return jwt.sign({ id: _id, username: _username, isAdmin: _isAdmin }, config.get("jwtPrivateKey"));
}

exports.generateToken = generateToken