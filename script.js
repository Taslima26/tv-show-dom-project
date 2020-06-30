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


//1 select input for selection of shows.


function populateShows() {
  getAllShows().forEach((item) => {

    let opt = item.name;
    let el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    selectShows.appendChild(el);

  });
}

///Now I have all the shows so get one show which user selected in select box.

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
        displayShows(episodesOfShow);
      });
  });
}



//Now I have all the episodes of corrosponding show ,I need to find a 
//way to display them.

function displayShows(Shows) {
  let displayShow = Shows.map((item) => {
    return `<article class='movie-item'>
            <img src=${item.image.medium} alt=${item.name} class='photo'/>
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
  displayShow = displayShow.join('');
  sectionCenter.innerHTML = displayShow;
}


selectShowsToGetEpisodes();
populateShows();
displayShows();

































