const express = require('express');

const router = express.Router();

const postController = require('../controllers/postController');

router.get('/', postController.allPostsGET);

router.get('/:postId', postController.postDetailGET);

router.post('/new', postController.postCreatePOST);

module.exports = router;
