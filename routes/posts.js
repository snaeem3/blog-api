const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');
const commentController = require('../controllers/commentController');

router.get('/', postController.allPostsGET);

router.get('/:id', postController.postDetailGET);

router.put('/:id', authController.verifyToken, postController.postDetailPUT);

router.delete('/:id', authController.verifyToken, postController.postDELETE);

router.post('/new', authController.verifyToken, postController.postCreatePOST);

router.get('/:id/comments', commentController.postCommentsGET);

router.post(
  '/:id/comments',
  authController.verifyToken,
  commentController.commentCreatePOST,
);

router.delete(
  '/:postId/comments/:commentId',
  authController.verifyToken,
  commentController.postCommentDELETE,
);

module.exports = router;
