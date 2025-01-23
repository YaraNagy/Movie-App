var id=224513
actor(id, function () {
    displayMovies(id, function () {
        displaytv(id, function () {
            displayactor();
        });
    });
});
var data='';
var datamovie='';
var tvmovie='';
function actor(id,callback){
    var myactor=new XMLHttpRequest();
    myactor.open('Get',`https://api.themoviedb.org/3/person/${id}?api_key=e7d001ee43b59aa8b31db205ff339b83`)
    myactor.send();
    myactor.addEventListener('readystatechange',function(){
        if(myactor.readyState==4){
             data=JSON.parse(myactor.response);
            
            callback();
        }
    })
}
function displayMovies(id,callback){
    var mymovies=new XMLHttpRequest();
    mymovies.open('Get',`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=e7d001ee43b59aa8b31db205ff339b83`)
    mymovies.send();
    mymovies.addEventListener('readystatechange',function(){
        if(mymovies.readyState==4){
             datamovie=JSON.parse(mymovies.response);
            console.log(datamovie);
            callback();
        }
    })
 
}

function displaytv(id,callback){
    var mytv=new XMLHttpRequest();
    mytv.open('Get',`https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=e7d001ee43b59aa8b31db205ff339b83`)
    mytv.send();
    mytv.addEventListener('readystatechange',function(){
        if(mytv.readyState==4){
             tvmovie=JSON.parse(mytv.response);
            console.log(tvmovie);
            callback();
        }
    })
 
}

function displayactor(){
    const profileUrlBath = "https://image.tmdb.org/t/p/original";// Use appropriate size (e.g., w500, original)
    const profileURL = `${profileUrlBath}${data.profile_path}`;
    var cartona=`
         <div class="titledesc">
            <div class="imghuman">
                <img src="${profileURL}">
            </div>
            <h1>${data.name}</h1>
        </div>
        <div class="description">
            <div class="somedata">
                <p class="dateofbirth">${data.birthday.substring(0,4)} </p>
                <p>${data.place_of_birth}</p>
            </div>
            <p>known for "${data.known_for_department}"</p>
            <p class="biography">${data.biography}</p>

        </div>
    `
    document.getElementById('container').innerHTML=cartona;
    var bl7='';
   
    for(var i=0;i<10;i++){
        if(datamovie.cast[i].poster_path){
        const movieurl = `${profileUrlBath}${datamovie.cast[i].poster_path}`;
        var movieId = datamovie.cast[i].id;
        bl7+=`
            
            <div class="movieitem" onclick="navigateToDetails(${movieId})">
                <img src="${movieurl}">
            </div>
        `}
    }
    document.getElementById('movies-container').innerHTML=bl7;

    var cont='';
   
    for(var i=0;i<10;i++){
        if(tvmovie.cast[i].poster_path){
        const tvurl = `${profileUrlBath}${tvmovie.cast[i].poster_path}`;
        var tvid=tvmovie.cast[i].id;
        cont+=`
            
            <div class="movieitem" onclick="navigateToTvDetails(${tvid})">
                <img src="${tvurl}">
            </div>
        `
    }
}
    document.getElementById('tv-container').innerHTML=cont;
}

function navigateToDetails(id) {
    window.location.href = `details.html?id=${id}`; 
}
function navigateToTvDetails(id){
    window.location.href=`series.html?id=${id}`;
}