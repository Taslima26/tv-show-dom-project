//You can edit ALL of the code here
let titleHeader = document.querySelector("h4")
let imageHolder = document.querySelector(".photo")
let subtitleHolder = document.querySelector('.episode-code');
let descriptionHolder = document.querySelector('.item-text');
let sectionCenter = document.querySelector('.section-center');
let searchBar = document.querySelector("#searchBar");
let selectEpisodes = document.querySelector("#select-episode");
let goBackToAllEpisodes = document.querySelector(".go-back-to-all-episodes");
let selectShows = document.querySelector("#select-shows")

let episodesData = [];
let showsData = [];


//1 populate selectShows input with shows ..
//all episodes must be sorted in alphabetical order






function populateShows() {
  selectShows.options.length = 0;
  

  getAllShows().sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).forEach((item) => {

    let opt = item.name;;
   
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectShows.appendChild(el);

  });
}


//sort the shows



///Now I have all the shows so need to  get access to  one show which user selected in select box.

function selectShowsToGetEpisodes() {
  document.querySelector("#select-shows").addEventListener('change', (e) => {
    const selectString = e.target.value;
    console.log(selectString);
    let selectedShow = getAllShows().filter((item) => {
      
      return (
        item.name === selectString);
    });
    
    let idOfShow = selectedShow.map(data => data.id);
  
    //Now I have an access to a particular shows that user serlect from the select box so I need 
    //to go and fetch episodes of that selected show.

    //fetch an api based on selcted show
    fetch(`https://api.tvmaze.com/shows/${idOfShow}/episodes`)
      .then((response) => response.json())
      .then((episodesOfShow) => {
        displayEpisodes(episodesOfShow);
        searchEpisodes(episodesOfShow);
        populateEpisodes(episodesOfShow);
        selectEpisodesToDisplay(episodesOfShow);
        goBackToAllEpisodesFunction(episodesOfShow);
      });
  });
  


}

//implement the search functionality for the selected shows episodes
function searchEpisodes(episodes) {
  let totalEpisodes = episodes.length;
  let total = document.querySelector(".total-1")
  total.textContent = totalEpisodes;
  searchBar.addEventListener('keyup', (e) => {

    const searchString = e.target.value.toLowerCase();
    const filteredMovies = episodes.filter((item) => {
      return (
        item.name.toLowerCase().includes(searchString) ||
        item.summary.toLowerCase().includes(searchString)
      );
    });
    displayEpisodes(filteredMovies);
  });
}

//populate selectbox with corrosponding epsodes

function populateEpisodes(allEpisodes) {
  selectEpisodes.length = 0;
allEpisodes.forEach((item) => {
    
    let opt = `S${item.season.toString().padStart(2,0)}E${item.number.toString().padStart(2,0)}-${item.name}`;
   
  
  
  let element = document.createElement('option')
    element.textContent = opt;
    element.value = opt;
    selectEpisodes.add(element);

  });
 
 
}

//Now I have all the episodes of corrosponding show ,I need to find a 
//way to display them.
function displayEpisodes(allShows) {
  let EpisodeBeingDisplay = allShows.length;
  let total = document.querySelector(".total-2")
  total.textContent = EpisodeBeingDisplay;
  
  let displayEpisode = allShows.map((item) => {
    return `<article class='movie-item'>
            <img src=${item.image ? item.image.medium : 'empytyImage'} alt=${item.name} class='photo'/>
            <div class='item-info'>
            <header>
            <h4>${item.name}</h4>
            <h4 class ='episode-code'> ${'S0' + item.id} </h4>
            </header>
            <p class='item-text'> ${item.summary}'
            </p>
            <div>
            </article>`;

  });
  displayEpisode = displayEpisode.join('');
  sectionCenter.innerHTML = displayEpisode;
}


///Now implement selectBox funionality episode selection;

function selectEpisodesToDisplay(episodesData) {
  document.querySelector("#select-episode").addEventListener('change', (e) => {
    const selectString = e.target.value;
    console.log(selectString);
    const selectedEpisodes = episodesData.filter((item) => {
      return (
      `S${item.season.toString().padStart(2,0)}E${item.number.toString().padStart(2,0)}-${item.name}` === selectString

      );
    });
    displayEpisodes(selectedEpisodes);



  });
 
}

///Implement go back to all episodes functionality.
function goBackToAllEpisodesFunction(everything){
  goBackToAllEpisodes.addEventListener('click', () => {
    displayEpisodes(everything);
  })
}

//footer functionality to give credit to fetch api
function makePageForEpisodes() {
const rootElem = document.getElementById("root");

  
  var a = document.createElement('a');
  var linkText = document.createTextNode("This data is coming from tvmaze.com,Please click here for more info .Copyrights reserve at @ https://www.tvmaze.com/");
  a.appendChild(linkText);
  a.title = "The data is comin from tvmaze.com/api#licensing";
  a.href = "https://www.tvmaze.com/";
  rootElem.appendChild(a);

}











  



//****   All function calling functionality  *******/

selectShowsToGetEpisodes();
populateShows();
searchEpisodes();
selectEpisodesToDisplay();
goBackToAllEpisodesFunction();
makePageForEpisodes();
populateEpisodes();











