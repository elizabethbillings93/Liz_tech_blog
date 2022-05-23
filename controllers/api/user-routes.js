// Make Router variable
const router = require('express').Router();
// Deconstructed variable for models folder
const { User } = require('../../models');
// Post request for user
router.post('/', async (req, res) => {
  try {
    // New variable for new user
    const newUser = await User.create({
      // req.body allows to access data in a string or JSON object from the client side
      // request username
      username: req.body.username,
      // request password
      password: req.body.password,
    });
// save new user
    req.session.save(() => {
      // save userid
      req.session.userId = newUser.id;
      // save username
      req.session.username = newUser.username;
      // save session logged in
      req.session.loggedIn = true;
// Make new user readable
      res.json(newUser);
    });
    //or throw Internal Server error
  } catch (err) {
    res.status(500).json(err);
  }
});
// Post request for login
router.post('/login', async (req, res) => {
  try {
    // Find username
    const user = await User.findOne({
      where: {
        // Find username in the sring
        username: req.body.username,
      },
    });
// if there is no user,
// Status 400- The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing).
    if (!user) {
      res.status(400).json(err);
      // Then end request
      return;
    }
// Make variable for requested password
    const validPassword = user.checkPassword(req.body.password);
// if the password is not correct, 
    if (!validPassword) {
      // Status 400-Bad Request
      res.status(400).json(err);
      // End request
      return;
    }
// If password and username are good, and user is now logged in alert they are logged in
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;
// Throw alert the user is now logged in
      res.json({ user, message: 'Logged In' });
    });
  } catch (err) {
    // Status 400-Bad Request
    res.status(400).json({ message: 'No account found' });
  }
});
// Post request to log out
router.post('/logout', (req, res) => {
  // if user is logged in, destroy the path and logout
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      // Status 204- No Content
      // End the response process
      res.status(204).end();
    });
  } else {
    // Status 404-The server can not find the requested resource.
    // End the response process
    res.status(404).end();
  }
});

module.exports = router;
