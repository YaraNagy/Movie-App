const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');
var data;
var similarMovies;
var container = document.getElementById('container')
var currentIndex = 0;
var videoKey='';



appearData(movieId)

function appearData(id) {
    var myhhtp = new XMLHttpRequest();
    myhhtp.open('Get', `https://api.themoviedb.org/3/movie/${id}?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    myhhtp.send();

    myhhtp.addEventListener('readystatechange', function () {
        if (myhhtp.readyState == 4) {
            data = JSON.parse(myhhtp.response);
           
            console.log(data);

            similar(id, display);
            appearVideo(id)
        }
    })
}

function appearVideo(id){
    var videoReuest=new XMLHttpRequest();
    videoReuest.open('Get', `https://api.themoviedb.org/3/movie/${id}/videos?api_key=e7d001ee43b59aa8b31db205ff339b83`);
    videoReuest.send();
    videoReuest.addEventListener('readystatechange',function(){
        if(videoReuest.readyState==4){
            var videoo=JSON.parse(videoReuest.response)
            videoKey = videoo.results[0].key; 
            console.log("Video Key:", videoKey);
        }
    })
   
}

function playVideo() {
    if (videoKey) {
        container.innerHTML = `
            <div class="video-overlay">
                <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/${videoKey}?autoplay=1" 
                    frameborder="0" 
                    allow="autoplay; encrypted-media" 
                    allowfullscreen>
                </iframe>
                <button class="close-video" onclick="closeVideo()">X</button>
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
    })
}



function displaySimilar() {
    var bl7 = '';
    const posterBaseURL = 'https://image.tmdb.org/t/p/original';

    for (var i = currentIndex; i < currentIndex + 3; i++) {
        if (i >= similarMovies.results.length) break;
        const movie = similarMovies.results[i];
        const imgt = `${posterBaseURL}${movie.poster_path}`;
        bl7 += `
            
                <div class="item" onclick="appearData(${movie.id})">
             
                    <img src="${imgt}" alt="${movie.title}" />
                    </div>
                `
            ;
    }
    return bl7;
}
function display() {
    const posterBaseURL = "https://image.tmdb.org/t/p/original";// Use appropriate size (e.g., w500, original)
    const posterURL = `${posterBaseURL}${data.backdrop_path}`;
    container.style.backgroundImage = `
        linear-gradient(to right, black 10%, rgba(0, 0, 0, 0) 60%),
        linear-gradient(to top, black 0%, rgba(0, 0, 0, 0) 60%),
              linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0) 20%),
        url(${posterURL})
    `;
    const similarHtml = displaySimilar();
    var cartona = `
           
        <div class="description">
            <h1>${data.title}</h1>
            <div id="description-data">
                <p>${data.release_date.substring(0, 4)}</p>
                <p class="genres">${data.genres.map(genre => genre.name).join(' , ')}</p>
                <p>${data.origin_country}</p>
                <p>${data.runtime} min</p>
            </div>
            <div class="language">
             <span class="material-icons">volume_up</span> 
                <p class="text-lang"> ${data.spoken_languages.map(lang => lang.name).join(' , ')}</p>
            </div>
            <div class="description-text">
                <p>${data.overview}</p>
            </div>

            <button class="btn-watch" onclick="playVideo()">
            <span class="material-icons">play_arrow</span>
                Watch movie
            </button>
            
            <button class="btn-trailer">
            <span class="material-icons">videocam</span> Video
               Tailer
            </button>
            
        </div>
        
    <div class="grid">
        <h3>Similar</h3>
        <div class="grids-item">
         <div class="arrow">
                    <button class="show-more" onclick="loadMore()">→</button>
            </div>
            ${similarHtml} 
        </div>
       
    </div>
     
    
    `

    container.innerHTML = cartona;

}

function loadMore() {
    if (currentIndex + 3 < similarMovies.results.length) {
        currentIndex++;
        const gridsItem = document.querySelector('.item img');
        gridsItem.style.transform = 'translateX(-100%)'; 

        setTimeout(() => {
            display(); 
            gridsItem.style.transition = 'none'; 
            gridsItem.style.transform = 'translateX(0)'; 
            setTimeout(() => {
                gridsItem.style.transition = 'transform 0.5s ease-in-out'; 
            }, 100);
        }, 500);
    }
}


