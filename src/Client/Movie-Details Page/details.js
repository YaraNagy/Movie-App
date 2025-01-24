const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

var data;
var similarMovies;
var container = document.getElementById('container');
var currentIndex = 0;
var videoKey = '';

appearData(movieId);

function appearData(id) {
    showLoading(); 
    var myhhtp = new XMLHttpRequest();
    myhhtp.open('Get', `https://api.themoviedb.org/3/movie/${id}?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    myhhtp.send();

    myhhtp.addEventListener('readystatechange', function () {
        if (myhhtp.readyState == 4) {
            data = JSON.parse(myhhtp.response);
            console.log(data);

            similar(id, display);
            appearVideo(id);
            hideLoading();
        }
    });
}

function appearVideo(id) {
    showLoading();
    var videoReuest = new XMLHttpRequest();
    videoReuest.open('Get', `https://api.themoviedb.org/3/movie/${id}/videos?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    videoReuest.send();
    videoReuest.addEventListener('readystatechange', function () {
        if (videoReuest.readyState == 4) {
            var videoo = JSON.parse(videoReuest.response);
            videoKey = videoo.results[0].key;
            console.log("Video Key:", videoKey);
            hideLoading();
        }
    });
}

function playVideo() {
    if (videoKey) {
        container.innerHTML = `
            <div class="video-overlay fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${videoKey}?autoplay=1" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
                <button class="close-video absolute top-5 right-5 bg-red-600 text-white border-none p-2 cursor-pointer z-50" onclick="closeVideo()">X</button>
            </div>
        `;
    } else {
        alert("No video available to play.");
    }
}

function closeVideo() {
    display();
}

function similar(id, callback) {
    var mysimilar = new XMLHttpRequest();
    mysimilar.open('Get', `https://api.themoviedb.org/3/movie/${id}/similar?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    mysimilar.send();
    mysimilar.addEventListener('readystatechange', function () {
        if (mysimilar.readyState == 4) {
            similarMovies = JSON.parse(mysimilar.response);
            console.log(similarMovies);
            callback();
        }
    });
}

function displaySimilar() {
    var bl7 = '';
    const posterBaseURL = 'https://image.tmdb.org/t/p/original';

    for (var i = currentIndex; i < currentIndex + 3; i++) {
        if (i >= similarMovies.results.length) break;
        const movie = similarMovies.results[i];
        const imgt = `${posterBaseURL}${movie.poster_path}`;
        bl7 += `
            <div class="item w-1/4 cursor-pointer transition-transform duration-300 hover:scale-110" onclick="appearData(${movie.id})">
                <img src="${imgt}" alt="${movie.title}" class="w-full h-64 object-cover rounded-lg" />
            </div>
        `;
    }
    return bl7;
}

function display() {
    const posterBaseURL = "https://image.tmdb.org/t/p/original";
    const posterURL = `${posterBaseURL}${data.backdrop_path}`;
    container.style.backgroundImage = `
        linear-gradient(to right, black 10%, rgba(0, 0, 0, 0) 60%),
        linear-gradient(to top, black 0%, rgba(0, 0, 0, 0) 60%),
        linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0) 20%),
        url(${posterURL})
    `;
    const similarHtml = displaySimilar();
    var cartona = `
        <div class="description p-5 w-2/5 ml-8">
            <h1 class="text-5xl">${data.title}</h1>
            <div id="description-data" class="flex flex-wrap gap-2 mt-4">
                <p>${data.release_date.substring(0, 4)}</p>
                <p class="text-gray-500">${data.genres.map(genre => genre.name).join(' , ')}</p>
                <p>${data.origin_country}</p>
                <p>${data.runtime} min</p>
            </div>
            <div class="language flex items-center gap-2 mt-4">
                <span class="material-icons">volume_up</span>
                <p class="text-lang">${data.spoken_languages.map(lang => lang.name).join(' , ')}</p>
            </div>
            <div class="description-text mt-4 text-xl leading-8">
                <p>${data.overview}</p>
            </div>

            <button class="btn-watch mt-8 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xl cursor-pointer transition-transform duration-300 hover:scale-105" onclick="playVideo()">
                <div class="displaybtn flex items-center">
                     <span class="material-icons">play_arrow</span>
                    <h3 class="ml-2">Watch Movie</h3>
                </div>
            </button>

            <button class="btn-trailer mt-8 px-4 py-2 bg-gray-800 rounded-full text-base cursor-pointer transition-transform duration-300 hover:scale-105 ml-2">
                <div class="displaybtn flex items-center">
                    <span class="material-icons">videocam</span>
                    <h3 class="ml-2">Trailer</h3>
                </div>
            </button>
        </div>

        <div class="grid mt-10">
            <h3 class="text-4xl ml-8">Similar</h3>
            <div class="grids-item flex flex-wrap gap-5 p-8 relative">
                <div class="arrow absolute top-1/2 right-16 z-50">
                    <button class="show-more bg-gray-700 rounded-full p-2 cursor-pointer hover:bg-gray-600" onclick="loadPrev() ">←</button>
                    <button class="show-prev bg-gray-700 rounded-full p-2 cursor-pointer hover:bg-gray-600 ml-2" onclick="loadMore() ">→ </button>
                </div>
                ${similarHtml}
            </div>
        </div>
    `;

    container.innerHTML = cartona;
}

function loadMore() {
    if (currentIndex + 3 < similarMovies.results.length) {
        currentIndex += 3; 
        display(); 
    }
}

function loadPrev() {
    if (currentIndex - 3 >= 0) {
        currentIndex -= 3; 
        display(); 
    }
}

function showLoading() {
    const spinner = document.getElementById("loading-spinner");
    spinner.classList.remove("hidden");
  }
  
  function hideLoading() {
    const spinner = document.getElementById("loading-spinner");
    spinner.classList.add("hidden");
  }