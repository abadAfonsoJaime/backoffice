module.exports = function (req, res, next) {
    // auth middleware sets req.user
    if (!req.user.isAdmin) return res.status(403).send("Forbidden. Admin privileges required.");
    next();
}
// Admin can edit the database
// A initial user should be created to access the register webpage