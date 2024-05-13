// Global variables
var pageNum = 1;
const Prevbutton = document.getElementById('PrevButton');

// Hide PrevButton by default
Prevbutton.style.display = "none";

// Function to redirect to info page
async function infoPage() {
    try {
        const id = getItemWithExpiry('id');
        const type = getItemWithExpiry('type');
        window.location.href = `/info?id=${id}&type=${type}`;
    } catch (err) {
        console.log(err);
    }
}

// Function to create rating stars dynamically
function createRatingStars(i, rating, star, ratingContainer) {
    num = rating - i;
    if (num >= 0) {
        star.classList.add('selected');
        star.innerHTML = '&#9733;'; // Filled star symbol
    } else if (num > 0 && num <= 0.4) {
        star.classList.add('selected', 'quarter-star');
        star.innerHTML = ''; // Filled star symbol
    } else if (num > 0.4 && num <= 0.5) {
        star.classList.add('selected', 'half-star');
        star.innerHTML = ''; // Filled star symbol
    } else if (num > 0.5 && num <= 0.9) {
        star.classList.add('selected', 'three-quarter-star');
        star.innerHTML = ''; // Filled star symbol
    } else {
        star.innerHTML = '&#9734;'; // Empty star symbol
    }
    ratingContainer.appendChild(star);
}

// Function to render data fetched from API
function renderData(data) {
    let check = document.querySelector(".movie-grid");
    if (check !== null) {
        if (document.querySelector(".movie-grid").innerHTML === "") {
            data.results.forEach(movie => {
                let newDiv = document.createElement("section");
                newDiv.classList.add("movie-container");
                newDiv.id = movie.id;
                newDiv.addEventListener("mousemove", function () {
                    newDiv.style.cursor = "pointer";
                });
                newDiv.addEventListener('click', function () {
                    movieContainerId = this.id;
                    setItemWithExpiry('id', movieContainerId, 3600000);
                    setItemWithExpiry('type', movie.media_type, 3600000);
                    infoPage();
                });

                // Create the <a> element
                const anchor = document.createElement("a");
                anchor.href = "movieinfo.html";
                anchor.classList.add("title");
                anchor.id = movie.id;

                // Create the <img> element
                const image = document.createElement("img");
                if (movie.poster_path === null || typeof movie.poster_path === "undefined") {
                    image.src = "../images/no-poster-available.jpg";
                } else {
                    image.src = `https://image.tmdb.org/t/p/w${500}${movie.poster_path}`;
                }
                image.alt = `movie poster`;
                image.classList.add("posters");
                image.loading = 'lazy';

                // Append the <img> element as a child of the <a> element
                anchor.appendChild(image);

                // Create the first <p> element with class "title"
                const titleParagraph = document.createElement("p");
                titleParagraph.classList.add("title");

                // Create the <span> element inside the first <p> element
                const titleSpan = document.createElement("span");
                if (typeof movie.name === "undefined") {
                    titleSpan.textContent = movie.title;
                } else {
                    titleSpan.textContent = movie.name;
                }
                titleSpan.onclick = function () {
                    handleClick(this.id);
                };
                titleSpan.href = "movieinfo.html";

                // Append the <span> element as a child of the first <p> element
                titleParagraph.appendChild(titleSpan);

                // Create the second <p> element with movie running time
                const runningTimeParagraph = document.createElement("p");
                if (typeof movie.release_date === "undefined") {
                    runningTimeParagraph.textContent = `${movie.media_type} ( ${movie.first_air_date} ) `;
                } else {
                    runningTimeParagraph.textContent = `${movie.media_type} ( ${movie.release_date} ) `;
                }
                if (movie.media_type === "tv") {
                    runningTimeParagraph.textContent = `${movie.media_type}-show ( ${movie.first_air_date} ) `;
                }

                // Create the rating container
                const ratingContainer = document.createElement('div');
                ratingContainer.classList.add('rating');
                const num = movie.vote_average / 2;
                const rating = num.toFixed(1);

                if (rating > 0) {
                    for (let i = 1; i <= 5; i++) {
                        const star = document.createElement('span');
                        star.classList.add('star');
                        createRatingStars(i, rating, star, ratingContainer);
                    }
                }

                // Append elements to newDiv
                const movieGrid = document.querySelector(".movie-grid");
                newDiv.appendChild(anchor);
                newDiv.appendChild(image);
                newDiv.appendChild(titleParagraph);
                newDiv.appendChild(runningTimeParagraph);
                newDiv.appendChild(ratingContainer);
                movieGrid.appendChild(newDiv);
            });

        } else {
            document.querySelector(".movie-grid").innerHTML = "";
            renderData(data);
        }
    }
}

// Function to handle styling for Next and Prev buttons
function nextStyle() {
    if (!(pageNum === 1)) {
        Prevbutton.style.display = 'block';
    } else {
        Prevbutton.style.display = "none";
    }
}
