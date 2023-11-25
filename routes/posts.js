const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

router.get('/', postController.allPostsGET);

router.get('/:postId', postController.postDetailGET);

router.post('/new', authController.verifyToken, postController.postCreatePOST);

module.exports = router;
