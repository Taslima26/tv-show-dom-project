let titleHeader = document.querySelector("h4")
let imageHolder = document.querySelector(".photo")
let subtitleHolder = document.querySelector('.episode-code');
let descriptionHolder = document.querySelector('.item-text');
let sectionCenter = document.querySelector('.section-center');
let searchBar = document.querySelector("#searchBar");
let selectEpisodes = document.querySelector("#select-episode");
let goBackToAllEpisodes = document.querySelector(".go-back-to-all-episodes");
let getBackToAllShows=document.querySelector('.go-back-to-all-shows');
let selectShows = document.querySelector("#select-shows")
searchBar1 = document.querySelector('#searchBar-1')


let allShows = [];
let allEpisodes=[]

//fetch all the shows from the api and pass it to display show 
//function which will dispaly it on the screen/
const loadShows =  async () => {
  try {
    const res=await fetch(`https://api.tvmaze.com/shows`)
    allShows = await res.json();
    displayShows(allShows);
    
  }
  catch (err) {
    console.error(err)
  }
};

///Now display all the shows when browser load on the dom..

window.onload = loadShows;

function displayShows(Shows) {
  
  let displayShow = Shows.map((item) => {
    let showsBeingDisplay = Shows.length;
    let total = document.querySelector(".total-2")
    total.textContent = showsBeingDisplay;

    return `<article class='show-item'>
           <header>
           <h4> <button class='show-button' id='${item.id}'>${item.name}</button></h4>
            </header>
            <div>
            <img src=${item.image ? item.image.medium : 'empytyImage'} alt=${item.name} class='show-image flex-box'/>
            <p class='item-text'> ${item.summary}
            </p>
            <div class='flex-tag'>
             <p class='show-rating'> Rated:${item.rating.average}
            </p>
            <p class='show-genre'> Genre:${item.genres}
            </p>
            <p class='show-status'>Status:${item.status}
            </p>
            <p class='show-runtime'>Runtime:${item.runtime}
            </p>
           </div>
            </div>
            


            </article>`;

  });
  displayShow = displayShow.join('');
  sectionCenter.innerHTML = displayShow;
  getEpisodesForClickedShow();


};


//search shows functionality 

searchBar1.addEventListener('keyup', (e) => {

  const searchString = e.target.value.toLowerCase();
 
  let totalShows = allShows.length;
  let total = document.querySelector(".total-1");
  total.textContent = totalShows;
  const filteredShows = allShows.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchString) ||
      item.summary.toLowerCase().includes(searchString)
    );
  });
  displayShows(filteredShows);
});
 

//get back to allShows

getBackToAllShows.addEventListener('click', () => {
  displayShows(allShows);
})

goBackToAllEpisodes.addEventListener('click', () => {
  displayEpisodes(allEpisodes);
})


//when user click on a show name it should get all the episodes for that particular shows.

function getEpisodesForClickedShow() {
  let allShowsButton = document.querySelectorAll('.show-button');
 
 
  allShowsButton.forEach((button) => {
    button.addEventListener("click", (e) => {
      
      getEpisodesAcordingToShow(e.target.id);
      

    });
   

  });

}
//Now I have access to particular show id I am going to go 
//and fetch api of episodes of that show.
//const loadShows =  async () =>
//async function getEpisodesAcordingToShow(id){
const getEpisodesAcordingToShow= async (id)=>{

  //Now I have an access to a particular shows that user serlect from the select box so I need
  //to go and fetch episodes of that selected show.

  //fetch an api based on selcted show
  try {
    const res = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
    allEpisodes = await res.json();
    
    displayEpisodes(allEpisodes);
    populateEpisodes(allEpisodes);
    searchEpisodes(allEpisodes);
    selectEpisodesFromDropdown(episodesOfShow);
  }
  catch (err)
  {
    console.log(err.error);
  }
     
    
}

function displayEpisodes(episodes) {
  let EpisodeBeingDisplay = episodes.length;
  let total = document.querySelector(".total-2")
  total.textContent = EpisodeBeingDisplay;

  let displayEpisode = episodes.map((item) => {
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



///populate select show drop down list
//// They said in instruction I can use  getAllShows function here.

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

populateShows();

//when user click on a particular show I should go and get all episodes for that show.

document.querySelector("#select-shows").addEventListener('change', (e) => {
  const selectString = e.target.value;
  console.log(selectString);
  let selectedShow = getAllShows().filter((item) => {

    return (
      item.name === selectString);
  });
  let idOfShow = selectedShow.map(data => data.id);
  //This will go and get all the episodes for the chosen show;
  console.log('result when i calll function with id',getEpisodesAcordingToShow(idOfShow));
 // populateEpisodes(episodesForSelectBox);
});


//This will populate select box with all the episodes of chosen shows.
function populateEpisodes(allEpisodes) {
  selectEpisodes.length = 0;
 // console.log('all Episodes',allEpisodes);
  allEpisodes.forEach((item) => {

 let opt = `S${item.season.toString().padStart(2, 0)}E${item.number.toString().padStart(2, 0)}-${item.name}`;



    let element = document.createElement('option')
    element.textContent = opt;
    element.value = opt;
    selectEpisodes.add(element);

  });


}


document.querySelector("#select-episode").addEventListener('change', selectEpisodesFromDropdown)
function selectEpisodesFromDropdown() {

  const selectString = selectEpisodes.value;
  console.log(selectString);
 // console.log('all episodes from selectbox',allEpisodes);
   
  const selectedEpisodes = allEpisodes.filter((item) => {
    return (`S${item.season.toString().padStart(2, 0)}E${item.number.toString().padStart(2, 0)}-${item.name}` ===selectString)
    
  });
  console.log(selectedEpisodes);

  displayEpisodes(selectedEpisodes);

}





//search episodes functionality



searchBar.addEventListener('keyup', searchEpisodes)
function searchEpisodes() {
  const searchString = searchBar.value.toLowerCase();
  console.log(searchString);
  let totalEpisodes = allEpisodes.length;
  let total = document.querySelector(".total-1");
  total.textContent = totalEpisodes;

  
  const filteredEpisodes = allEpisodes.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchString) ||
      item.summary.toLowerCase().includes(searchString)
    );
  });
  displayEpisodes(filteredEpisodes);
}  



  




