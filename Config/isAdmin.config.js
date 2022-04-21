const { User } = require("../models");

const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		req.admin = true ;
		next();
	}
	else {
		res.status(401);
		throw new Error('Only Admins can access this Route .');
	}
};

module.exports= isAdmin;
