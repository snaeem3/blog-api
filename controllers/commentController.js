const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const Comment = require('../models/comment');
const Post = require('../models/post');

exports.commentGET = asyncHandler(async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id).exec();
    console.log('Comment found', comment);
    res.status(200).json(comment);
  } catch (error) {
    console.error('Error Fetching Comment: ', error);
    throw error;
  }
});

exports.postCommentsGET = asyncHandler(async (req, res, next) => {
  const fetchCommentsByIds = async (commentIds) => {
    try {
      const comments = await Comment.find({ _id: { $in: commentIds } });
      console.log('Comments found: ', comments);
      return comments;
    } catch (error) {
      console.error('Error fetching comments: ', error);
      throw error;
    }
  };

  try {
    const post = await Post.findById(req.params.id).select('comments').exec();
    console.log('post: ', post);
    const postComments = await fetchCommentsByIds(post.comments);
    console.log('Post comments found', postComments);
    res.status(200).json(postComments);
  } catch (error) {
    console.error(`Error fetching ${req.params.id} comments`, error);
    throw error;
  }
});

exports.commentCreatePOST = [
  body('commentText', 'Comment must not be empty').trim().notEmpty().escape(),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
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

exports.postCommentDELETE = asyncHandler(async (req, res, next) => {
  try {
    console.log('user: ', req.user);
    const comment = await Comment.findByIdAndDelete(
      req.params.commentId,
    ).exec();
  } catch (error) {
    console.error('Error deleting comment: ', error);
    return next(error);
  }

  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.postId, {
      $pull: { comments: req.params.commentId },
    });
  } catch (error) {
    console.error('Error updating post: ', error);
    return next(error);
  }

  return res.status(200).json({
    message: `Deleted comment ${req.params.commentId} and removed comment from post ${req.params.postId}`,
  });
});
