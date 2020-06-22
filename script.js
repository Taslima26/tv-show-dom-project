//You can edit ALL of the code here
let titleHeader = document.querySelector("h4")
let imageHolder = document.querySelector(".photo")
let subtitleHolder = document.querySelector('.episode-code');
let descriptionHolder = document.querySelector('.item-text');
let sectionCenter = document.querySelector('.section-center');
let searchBar = document.querySelector("#searchBar");



function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  displayMovies(allEpisodes);
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


  const allEpisodesDetails = setup();
  searchBar.addEventListener('keyup', (e) => {
    
    const searchString = e.target.value.toLowerCase();
    const filteredMovies = allEpisodesDetails.filter((item) =>{
      return (
        item.name.toLowerCase().includes(searchString) ||
        item.summary.toLowerCase().includes(searchString)
      );
    });
     
    displayMovies(filteredMovies);
  });
  



function displayMovies(Movies) {


   let displayMovie = Movies.map((item)=> {


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

  window.onload = setup;
  window.onload = displayMovies;


displayMovies();
