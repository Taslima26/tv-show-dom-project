//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  return allEpisodes;
  
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;

}

function displayMovies(movies) {
  const allMoviesDetails = setup();
  
  let displayMovie = allMoviesDetails.map(function (item) {
   

       return `<article class="movie-item">
             <img src=${item.image.medium} alt=${item.title} class="photo" />
           <div class="item-info">
               <header>
                 <h4>${item.name}</h4>
               <h4 class="episode-code">$${item.id}</h4>
               </header>
             <p class="item-text">
                ${item.summary}
             </p>
            </div>
          </article>`;
  });

  displayMenu = displayMovie.join("");
   console.log(displayMovie);

   sectionCenter.innerHTML = displayMovie;
}

//window.onload = setup;
window.onload = displayMovies;

//select all the elements here
let titleHeader = document.querySelector("h4")
let imageHolder = document.querySelector(".photo")
let subtitleHolder = document.querySelector('.episode-code');
let descriptionHolder = document.querySelector('.item-text');
let sectionCenter = document.querySelector('.section-center');
