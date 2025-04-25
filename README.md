# Movie App (yaranagy-movie-app)

A web application built with HTML, Tailwind CSS, and vanilla JavaScript that allows users to browse movies, TV shows, and people using The Movie Database (TMDB) API. It features trending lists, search functionality, detailed views, and basic user authentication using `json-server` for local user data management.

![GitHub last commit](https://img.shields.io/github/last-commit/YaraNagy/Movie-App)

## ✨ Features

*   **Trending Content:** View currently trending Movies, TV Shows, and People on the Home Page.
*   **Dynamic Hero Section:** The Home Page hero section updates dynamically based on the selected trending item.
*   **Popular Lists:** Browse popular content categorized by All, Movies, TV Shows, or People.
*   **Pagination:** Navigate through pages of popular content lists.
*   **Search:** Search for movies, TV shows, or people within the currently selected category.
*   **Detailed Views:**
    *   **Movie Details:** View movie overview, genres, release year, runtime, spoken languages, similar movies, and access a trailer/watch button.
    *   **TV Series Details:** View series overview, genres, number of seasons/episodes, production info, similar series, and browse seasons/episodes.
    *   **People Details:** View actor biography, birth details, known for department, and lists of their movie and TV credits.
*   **User Authentication:**
    *   Sign up for a new account.
    *   Log in with existing credentials.
    *   User data is stored locally in `db.json` and served using `json-server`.
*   **Contact Page:** A dedicated page with contact information and a contact form (form submission logic might require further implementation).
*   **Styling:** Styled using Tailwind CSS for a modern look and feel, including custom animations.
*   **Loading Indicators:** Spinners indicate when data is being fetched from the API.


## 💻 Tech Stack

*   **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
*   **Styling:** Tailwind CSS v3
*   **API:** The Movie Database (TMDB) API
*   **Local User Data:** `json-server` (serving `db.json`)
*   **Package Manager:** npm (for Tailwind CSS and potentially `json-server`)

## 🚀 Setup and Installation

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/YaraNagy/Movie-App.git
    cd Movie-App
    ```

2.  **Install Dependencies:**
    This project uses npm mainly for Tailwind CSS.
    ```bash
    npm install
    ```

3.  **Compile Tailwind CSS:**
    You need to compile the `input.css` to generate `output.css`. Add a script to your `package.json`:

    ```json
    // package.json
    {
      "scripts": {
        "build:css": "tailwindcss -i ./src/styles/input.css -o ./src/styles/output.css --watch"
      },
      "devDependencies": {
        "tailwindcss": "^3.4.17"
      }
    }
    ```
    Then run the build script (use `--watch` for automatic recompilation during development):
    ```bash
    npm run build:css
    ```
    *Note: Ensure your `tailwind.config.js` `content` paths correctly target your HTML/JS files, e.g., `'./src/Client/**/*.{html,js}'`.*

4.  **Set up `json-server`:**
    This is used to simulate a REST API for user authentication based on the `db.json` file.
    *   Install `json-server` globally (if you haven't already):
        ```bash
        npm install -g json-server
        ```
    *   Run `json-server` in the project's root directory (where `db.json` is located):
        ```bash
        json-server --watch db.json
        ```
    This will typically start a server at `http://localhost:3000`.

5.  **Configure TMDB API Key:**
    *   The project uses the TMDB API to fetch movie, TV, and people data. You need your own **free** API key from [TMDB](https://www.themoviedb.org/documentation/api).
    *   **Important:** The current code has an API key hardcoded directly in the JavaScript files (`src/Client/Home Page/Home.js`, `src/Client/Movie-Details Page/*.js`). **This is not secure and is bad practice for real applications.**
    *   **Replace the hardcoded API keys/Bearer Tokens** in the JavaScript files with your own TMDB API key (v3 auth) or Bearer Token (v4 auth). For a real project, consider using environment variables or a configuration file instead of hardcoding.

6.  **Open the Application:**
    Navigate to the `src/Client/` directory and open one of the HTML files in your browser. Start with the Sign Up or Login page:
    *   `src/Client/Sign up page/signup.html`
    *   `src/Client/Login Page/login.html`

    After logging in, you should be redirected to `src/Client/Home Page/Home.html`.

## ⚙️ Configuration

*   **`db.json`**: Stores user registration data (name, email, password). Served by `json-server`.
*   **`tailwind.config.js`**: Configuration file for Tailwind CSS, including custom colors, background images, and animations.
*   **TMDB API Key**: Needs to be added to the JavaScript files making API calls (see Setup step 5).

## 🛠️ Usage

1.  **Sign Up / Login:** Create an account or log in using the respective pages. Credentials are validated against the `db.json` file served by `json-server`.
2.  **Home Page:** Browse trending content. Click on posters in the slider to update the hero section. Use the dropdown to filter popular lists (Movies, TV Shows, People, All) and use the search bar to find specific items within the selected category. Use pagination buttons to load more content.
3.  **Details Pages:** Click on any movie, TV show, or person card to navigate to its dedicated details page.
4.  **Navigation:** Use the navbar links to go to Home, Lists (scrolls on Home page), or Contact.
5.  **Logout:** Click the Logout link in the navbar to clear local session data and return to the Login page.
