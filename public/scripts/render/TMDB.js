// const { response } = require("express");

const trendType = 'all';
var movieName = '';

async function trending(para = 'all') {
    try {
        let response;
        if (para === 'all') {
            response = await fetch('/trending');
        } else if (para === 'movie') {
            response = await fetch('/trending/movies');
        } else {
            response = await fetch('/trending/Tvshow');
        }

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Log or use the fetched data
        renderData(data);
    } catch (error) {
        // Handle errors
        console.error(error);
    }
}

async function searchByName(num = 1) {
    const search = document.getElementById('search').value;
    try {
        if (search) {
            movieName = search;
            response = await fetch(`/search/${search}/${num}`);
        } else if (movieName !== '') {
            response = await fetch(`/search/${movieName}/${num}`);
        } else {
            console.log("No search term provided");
            return; // Exit function early
        }

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Log or use the fetched data
        renderData(data);
        document.getElementById('search').value = '';
    } catch (error) {
        // Handle errors
        console.error(error);
    }
}

trending('all');
