const params = new URLSearchParams(window.location.search);
const TvId = params.get('id');
var id=TvId;
var data='';
var dataSimilar='';
var currentIndex=0;
var secondbtn=document.getElementById('secondbtn');
var firstbtn=document.getElementById('firstbtn');
var seasoncategory=document.getElementById('seasoncategory')

var container=document.getElementById('container')
firstbtn.addEventListener('click',function(){
    container.classList.remove('hidden');
    container.classList.add('visible');
    seasoncategory.classList.remove('visible');
    seasoncategory.classList.add('hidden');
})

secondbtn.addEventListener('click',function(){
    container.classList.remove('visible');
    container.classList.add('hidden');
    seasoncategory.classList.remove('hidden');
   seasoncategory.classList.add('visible');
    seasons(function(){
        episodes(id,1);
    });
})
function seasons(callback){
    document.querySelector('.seasoncategory h1').innerHTML=data.original_name;
    var season='';
    for(var i=1;i<data.seasons.length;i++){
         season +=`
          <h3 
              data-season="${data.seasons[i].season_number}" 
                class="${i === 1 ? 'selected' : ''}" 
           onclick="episodes(${id},${data.seasons[i].season_number}) ">
           ${data.seasons[i].season_number}
           </h3>
        `;
    }
    document.getElementById('seasonname').innerHTML=season;
    const allSeasons = document.querySelectorAll('#seasonname h3');
    allSeasons.forEach((season) => {
        season.addEventListener('click', function () {
            allSeasons.forEach((s) => s.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
    callback();
}


    function episodes(id,seasonid){
        const posterUrlBath = "https://image.tmdb.org/t/p/original";
        var episodesData=new XMLHttpRequest();
        episodesData.open('Get',`https://api.themoviedb.org/3/tv/${id}/season/${seasonid}?api_key=e7d001ee43b59aa8b31db205ff339b83`)
        episodesData.send();
        episodesData.addEventListener('readystatechange',function(){
            if(episodesData.readyState==4){
                var episodesitem=JSON.parse(episodesData.response);
                console.log(episodesitem);
            var cartona='';
            for(var i=0;i<episodesitem.episodes.length;i++){
                var posterbatth = episodesitem.episodes[i].still_path
                ? `${posterUrlBath}${episodesitem.episodes[i].still_path}`
                :  `${posterUrlBath}${data.poster_path}`;
                cartona+=`
                    <div class="episodeitem">
                <h3>${episodesitem.episodes[i].name}</h3>
                <div class="episdoeimg">
                    <img src=${posterbatth}>
                </div>
                <h4>${episodesitem.episodes[i].episode_number}</h4>
            </div>
                `
            }
            document.getElementById('episodes').innerHTML=cartona;
        }
        })
        
    }


function gettv(id,callback){
var tvseries=new XMLHttpRequest();
tvseries.open('Get',`https://api.themoviedb.org/3/tv/${id}?api_key=e7d001ee43b59aa8b31db205ff339b83`)
    tvseries.send();
    tvseries.addEventListener('readystatechange',function(){
        if(tvseries.readyState==4){
            data=JSON.parse(tvseries.response);
            console.log(data);
          
            callback();
        }
    })
}

function call(id){
    gettv(id,function(){
        similartv(id,function(){
            displaydata();
        })
    })
}

call(id);
function similartv(id,callback){
    var similar=new XMLHttpRequest();
    similar.open('Get',`https://api.themoviedb.org/3/tv/${id}/similar?api_key=e7d001ee43b59aa8b31db205ff339b83`)
    similar.send();
    similar.addEventListener('readystatechange',function(){
        if(similar.readyState==4){
            dataSimilar=JSON.parse(similar.response);
            console.log(dataSimilar);
            callback();
        }
    })
}
    function displaySimilar(){
        var bl7 = '';
        const posterBaseURL = 'https://image.tmdb.org/t/p/original';
    
        for (var i = currentIndex; i <  currentIndex+3; i++) {
            if (i >= dataSimilar?.results?.length) break;
            const tvsimilar = dataSimilar?.results[i];
            const imgt = `${posterBaseURL}${tvsimilar.poster_path}`;
            bl7 += `
                    
                    <div class="item" onclick="call(${tvsimilar.id})">
                 
                        <img src="${imgt}" alt="${tvsimilar.title}" />
                        </div>
                    `
                ;
        }
        return bl7;
    }

function displaydata(){
    var tvdata=displaySimilar();
    const backDrpBath = "https://image.tmdb.org/t/p/original";// Use appropriate size (e.g., w500, original)
    const backDrp = `${backDrpBath}${data.backdrop_path}`;
    container.style.backgroundImage = `
  linear-gradient(to right, black 10%, rgba(0, 0, 0, 0) 60%),
        linear-gradient(to top, black 0%, rgba(0, 0, 0, 0) 60%),
              linear-gradient(to bottom, black 0%, rgba(0, 0, 0, 0) 20%),
       
    url(${backDrp})
`;
   
var cartona = `

<div class="description">
    <h1>${data.original_name}</h1>
    <div id="description-data">
        <p>${data.number_of_seasons} Season , ${data.number_of_episodes} Episodes</p>
        <p class="genres">${data.genres.map(genre => genre.name).join(' , ')}</p>
        <p>${data.production_countries[0].name}</p>
        <p>${data?.seasons[0]?.air_date?.substring(0,4)||""} </p>
    </div>
    <div class="language">
     <span class="material-icons">volume_up</span> 
        <p class="text-lang"> ${data.spoken_languages.map(lang => lang.name).join(' , ')}</p>
    </div>
    <div class="description-text">
        <p>${data.overview}</p>
    </div>

    <button class="btn-watch" >
    <div class="displaybtn">
    <span class="material-icons">play_arrow</span>
        <h3>Watch series </h3>
        </div>
    </button>
    
    <button class="btn-trailer">
    <div class="displaybtn">
    <span class="material-icons">videocam</span> 
       <h3>Trailer </h3>
        </div>
    </button>
   
</div>
<div class="grid">
        <h3>Similar</h3>
        <div class="grids-item">
         <div class="arrow">
                    <button class="show-more" onclick="loadMore()">→</button>
            </div>
            ${tvdata} 
        </div>
       
    </div>
`
container.innerHTML=cartona;
}

function loadMore() {

    if (currentIndex + 3 < dataSimilar.results.length) {
        currentIndex++;
        const gridsItem = document.querySelector('.item img');
        gridsItem.style.transform = 'translateX(-100%)'; 

        setTimeout(() => {
            displaydata();
            gridsItem.style.transition = 'none'; 
            gridsItem.style.transform = 'translateX(0)'; 
            setTimeout(() => {
                gridsItem.style.transition = 'transform 0.5s ease-in-out'; 
            }, 100);
        }, 500);
    }
}