// Router object
const router = require ('express').Router();
// Variables for routes
const apiRoutes = require('./api/');
const homeRoutes = require ('./home-routes');
const dashboardRoutes= require('./dashboard-routes.js')
// Create paths
router.use ('/api',apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
// export
module.exports = router;