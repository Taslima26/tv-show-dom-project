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


 
const loadEpisodes = async () => {
  try {
    const res = await fetch('https://api.tvmaze.com/shows/82/episodes');
    
    episodesData = await res.json();
    displayEpisodes(episodesData);
  } catch (err) {
    console.error(err);
  }
};

const loadShows = async () => {
  try {
    const res = await fetch('  http://api.tvmaze.com/shows/1/episodes');
    //How do I  get show id here  everytime user select item??
    //Think !!
    showsData = await res.json();
    
    return showsData;

  } catch(err){
    console.log(err);
  }
}



//const allEpisodesDetails = setup();
searchBar.addEventListener('keyup', (e) => {

  const searchString = e.target.value.toLowerCase();
  const filteredMovies = episodesData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchString) ||
      item.summary.toLowerCase().includes(searchString)
    );
  });
  displayEpisodes(filteredMovies);
});

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
//create select box for episodes
getAllEpisodes().forEach((item) => {

  let opt = 'S0' + item.season.toString() + 'E0' + item.number.toString() + '-' + item.name;

  let el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  selectEpisodes.appendChild(el);

});
   
//select box logic 
  

  document.querySelector("#select-episode").addEventListener('change', (e) => {
    const selectString = e.target.value;
    console.log(selectString);
    const selectedMovies = episodesData.filter((item) => {
      return (
        'S0' + item.season.toString() + 'E0' + item.number.toString() + '-' + item.name === selectString
        
      );
    });
    displayEpisodes(selectedMovies);
  


  });

  //select logic for shows...
document.querySelector("#select-shows").addEventListener('change', (e) => {
  const selectString = e.target.value;
  const selectShows = showsData.filter((item) => {
    return (item.name = selectString);
  });
  displayShows(selectShows);
})

  //event for go back to main page 
goBackToAllEpisodes.addEventListener('click',(e)=>
  {
  loadEpisodes();

  });
  




  
  

  


function makePageForEpisodes() {
  const rootElem = document.getElementById("root");
 
  //rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  var a = document.createElement('a');
  var linkText = document.createTextNode("This data is coming from tvmaze.com,Please click here for more info .Copyrights reserve at @ https://www.tvmaze.com/");
  a.appendChild(linkText);
  a.title = "The data is comin from tvmaze.com/api#licensing";
  a.href = "https://www.tvmaze.com/";
  rootElem.appendChild(a);

}


 
loadEpisodes();
makePageForEpisodes()
loadShows();


///select shows logic here

getAllShows().forEach((item) => {

  let opt = item.name;
  let el = document.createElement("option");
  el.textContent = opt;
  el.value = opt;
  selectShows.appendChild(el);

});
