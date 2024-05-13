const APIKEY = process.env.TMDB_API_KEY;

async function trending(req, res, type = 'all') {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${APIKEY}`
        }
    };

    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/${type}/day?language=en-US`, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return 0;
    }
}

async function search(name, pgNum = 1) {
    pgNum = parseInt(pgNum);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${APIKEY}`
        }
    };
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(name)}&include_adult=false&language=en-US&page=${encodeURIComponent(pgNum)}`, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
        return 0;
    }
}

async function info(num, type = '') {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${APIKEY}`
        }
    };
    try {
        if (!type) {
            throw new Error("Media type not available");
        }
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${num}?language=en-US`, options);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error(err);
    }
}

function findVideoByType(videos, type) {
    return videos.find(video => video.name.includes(type));
}

async function youtubeKey(num, type = '') {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${APIKEY}`
        }
    };
    try {
        if (!type) {
            throw new Error("Media type not available");
        }
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${num}/videos?language=en-US`, options);
        const data = await response.json();

        const trailer = findVideoByType(data.results, 'Official Trailer');
        const teaser = !trailer ? findVideoByType(data.results, 'Teaser Trailer') : null;
        const chosenVideo = trailer || teaser;

        return chosenVideo;
    } catch (err) {
        console.error(err);
    }
}

function tags(data) {
    let str = '';
    for (let i = 0; i < data.genres.length; i++) {
        const genre = data.genres[i].name;
        str += `<a href="" class="tag">${genre}</a>`;
    }
    return str;
}

async function DataFormat(num, type = '') {
    const movieRes = await info(num, type);
    const ytkey = await youtubeKey(num, type);

    const run = `<h3>Duration : ${movieRes.runtime} mins </h3>`;
    const eps = `<h3>Seasons : ${movieRes.number_of_seasons}</h3>
                <h3>number of episodes: ${movieRes.number_of_episodes}</h3>`;
    const htmlFormat = `
        <img src="https://image.tmdb.org/t/p/w${500}${movieRes.poster_path}" alt="poster" class="poster">
        <section>
            <h1>${movieRes.original_name || movieRes.original_title}</h1>
            <h3>${movieRes.overview}</h3>
            <aside class="tags loadertag">
                ${tags(movieRes)}
            </aside>
            ${movieRes.runtime ? run : eps}
            <aside class="tags">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${ytkey.key}" frameborder="0" alt="youtube">
                </iframe>
            </aside>
        </section>`;

    return htmlFormat;
}

exports.trending = trending;
exports.search = search;
exports.html = DataFormat;
