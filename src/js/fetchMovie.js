const API_KEY_V3 = "bdba5342660bdd1dac5d09b885091a0c";
const API_KEY_V4 = "";
const API_URL = "https://api.themoviedb.org/3/";

//---------------------ROUNDING METHOD--------------------------
function roundingMethodToFirstPlace(value){
  let roundingValue = Number(Math.round(value + 'e+1') + 'e-1');
  return roundingValue
};
//--------------------------------------------------------------

//---------------------CONNECT WITH HTML--------------------------
const searchForm = document.getElementById("search-form");
const filmsListHtml = document.querySelector(".grid");
//----------------------------------------------------------------

let homePage = 1;
let tempImageUrl = "";
let filmItems = "";

//---------------------LOAD TRENDING FILMS--------------------------
fetchApi();
//------------------------------------------------------------------

//---------------------LISTENERS TO SEARCH INPUT--------------------------
searchForm.addEventListener("input", cancelInputValue);
searchForm.addEventListener("submit", pageLoadSupport);
//------------------------------------------------------------------------



// ====================================== HANDLING SEARCH INPUT =====BEGIN========================================

//---------------------REACTION ON EMPTY VALUE OF SEARCH INPUT METHODE (input)--------------------------
function cancelInputValue(e){
  e.preventDefault();
  console.log("cancelInputValue function do nothing because input value is true");
  if(!e.target.value){
    console.log("cancelInputValue function. Input value was deleted so fetchApi function start load the most popular films");
    tempImageUrl = "";
    filmItems = "";
    fetchApi()
  }
};
//----------------------------------------------------------------------------------------------

//---------------------REACTION ON SUBMIT OF SEARCH INPUT METHODE--------------------------
function pageLoadSupport(evt){
  evt.preventDefault()
  console.log("pageLoadSupport function");
  if(!searchForm.searchQuery.value){
    console.log("pageLoadSupport function. Input value was deleted so fetchApi function start load the most popular films");
    fetchApi()
  }else{
    filmsListHtml.innerHTML = "";
    console.log("start search results by fetchApi function");
    fetchApiKeyword();
  }
};
//-----------------------------------------------------------------------------------------

//--------------------------INITIAL FETCH API KEYWORD METHODE------------------------------
async function fetchApiKeyword(){
  try {
    let searchInputValue = searchForm.searchQuery.value.trim();
    console.log(searchInputValue);
    fetchApiConfig();
    fetchApiKeywordBase(searchInputValue);
  } catch (error) {
    console.log("fetchApiKeyword function error: ", error);
  }
};
//-----------------------------------------------------------------------------------------

//------------------USE ID AND CONFIG DATA TO GET DETAILS OF FILM--------------------------
async function fetchApiKeywordBase(keyword){
  try {
    tempImageUrl = "";
    filmItems = "";
    const params = new URLSearchParams({
      api_key: API_KEY_V3,
      query: keyword,
      page: "1"
    });
    const response = await fetch(API_URL + "search/" + "keyword" + "?" + params);
    const listFilms = await response.json();
    console.log(listFilms);
    listFilms.results.forEach(result => {
    createHtmlTags(result);
    })
  } catch (error) {
    console.log("fetchApiKeywordBase function error: ", error);
  }
};
//-----------------------------------------------------------------------------------------

//-------------------------BUILD ELEMENTS OF HTML METHODE----------------------------------
async function createHtmlTags(result){
  try {
    const params = new URLSearchParams({
      api_key: API_KEY_V3
    });
    const response = await fetch(API_URL + "movie/" + result.id + "?" + params)
    const filmDetails = await response.json();
    console.log("createHtmlTags object content:", filmDetails);

    if(filmDetails.poster_path && filmDetails.genres.length>0){
      let yearWithDate = new Date(filmDetails.release_date);
      const genresArray = filmDetails.genres.map(genre => {return genre.name});
      console.log(genresArray);
      console.log(tempImageUrl, filmDetails.poster_path);

      filmItems+=`
      <li>
        <figure class="card">
          <div class="thumb">
            <img class="img" src="${tempImageUrl}${filmDetails.poster_path}" />
          </div>
          <figcaption>
            <h3 class="title">${filmDetails.title}</h3>
            <div class="details-wrapper">
              <p class="details" data-film_id="${filmDetails.id}">${genresArray.join(", ")} &#124; ${yearWithDate.getFullYear()}</p>
              <div class="rating rating--visible">${roundingMethodToFirstPlace(filmDetails.vote_average)}</div>
            </div>
          </figcaption>
        </figure>
      </li>
      `
      filmsListHtml.innerHTML = filmItems;
    }else{
      console.log("There are not exist poster_path and / or genres array");
    };

  } catch (error) {
    console.log("createHtmlTags function error: ", error);
  }
};
//-----------------------------------------------------------------------------------------
// ====================================== HANDLING SEARCH INPUT =====END========================================



