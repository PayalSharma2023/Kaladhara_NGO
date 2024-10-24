const express = require('express');
const verifytoken = require("../middleware/authMiddleware");
const commentController = require('../controller/commentController');

const router = express.router();

router.post('/create', verifytoken, commentController.comment_post)
router.get('/getPostComments/:postId', verifytoken, commentController.comment_getpostcomment)
router.put('/likeComment/:commentId', verifytoken, commentController.comment_like)
router.put('/editComment/:commentId', verifytoken, commentController.comment_update)
router.delete('/deleteComment/:commentId', verifytoken, commentController.comment_delete)
router.get('/getcomments', verifytoken, commentController.comment_get)

module.exports = router;