const params = new URLSearchParams(window.location.search);
const TvId = params.get('id');
var id = TvId;
var data = '';
var dataSimilar = '';
var currentIndex = 0;
var secondbtn = document.getElementById('secondbtn');
var firstbtn = document.getElementById('firstbtn');
var seasoncategory = document.getElementById('seasoncategory');
var container = document.getElementById('container');

firstbtn.addEventListener('click', function () {
    container.classList.remove('hidden');
    container.classList.add('visible');
    seasoncategory.classList.remove('visible');
    seasoncategory.classList.add('hidden');
});

secondbtn.addEventListener('click', function () {
    container.classList.remove('visible');
    container.classList.add('hidden');
    seasoncategory.classList.remove('hidden');
    seasoncategory.classList.add('visible');
    seasons(function () {
        episodes(id, 1);
    });
});

function seasons(callback) {
    document.querySelector('.seasoncategory h1').innerHTML = data.original_name;
    var season = '';
    for (var i = 1; i < data.seasons.length; i++) {
        season += `
          <h3 
              data-season="${data.seasons[i].season_number}" 
              class="season-btn px-4 py-2 bg-gray-800 text-white rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 ${i === 1 ? 'selected' : ''}" 
              onclick="episodes(${id},${data.seasons[i].season_number})">
              Season ${data.seasons[i].season_number}
          </h3>
        `;
    }
    document.getElementById('seasonname').innerHTML = season;
    const allSeasons = document.querySelectorAll('#seasonname h3');
    allSeasons.forEach((season) => {
        season.addEventListener('click', function () {
            allSeasons.forEach((s) => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    callback();
}

function episodes(id, seasonid) {
    showLoading();
    const posterUrlBath = "https://image.tmdb.org/t/p/original";
    var episodesData = new XMLHttpRequest();
    episodesData.open('Get', `https://api.themoviedb.org/3/tv/${id}/season/${seasonid}?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    episodesData.send();
    episodesData.addEventListener('readystatechange', function () {
        if (episodesData.readyState == 4) {
            var episodesitem = JSON.parse(episodesData.response);
            console.log(episodesitem);
            var cartona = '';
            for (var i = 0; i < episodesitem.episodes.length; i++) {
                var posterbatth = episodesitem.episodes[i].still_path
                    ? `${posterUrlBath}${episodesitem.episodes[i].still_path}`
                    : `${posterUrlBath}${data.poster_path}`;
                cartona += `
                    <div class="episodeitem w-1/4 bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
                        <div class="episdoeimg">
                            <img src="${posterbatth}" class="w-full h-48 object-cover" alt="${episodesitem.episodes[i].name}">
                        </div>
                        <div class="p-4">
                            <h3 class="text-xl font-bold">${episodesitem.episodes[i].name}</h3>
                            <h4 class="text-gray-400">Episode ${episodesitem.episodes[i].episode_number}</h4>
                        </div>
                    </div>
                `;
            }
            document.getElementById('episodes').innerHTML = cartona;
            hideLoading();
        }
    });
}

function gettv(id, callback) {
    showLoading();
    var tvseries = new XMLHttpRequest();
    tvseries.open('Get', `https://api.themoviedb.org/3/tv/${id}?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    tvseries.send();
    tvseries.addEventListener('readystatechange', function () {
        if (tvseries.readyState == 4) {
            data = JSON.parse(tvseries.response);
            console.log(data);
            callback();
            hideLoading();
        }
    });
}

function call(id) {
    gettv(id, function () {
        similartv(id, function () {
            displaydata();
        });
    });
}

call(id);

function similartv(id, callback) {
    var similar = new XMLHttpRequest();
    similar.open('Get', `https://api.themoviedb.org/3/tv/${id}/similar?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    similar.send();
    similar.addEventListener('readystatechange', function () {
        if (similar.readyState == 4) {
            dataSimilar = JSON.parse(similar.response);
            console.log(dataSimilar);
            callback();
        }
    });
}

function displaySimilar() {
    var bl7 = '';
    const posterBaseURL = 'https://image.tmdb.org/t/p/original';

    for (var i = currentIndex; i < currentIndex + 3; i++) {
        if (i >= dataSimilar?.results?.length) break;
        const tvsimilar = dataSimilar?.results[i];
        const imgt = `${posterBaseURL}${tvsimilar.poster_path}`;
        bl7 += `
            <div class="item w-1/4 cursor-pointer transition-transform duration-300 hover:scale-110" onclick="call(${tvsimilar.id})">
                <img src="${imgt}" alt="${tvsimilar.title}" class="w-full h-64 object-cover rounded-lg" />
            </div>
        `;
    }
    return bl7;
}

function displaydata() {
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
            <h1 class="text-5xl">${data.original_name}</h1>
            <div id="description-data" class="flex flex-wrap gap-2 mt-4">
                <p>${data.number_of_seasons} Season, ${data.number_of_episodes} Episodes</p>
                <p class="text-gray-500">${data.genres.map(genre => genre.name).join(' , ')}</p>
                <p>${data.production_countries[0].name}</p>
                <p>${data?.seasons[0]?.air_date?.substring(0, 4) || ""}</p>
            </div>
            <div class="language flex items-center gap-2 mt-4">
                <span class="material-icons">volume_up</span>
                <p class="text-lang">${data.spoken_languages.map(lang => lang.name).join(' , ')}</p>
            </div>
            <div class="description-text mt-4 text-xl leading-8">
                <p>${data.overview}</p>
            </div>

            <button class="btn-watch mt-8 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-xl cursor-pointer transition-transform duration-300 hover:scale-105">
                <div class="displaybtn flex items-center">
                    <span class="material-icons">play_arrow</span>
                    <h3 class="ml-2">Watch series</h3>
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
                    <button class="show-prev bg-gray-700 rounded-full p-2 cursor-pointer hover:bg-gray-600" onclick="loadPrev()">←</button>
                    <button class="show-more bg-gray-700 rounded-full p-2 cursor-pointer hover:bg-gray-600 ml-2" onclick="loadMore()">→</button>
                </div>
                ${similarHtml}
            </div>
        </div>
    `;

    container.innerHTML = cartona;
}

function loadMore() {
    if (currentIndex + 3 < dataSimilar.results.length) {
        currentIndex += 3; 
        displaydata(); 
    }
}

function loadPrev() {
    if (currentIndex - 3 >= 0) {
        currentIndex -= 3;
        displaydata();
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