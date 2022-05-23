const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

// Get request for all new posts if authorized
router.get('/new', withAuth, (req, res) => {
//  Show new post handlebare
  res.render('new-post', {
    // With layout being dashboard
    layout: 'dashboard',
  });
});
// Get request with authorized user
router.get('/', withAuth, async (req, res) => {
  try {
    // Make variable for finding all posts
    const postData = await Post.findAll({
      // Based on user Id
      where: {
        userId: req.session.userId,
      },
    });
// Map through posts and get plain javascript 
    const posts = postData.map((post) => post.get({ plain: true }));
// Render/Show all-posts handlebar
    res.render('all-posts-admin', {
      // with layout being dashboard
      layout: 'dashboard',
      // And show posts
      posts,
    });
    // Or redirect to login if not authorized
  } catch (err) {
    res.redirect('login');
  }
});
// Get request for editing post by ID while authorized
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
  // Variable for finding post based on ID
  // The findByPk method obtains only a single entry from the table, using the provided primary key
    const postData = await Post.findByPk(req.params.id);
    // if there is post data
    if (postData) {
      // Variable to get data in plain javascript 
      const post = postData.get({ plain: true });
      // Render/Show the edit-post handlebar
      res.render('edit-post', {
        // With layou in dashboard
        layout: 'dashboard',
        // Show post
        post,
      });
    } else {
      // 404 status- The server can not find the requested resource. 
      // End response request
      res.status(404).end();
    }
  } catch (err) {
    // Or redirect to the login handlebar
    res.redirect('login');
  }
});

module.exports = router;
