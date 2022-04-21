const db = require('./db.config');
const checkAuth = require('./checkAuth.config');
const isAuthenticated = require('./isAuthenticated.config');
const isAdmin = require('./isAdmin.config');


module.exports = {
    db,
    checkAuth,
    isAuthenticated,
    isAdmin
}