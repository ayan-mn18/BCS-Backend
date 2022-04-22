const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes=require('./user.routes');
const productRoutes=require('./product.routes')
const reviewRoutes=require('./reviews.routes')
const featureproductRoutes=require('./featured_product.routes')

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
    {
        path: '/reviews',
        route: reviewRoutes,
    },
    {
        path: '/featured_product',
        route: featureproductRoutes,
    }
    
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;