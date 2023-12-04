const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/:id/displayName', userController.displayNameGET);

module.exports = router;
