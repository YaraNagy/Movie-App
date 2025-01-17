const baseImageUrl = "https://image.tmdb.org/t/p/w500/";
const slider = document.getElementById("slider");
const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const scrollAmount = 200;
GetTrendingLists();

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

//   Async Methods
async function GetTrendingLists() {
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
  let data;
  try {
    if (!response.ok) {
      throw new Error(`HTTP error! ${response.status}`);
    }
    data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error", error);
  }
  let result = data.results;
  slider.innerHTML = "";
  let content = "";
  for (let i = 0; i < result.length; i++) {
    content += `<img
      class="w-36 h-52 rounded-lg hover:scale-105 transition-transform "
      src="${baseImageUrl}${result[i].poster_path}"
      alt="Movie 1"
    />`;
  }
  slider.innerHTML = content;
  return data?.results || [];
}
