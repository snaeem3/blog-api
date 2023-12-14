const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Post = require('../models/post');
const Comment = require('../models/comment');

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
      res
        .status(201)
        .json({ message: 'Post created successfully', url: post.url });
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

exports.postDELETE = asyncHandler(async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).exec();
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }
    console.log(post);

    if (!req.user.isAdmin) {
      return res
        .status(403)
        .json({ error: 'You are not authorized to delete this post' });
    }

    // Delete comments associated with post from database
    console.log('post comments: ', post.comments);
    const result = await Comment.deleteMany({
      _id: { $in: post.comments },
    });

    await post.deleteOne();

    return res.status(200).json({
      message: `Deleted post ${req.params.id} and removed ${result.deletedCount} comment(s)`,
    });
  } catch (error) {
    console.error('Error deleting post: ', error);
    return next(error);
  }
});
