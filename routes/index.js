const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../controllers/authMiddleware');
const {
    renderDashboard,
    renderNewPost,
    createPost,
    renderEditPost,
    updatePost,
    deletePost,
} = require('../controllers/dashboardController');

// Dashboard route
router.get('/', ensureAuthenticated, renderDashboard);

// New post routes
router.get('/new', ensureAuthenticated, renderNewPost);
router.post('/new', ensureAuthenticated, createPost);

// Edit post routes
router.get('/:id/edit', ensureAuthenticated, renderEditPost);
router.put('/:id', ensureAuthenticated, updatePost);

// Delete post route
router.delete('/:id', ensureAuthenticated, deletePost);

module.exports = router;
