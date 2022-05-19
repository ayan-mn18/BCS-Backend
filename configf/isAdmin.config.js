const { User } = require("../models");

const is_Admin = (req, res, next) => {
	if (req.user && req.user.is_admin) {
		req.admin = true ;
		next();
	}
	else {
		res.status(401);
		throw new Error('Only Admins can access this Route .');
	}
};

module.exports= is_Admin;
