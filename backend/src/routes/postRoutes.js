const express = require('express');
const router = express.Router();
const { 
  createPost, 
  getAllPosts, 
  getPost, 
  updatePost, 
  deletePost 
} = require('../controllers/post_controllers');
const { authenticate, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', getAllPosts);
router.get('/:id', getPost);

// Protected routes - admin only
router.post('/', authenticate, authorize('admin'), createPost);
router.patch('/:id', authenticate, authorize('admin'), updatePost);
router.delete('/:id', authenticate, authorize('admin'), deletePost);

module.exports = router;