// Router varialbe
const router = require('express').Router();
// Deconstructed variable
const { Post, Comment, User } = require('../models/');

//Get request for homepage
router.get('/', async (req, res) => {
  try {
    //Varialbe by finding all posts that have a user
    const postData = await Post.findAll({
    include: [User],
    });
    // Map through posts and return plain javascript
    const posts = postData.map((post) => post.get({ plain: true }));
    // Render "all-post.handlebars" targeting the posts
    res.render('all-posts', { posts });
    // or throw error
} catch (err) {
  // 500 Internal Server Error
    res.status(500).json(err);
  }
});
// Get request from signup page
router.get('/signup', (req, res) => {
    // if loggedIn, redirect to any page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
// Else send them to the signup page
  res.render('signup');
});
// Get request for one post according to their ID
router.get('/post/:id', async (req, res) => {
  try {
    //  Make variable that has parameter of id
    // The findByPk method obtains only a single entry from the table, using the provided primary key
    const postData = await Post.findByPk(req.params.id, {
        include: [
                User,
                  {
                    model: Comment,
                    include: [User],
                  },
                ],
            });
            // If there is post found, render single-post handlebar
        if (postData) {
          // variable to get data in plain javascript
      const post = postData.get({ plain: true });
      // Get post data and show single-post handlebar
      res.render('single-post', { post });
    } else {
      // The server can not find the requested resource.
      res.status(404).end();
    }
  } catch (err) {
    // Internal Server Error
    res.status(500).json(err);
  }
});
// Get request from login page. 
router.get('/login', (req, res) => {
    // if user is logged in, redirect to any page
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
// else send them to the login page
  res.render('login');
});
module.exports = router;
