const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
const Post = require('../models/post');

exports.commentCreatePOST = [
  body('commentText', 'Comment must not be empty').trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);
    const comment = new Comment({
      post: req.params.id,
      content: req.body.commentText,
      date: Date.now(),
      author: req.body.authorId,
    });

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      await comment.save();
      const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
        $push: { comments: comment },
      });
      res.status(201).json({ message: 'Comment created successfully' });
    }
  }),
];
