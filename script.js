//You can edit ALL of the code here
let titleHeader = document.querySelector("h4")
let imageHolder = document.querySelector(".photo")
let subtitleHolder = document.querySelector('.episode-code');
let descriptionHolder = document.querySelector('.item-text');
let sectionCenter = document.querySelector('.section-center');
let searchBar = document.querySelector("#searchBar");
let selectEpisodes = document.querySelector("#select-episode");


function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  displayEpisodes(allEpisodes);
  return allEpisodes;

}

//Dropdown 





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
  const filteredMovies = allEpisodesDetails.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchString) ||
      item.summary.toLowerCase().includes(searchString)
    );
  });
  displayEpisodes(filteredMovies);
});



function displayEpisodes(Movies) {
  
 

  let totalMovies = Movies.length;
  let total = document.querySelector(".total")
  total.textContent = totalMovies;
 
   let displayEpisode = Movies.map((item)=> {


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

     displayEpisode = displayEpisode.join(" ");
  
     sectionCenter.innerHTML = displayEpisode;
}
   

  getAllEpisodes().forEach((item) => {
  
    let opt = 'S0' + item.season.toString() + 'E0' + item.number.toString() + '-' + item.name;
    
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectEpisodes.appendChild(el);
    
  });
  document.querySelector("#select-episode").addEventListener('change', (e) => {
    
    let selectMovie = selectEpisodes.selectedIndex;
    const movies = getAllEpisodes();
    const selectDisplay = movies[selectMovie];
    return `<article class="movie-item">
              <img src=${selectDisplay.image.medium} alt=${selectDisplay.name} class="photo" />
            <div class="item-info">
                  <header>
                    <h4>${selectDisplay.name}</h4>

                  <h4 class="episode-code">${'S0' + selectDisplay.season.toString() + 'E0' + selectDisplay.number.toString()}</h4>
                  </header>
                <p class="item-text">
                   ${selectDisplay.summary}
                </p>
               </div>

             </article>`;

  });
  
  

  



 


window.onload = setup;
window.onload = displayEpisodes;
//wdow.onload = selectBoxEpisodes;




