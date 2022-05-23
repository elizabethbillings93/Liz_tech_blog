const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');
// Post request once authorized
router.post('/', withAuth, async (req, res) => {
  // created variable for body from request
  // req.body allows you to access data in a string or JSON object from the client side
  const body = req.body;
// create post 
  try {
    // Variable for creating "new post" providing body and user ID according to the current session
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    // return readable response
    res.json(newPost);
  } catch (err) {
    // or throw error
    res.status(500).json(err);
  }
});
// Put request based on Id, while authorized
router.put('/:id', withAuth, async (req, res) => {
  try {
    // Variable for updating post providing body
    const [affectedRows] = await Post.update(req.body, {
      where: {
        // the request parameter is the id
        id: req.params.id,
      },
    });
    // If there were any affect rows
    if (affectedRows > 0) {
      // 202 status- ACCEPTED: The resource describing the result of the action is transmitted in the message body.
      // end put request
      res.status(200).end();
    } else {
      // 404 status- The server can not find the requested resource.
      res.status(404).end();
    }
    // or throw Internal Server error
  } catch (err) {
    res.status(500).json(err);
  }
});
// Delete request by id once authorized
router.delete('/:id', withAuth, async (req, res) => {
  try {
    // DESTROY posts based on request parameter id
    const [affectedRows] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });
    // If any posts were destroyed, 
    // 202 status- ACCEPTED: The resource describing the result of the action is transmitted in the message body.
    if (affectedRows > 0) {
      res.status(200).end();
    } else {
      // 404 status- The server can not find the requested resource. 
      res.status(404).end();
    }
  } catch (err) {
    // or throw Internal Server error
    res.status(500).json(err);
  }
});

module.exports = router;
