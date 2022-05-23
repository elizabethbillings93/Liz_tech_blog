const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');
// Post request for every handlebars
// if authorized-can create comment
router.post('/', withAuth, async (req, res) => {
  try {
    // Variable to create comment using user Id and body
    const newComment = await Comment.create({
      //  Use userId from this session
      userId: req.session.userId,
      //  The req.body object allows you to access data in a string or JSON object from the client side. 
       ...req.body,
    });
    // return to readable string
    res.json(newComment);
  } catch (err) {
    // or throw error
    res.status(500).json(err);
  }
});

module.exports = router;
