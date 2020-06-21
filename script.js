//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  return allEpisodes;

}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  var a = document.createElement('a');
  var linkText = document.createTextNode("This data is coming from tvmaze.com,Please click here for more info .Copyrights reserve at @ https://www.tvmaze.com/");
  a.appendChild(linkText);
  a.title = "The data is comin from tvmaze.com/api#licensing";
  a.href = "https://www.tvmaze.com/";
  rootElem.appendChild(a);

}


function displayMovies() {
  const allEpisodesDetails = setup();

  let displayMovie = allEpisodesDetails.map(function (item) {


    return `<article class="movie-item">
             <img src=${item.image.medium} alt=${item.name} class="photo" />
           <div class="item-info">
               <header>
                 <h4>${item.name}</h4>

               <h4 class="episode-code">${'S0'+item.season.toString()+'E0'+item.number.toString()}</h4>
               </header>
             <p class="item-text">
                ${item.summary}
             </p>
            </div>
          </article>`;
  });

  displayMenu = displayMovie.join(" ");
  
  sectionCenter.innerHTML = displayMenu;
}

//window.onload = setup;
window.onload = displayMovies;

//select all the elements here
let titleHeader = document.querySelector("h4")
let imageHolder = document.querySelector(".photo")
let subtitleHolder = document.querySelector('.episode-code');
let descriptionHolder = document.querySelector('.item-text');
let sectionCenter = document.querySelector('.section-center');