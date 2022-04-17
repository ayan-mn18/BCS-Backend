const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes=require('./user.routes');
const productRoutes=require('./product.routes')

const router = express.Router();

const defaultRoutes = [
    {
        path: '/auth',
        route: authRoutes,
    },
    {
        path: '/user',
        route: userRoutes,
    },
    {
        path: '/product',
        route: productRoutes,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;