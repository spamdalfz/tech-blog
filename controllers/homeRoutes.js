const { Post, User, Comment } = require('../models');
const router = require('express').Router();

// Render all posts to the homepage
router.get('/', async (req, res) => {
    try {
        const dbPostData = await Post.findAll({
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
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Redirect users to the homepage once they log in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

// Render the sign-up page
router.get('/signup', (req, res) => {
    res.render('signup');
});

// Render one post to the single-post page
router.get('/post/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const dbPostData = await Post.findOne({
            where: { id },
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

        if (!dbPostData) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        const post = dbPostData.get({ plain: true });
        res.render('single-post', { post, loggedIn: req.session.loggedIn });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;
