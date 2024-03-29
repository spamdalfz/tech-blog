const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('./auth');
const sequelize = require('../config/connection');

router.get('/', withAuth, async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'post_text', 'title', 'created_at'],
            include: [
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: { model: User, attributes: ['username'] }
                },
                { model: User, attributes: ['username'] }
            ]
        });

        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const { id } = req.params;
        const dbPostData = await Post.findOne({
            where: { id },
            attributes: ['id', 'post_text', 'title', 'created_at'],
            include: [
                { model: User, attributes: ['username'] },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                    include: { model: User, attributes: ['username'] }
                }
            ]
        });

        if (!dbPostData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        const post = dbPostData.get({ plain: true });
        res.render('edit-posts', { post, loggedIn: true });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

router.get('/newpost', (req, res) => {
    res.render('new-posts');
});
