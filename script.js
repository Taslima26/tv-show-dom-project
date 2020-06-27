//You can edit ALL of the code here
let titleHeader = document.querySelector("h4")
let imageHolder = document.querySelector(".photo")
let subtitleHolder = document.querySelector('.episode-code');
let descriptionHolder = document.querySelector('.item-text');
let sectionCenter = document.querySelector('.section-center');
let searchBar = document.querySelector("#searchBar");
let selectEpisodes = document.querySelector("#select-episode");
let goBackToAllEpisodes = document.querySelector(".go-back-to-all-episodes");

let episodesData = [];


 
const loadCharacters = async () => {
  try {
    const res = await fetch('https://api.tvmaze.com/shows/82/episodes');
    
    episodesData = await res.json();
    displayEpisodes(episodesData);
  } catch (err) {
    console.error(err);
  }
};



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
//create select box
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
        'S0' + item.season.toString() + 'E0' + item.number.toString() + '-' + item.name===selectString
        
      );
    });
    displayEpisodes(selectedMovies);
  


  });

  //event for go back to main page 
goBackToAllEpisodes.addEventListener('click',(e)=>
  {
  loadCharacters();

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

loadCharacters();
 makePageForEpisodes()


