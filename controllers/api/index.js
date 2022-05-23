const router = require('express').Router();
// Routes 
const userRoutes = require('./user-routes.js');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-route');
// Use these paths
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

module.exports = router;