const baseImageUrl = "https://image.tmdb.org/t/p/original/";
const slider = document.getElementById("slider");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const scrollAmount = 200;
const trendingSection = document.getElementById("trending-section");
const posterTitle = document.getElementById("poster-title");
const posterDetails = document.getElementById("poster-details");
const dropDown = document.getElementById("darkModeSelect");
const inputSearch = document.getElementById("searchBar");
var currentPage = 1;
var list = [];
let data;

UpdatingTrendingUi();
getContent();

// Event Listerners
prevButton.addEventListener("click", () => {
  slider.scrollBy({
    left: -scrollAmount,
    behavior: "smooth",
  });
});

nextButton.addEventListener("click", () => {
  slider.scrollBy({
    left: scrollAmount,
    behavior: "smooth",
  });
});
// Add event listener to the slider container
slider.addEventListener("click", function (event) {
  if (event.target.tagName === "IMG") {
    const id = event.target.id;
    ChangingBackGroundIMG(Number(id));
  }
});

//   Async Methods
async function GetTrendingData() {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNWQwZWQ4YTRiZDkyYjgyYWQ0YWIyNzNiN2RkYTFlZSIsIm5iZiI6MTczNjc5MDQ4Ny41NjQ5OTk4LCJzdWIiOiI2Nzg1NTFkNzc4Y2ZjZDc3ZWQ0ZWU4NGYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZOr8XZdB8xY3cm6gtMjtEeoigYA_idj4n8PbSGpUpxk",
    },
  };

  const response = await fetch(
    "https://api.themoviedb.org/3/trending/all/day?language=en-US",
    options
  );

  try {
    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status}`);
    }
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error", error);
  }

  return data?.results || [];
}
async function UpdatingTrendingUi() {
  let result = await GetTrendingData();
  slider.innerHTML = "";
  let content = "";
  for (let i = 0; i < result.length; i++) {
    content += `<img
      class="w-36 h-52 rounded-lg hover:scale-105 transition-transform cursor-pointer "
      src="${baseImageUrl}${result[i].poster_path}"
      alt="Movie ${result[i]}"
      id ="${result[i].id}"
      
    />`;
  }
  slider.innerHTML = content;
  let selectedItem = result[2];
  let name = selectedItem.title ? selectedItem.title : selectedItem.name;
  trendingSection.style.backgroundImage = `url('${baseImageUrl}${selectedItem.backdrop_path}')`;
  posterTitle.innerHTML = name;
  posterDetails.innerHTML = selectedItem.overview;
}

async function ChangingBackGroundIMG(id) {
  const result = await GetTrendingData();

  const selectedItem = result.find((item) => item.id === id);
  if (selectedItem) {
    let name = selectedItem.title ? selectedItem.title : selectedItem.name;
    trendingSection.style.backgroundImage = `url('${baseImageUrl}${selectedItem.backdrop_path}')`;
    posterTitle.innerHTML = name;
    posterDetails.innerHTML = selectedItem.overview;
  }
}

// Dropdown Lists with Pagination

function getContent() {
  showLoading(); 
  const selected = dropDown.value;
  const url = `https://api.themoviedb.org/3/trending/${selected}/day?language=en-US&page=${currentPage}&api_key=7a6dc1643bb88d4d0f2a43362f7cd9fc`;

  const myHttp = new XMLHttpRequest();
  myHttp.open("GET", url, true);
  myHttp.send();

  myHttp.addEventListener("readystatechange", function () {
    if (myHttp.readyState === 4) {
      if (myHttp.status === 200) {
        list = JSON.parse(myHttp.responseText).results;
        console.log("Fetched List:", list);
        display();
      } else {
        console.error(
          "Failed to fetch data:",
          myHttp.status,
          myHttp.statusText
        );
      }
      hideLoading();
    }
  });
}

function display() {
  const main = document.getElementById("movie-grid");
  main.innerHTML = "";
  let cartona = "";
  for (var i = 0; i < list.length; i++) {
    cartona += `<div class="movie-card ">
     <img
       src="${baseImageUrl}${
      list[i].poster_path ? list[i].poster_path : list[i].profile_path
    }"
       alt="Movie 1"
     />
     <h3>${
       list[i].original_title ? list[i].original_title : list[i].original_name
     }</h3>
   </div>   `;
  }
  main.innerHTML = cartona;
}

dropDown.addEventListener("change", function (e) {
  currentPage = 1;
  let name;

  switch (dropDown.value) {
    case "all":
      name = "All";
      break;
    case "movie":
      name = "Movies";
      break;
    case "tv":
      name = "Tv Shows";
      break;
    case "person":
      name = "Persons";
      break;
    default:
      name = "All";
  }

  document.getElementById("Popular-Lists").innerHTML = name;
  getContent();
});

document.getElementById("next").addEventListener("click", function () {
  showLoading(); 
  currentPage++;
  getContent();
});

document.getElementById("prev").addEventListener("click", function () {
  if (currentPage > 1) {
    showLoading(); 
    currentPage--;
    getContent();
  }
});

inputSearch.addEventListener("input", function () {
  showLoading();
  const query = inputSearch.value.toLowerCase();
  const main = document.getElementById("movie-grid");
  main.innerHTML = "";
  let cartona = ``;

  const filteredData = list.filter((item) => {
    const name = item.original_title ? item.original_title : item.original_name;
    return name.toLowerCase().startsWith(query);
  });

  for (let i = 0; i < filteredData.length; i++) {
    cartona += `<div class="movie-card" id = "${filteredData[i].id}">
     <img
       src="${baseImageUrl}${
      filteredData[i].poster_path
        ? filteredData[i].poster_path
        : filteredData[i].profile_path
    }"
       alt="Movie 1"
     />
     <h3>${
       filteredData[i].original_title
         ? filteredData[i].original_title
         : filteredData[i].original_name
     }</h3>
   </div>   `;

    main.innerHTML = cartona;
    hideLoading();
  }
});
// loading

function showLoading() {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.remove("hidden");
}

function hideLoading() {
  const spinner = document.getElementById("loading-spinner");
  spinner.classList.add("hidden");
}



