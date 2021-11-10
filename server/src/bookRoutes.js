const express = require('express');
const bookController = require('./bookController');

const router = express.Router();

router.route('/').get(bookController.getBookList);

router.route('/:name').get(bookController.downloadBook);

module.exports = router;