// ====================================== HANDLING LOADING TRENDING FILMS ===BEGIN========================================
//-------------------------------------MAIN METHODE----------------------------------------
async function fetchApi(){
  try {
    fetchApiConfig();
    fetchApiTrending(homePage)
    .then(film => {
      const filmDetailsHtml = document.querySelectorAll(".details");
      console.log("fetchApi -> fetchApiTrending.then here forEach start to get film details with fetchApiGetDetailsFilm methode");
      filmDetailsHtml.forEach(el => {
        fetchApiGetDetailsFilm(el)
      })
    })
  } catch (error) {
    console.log("fetchApi: ", error);
  }
};
//-----------------------------------------------------------------------------------------

// ------------------get base part image link methode---------------------
async function fetchApiConfig(){
  try {
    const params = new URLSearchParams({
      api_key: API_KEY_V3
    });
    const response = await fetch(API_URL + "configuration" + "?" + params);
    const config = await response.json();
    console.log("fetchApiConfig object content:", config);
    tempImageUrl = config.images.base_url + config.images.poster_sizes[3];
    console.log("function fetchApiConfig base url to get img:", tempImageUrl);
  } catch (error) {
    console.log("fetchApiConfig: ", error);
  }
};
// ------------------------------------------------------------

// -------------------get trending films-----------------------
export async function fetchApiTrending(page){
  try {
    const params = new URLSearchParams({
      api_key: API_KEY_V3,
      page: page,
    });
    const response = await fetch(API_URL + "trending/" + "movie/" + "day" + "?" + params);
    const film = await response.json();
    console.log("fetchApiTrending object content", film);
    console.log("fetchApiTrending forEach start to create HTML li>img tags");
    
    film.results.forEach(result => {
      filmItems+=`
      <li>
        <figure class="card">
          <div class="thumb">
            <img class="img" src="${tempImageUrl}${result.poster_path}" />
          </div>
          <figcaption>
            <h3 class="title">${result.title}</h3>
            <div class="details-wrapper">
              <p class="details" data-film_id="${result.id}"></p>
              <div class="rating rating--visible">${roundingMethodToFirstPlace(result.vote_average)}</div>
            </div>
          </figcaption>
        </figure>
      </li>
      `
    });
    filmsListHtml.innerHTML = filmItems;
    return film
  } catch (error) {
    console.log("fetchApiTrending: ", error);
  }
};
// ---------------------------------------------------------------------

// --------------------get genres and year methode----------------------
export async function fetchApiGetDetailsFilm(elHtml){
  try {
    const params = new URLSearchParams({
      api_key: API_KEY_V3
    });
    const response = await fetch(API_URL + "movie/" + elHtml.dataset.film_id + "?" + params)
    const filmDetails = await response.json();

    console.log("fetchApiGetDetailsFilm object content:", filmDetails);
    let yearWithDate = new Date(filmDetails.release_date);
    const genresArray = filmDetails.genres.map(genre => {return genre.name});
    console.log("genres array - result .map methode inside fetchApiGetDetailsFilm:", genresArray);
    elHtml.innerHTML = `${genresArray.join(", ")} &#124; ${yearWithDate.getFullYear()}`
  } catch (error) {
    console.log("fetchApiGetDetailsFilm: ", error);
  }
};
// ---------------------------------------------------------------------

const card = document.querySelector('.grid');

function open(e) {
  if (e.target.parentElement.className ) {
     
    return console.log("modal");
  }

}

card.addEventListener("click", open);
