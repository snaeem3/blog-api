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
    err.status = 404;
    return next(err);
  }

  res.json(post);
});

exports.postCreatePOST = [
  body('title', 'Title must not be empty').trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    console.log(`title: ${body.title}`);
    console.log(`content: ${body.content}`);

    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      date: Date.now(),
      // author:
    });

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    } else {
      await post.save();
      res.status(201).json({ message: 'Post created succesfully' });
    }
  }),
];
