const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

router.get('/', postController.allPostsGET);

router.get('/:id', postController.postDetailGET);

router.post('/new', authController.verifyToken, postController.postCreatePOST);

router.post(
  '/:id/comments',
  authController.verifyToken,
  commentController.commentCreatePOST,
);

module.exports = router;
