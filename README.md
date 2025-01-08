# MovieDude Website

## Overview
MovieDude is a web application designed to provide users with a seamless experience for exploring movies, discovering trending films, and accessing detailed information about their favorite titles. The website offers features such as search functionality, movie recommendations, and user reviews.

## Features
- **Search Movies**: Users can search for movies by title, genre, or year.
- **Trending Section**: Displays the latest trending movies.
- **Movie Details**: Includes cast, synopsis, release date, and reviews.
- **User Reviews**: Allows users to post and view reviews.
- **Responsive Design**: Optimized for both desktop and mobile users.

## Tech Stack
- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
- **Backend**:
  - Node.js
  - Express.js
- **Database**:
  - MongoDB
- **APIs**:
  - The Movie Database (TMDb) API

## Installation
Follow these steps to set up MovieDude locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/moviedude.git
   cd moviedude
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add the following variables:
     ```env
     TMDB_API_KEY=your_tmdb_api_key
     MONGO_URI=your_mongodb_connection_string
     PORT=5000
     ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`.

## Usage
- Use the search bar to find movies by title.
- Browse the trending section for popular movies.
- Click on a movie to view detailed information.
- Sign in to post reviews and rate movies.

## Contribution Guidelines
Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For any inquiries, please contact:
- **Email**: support@moviedude.com
- **GitHub**: [https://github.com/yourusername/moviedude](https://github.com/yourusername/moviedude)

---

Thank you for using MovieDude! Enjoy exploring the world of cinema!

