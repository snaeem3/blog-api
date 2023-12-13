const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Post = require('../models/post');

exports.allPostsGET = asyncHandler(async (req, res, next) => {
  const allPosts = await Post.find({});
  res.json(allPosts);
});

exports.postDetailGET = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).exec();

  if (post === null) {
    // No results
    const err = new Error('Post not found');
    console.error(err);
    err.status = 404;
    return next(err);
  }

  res.status(200).json({ post });
});

exports.postCreatePOST = [
  body('title', 'Title must not be empty').trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      date: Date.now(),
      author: req.user.userId,
    });

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      await post.save();
      res.status(201).json({ message: 'Post created successfully' });
    }
  }),
];

exports.postDetailPUT = [
  body('title', 'Title must not be empty').trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    // Extract the validation errors from a request.
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        { title: req.body.title, content: req.body.content },
        {},
      ).exec();
      res.status(200).json({ message: 'Post updated successfully' });
    }
  }),
];
