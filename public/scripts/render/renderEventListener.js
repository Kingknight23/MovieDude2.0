// Function to handle the click event for the "Movies" button
function handleMoviesButtonClick() {
    pageNum = 1;
    movieName = '';
    trending('movie');
    nextStyle();
}

// Function to handle the click event for the "TV Shows" button
function handleTvShowsButtonClick() {
    pageNum = 1;
    movieName = '';
    trending('tv');
    nextStyle();
}

// Function to handle the click event for the "Trending" button
function handleTrendingButtonClick() {
    pageNum = 1;
    movieName = '';
    trending('all');
    nextStyle();
}

// Function to handle the click event for the "Login" button
function handleLoginButtonClick() {
    pageNum = 1;
    movieName = '';
    trending('all');
    nextStyle();
}

// Function to handle the keypress event for the search input
function handleSearchInputKeypress(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchByName();
    }
    nextStyle();
}

// Function to handle the click event for the "Next" button
function handleNextButtonClick() {
    try 
    {
        pageNum += 1;
        searchByName(pageNum);
        nextStyle();
    } 
    catch (error) {
        console.error(error);
    }
}

// Function to handle the click event for the "Previous" button
function handlePrevButtonClick() 
{
    pageNum -= 1;
    searchByName(pageNum);
    nextStyle();
}



// Add event listeners to elements
document.getElementById('movies').addEventListener('click', handleMoviesButtonClick);
document.getElementById('Tvshow').addEventListener('click', handleTvShowsButtonClick);
document.getElementById('trendingButton').addEventListener('click', handleTrendingButtonClick);
document.getElementById('loginBtn').addEventListener('click', handleLoginButtonClick);
document.getElementById('search').addEventListener('keypress', handleSearchInputKeypress);
document.getElementById('NextButton').addEventListener('click', handleNextButtonClick);
document.getElementById('PrevButton').addEventListener('click', handlePrevButtonClick);
