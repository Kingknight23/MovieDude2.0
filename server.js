require('dotenv').config();
const express = require('express');
const path = require('path');
const api = require('./modules/api');

// Create Express app and router
const app = express();
const router = express.Router();

// Set the port
const PORT = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Define routes

// Home page route
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Trending route
router.get('/trending', getTrending);

// Trending movies route
router.get('/trending/movies', getTrendingMovies);

// Trending TV shows route
router.get('/trending/tvshow', getTrendingTVShows);

// About page route
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/htmlpages/about-us.html'));
});

// Mailing list page route
router.get('/mail', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/htmlpages/mailinglist.html'));
});

// Movie info page route
router.get('/info', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/htmlpages/movieinfo.html'));
});

// Get movie info route
router.get('/getInfo', getInfo);

// Search route
router.get('/search/:movie/:pgNum', search);

// Terms of service page route
router.get('/terms', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/htmlpages/terms-of-service.html'));
});

// Privacy policy page route
router.get('/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/htmlpages/privacy-policy.html'));
});

// Render page route (assuming it's the same as the home page)
router.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/htmlpages/render.html'));
});

// Route handlers

async function getTrending(req, res) {
    await handleApiRequest(req, res);
}

async function getTrendingMovies(req, res) {
    await handleApiRequest(req, res, 'movie');
}

async function getTrendingTVShows(req, res) {
    await handleApiRequest(req, res, 'tv');
}

async function getInfo(req, res) {
    try {
        const id = req.query.id;
        const type = req.query.type;
        const data = await api.html(id, type);
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

async function search(req, res) {
    const movieName = req.params.movie;
    const pgNum = req.params.pgNum;
    await handleApiRequest(req, res, movieName, pgNum);
}

async function handleApiRequest(req, res, ...params) {
    try {
        const data = await api.trending(req, res, ...params);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

// Use router for all routes
app.use('/', router);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
