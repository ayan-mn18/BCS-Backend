const { User } = require("../models");

const isAdmin = (req, res, next) => {
	if (req.user && req.user.isAdmin) next();
	else {
		res.status(401);
		throw new Error('Not authorised admin');
	}
};

module.exports= isAdmin;
