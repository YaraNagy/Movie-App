var id = 224513;
actor(id, function () {
    displayMovies(id, function () {
        displaytv(id, function () {
            displayactor();
        });
    });
});

var data = '';
var datamovie = '';
var tvmovie = '';

function actor(id, callback) {
    var myactor = new XMLHttpRequest();
    myactor.open('Get', `https://api.themoviedb.org/3/person/${id}?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    myactor.send();
    myactor.addEventListener('readystatechange', function () {
        if (myactor.readyState == 4) {
            data = JSON.parse(myactor.response);
            callback();
        }
    });
}

function displayMovies(id, callback) {
    var mymovies = new XMLHttpRequest();
    mymovies.open('Get', `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    mymovies.send();
    mymovies.addEventListener('readystatechange', function () {
        if (mymovies.readyState == 4) {
            datamovie = JSON.parse(mymovies.response);
            console.log(datamovie);
            callback();
        }
    });
}

function displaytv(id, callback) {
    var mytv = new XMLHttpRequest();
    mytv.open('Get', `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    mytv.send();
    mytv.addEventListener('readystatechange', function () {
        if (mytv.readyState == 4) {
            tvmovie = JSON.parse(mytv.response);
            console.log(tvmovie);
            callback();
        }
    });
}

function displayactor() {
    const profileUrlBath = "https://image.tmdb.org/t/p/original";
    const profileURL = `${profileUrlBath}${data.profile_path}`;
    var cartona = `
        <div class="titledesc flex flex-wrap items-center">
            <div class="imghuman w-1/6">
                <img src="${profileURL}" class="w-full rounded-lg">
            </div>
            <h1 class="text-5xl ml-4 mt-8">${data.name}</h1>
        </div>
        <div class="description mt-4">
            <div class="somedata flex flex-wrap gap-2">
                <p class="dateofbirth">${data.birthday.substring(0, 4)}</p>
                <p>${data.place_of_birth}</p>
            </div>
            <p class="mt-2">Known for "${data.known_for_department}"</p>
            <p class="biography w-1/2 mt-4 text-xl leading-8">${data.biography}</p>
        </div>
    `;
    document.getElementById('container').innerHTML = cartona;

    var bl7 = '';
    for (var i = 0; i < 10; i++) {
        if (datamovie.cast[i].poster_path) {
            const movieurl = `${profileUrlBath}${datamovie.cast[i].poster_path}`;
            var movieId = datamovie.cast[i].id;
            bl7 += `
                <div class="w-1/6 p-2">
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition-transform duration-300 hover:scale-105" onclick="navigateToDetails(${movieId})">
                        <img class="rounded-t-lg w-full h-64 object-cover" src="${movieurl}" alt="${datamovie.cast[i].title}" />
                    </div>
                </div>
            `;
        }
    }
    document.getElementById('movies-container').innerHTML = bl7;

    var cont = '';
    for (var i = 0; i < 10; i++) {
        if (tvmovie.cast[i].poster_path) {
            const tvurl = `${profileUrlBath}${tvmovie.cast[i].poster_path}`;
            var tvid = tvmovie.cast[i].id;
            cont += `
                <div class="w-1/6 p-2">
                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer transition-transform duration-300 hover:scale-105" onclick="navigateToTvDetails(${tvid})">
                        <img class="rounded-t-lg w-full h-64 object-cover" src="${tvurl}" alt="${tvmovie.cast[i].name}" />
                    </div>
                </div>
            `;
        }
    }
    document.getElementById('tv-container').innerHTML = cont;
}

function navigateToDetails(id) {
    window.location.href = `details.html?id=${id}`;
}

function navigateToTvDetails(id) {
    window.location.href = `series.html?id=${id}`;
}