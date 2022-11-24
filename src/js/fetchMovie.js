const API_KEY_V3 = "bdba5342660bdd1dac5d09b885091a0c";
const API_KEY_V4 = "";
const API_URL = "https://api.themoviedb.org/3/";
import symbol from '../images/svg/icons.svg';
import Pagination from 'tui-pagination';
import { optionsSearch } from './pagination';
import {removeSpinner, addSpinner } from './spinner';



//---------------------ROUNDING METHOD--------------------------
function roundingMethodToFirstPlace(value){
  let roundingValue = Number(Math.round(value + 'e+1') + 'e-1');
  return roundingValue
};
//--------------------------------------------------------------

//---------------------CONNECT WITH HTML--------------------------
const searchForm = document.getElementById("search-form");
const filmsListHtml = document.querySelector(".grid");
const alertNotResults = document.querySelector(".message");
const descriptionMovie = document.querySelector('.modal');
//----------------------------------------------------------------
                        
//---------------------PAGINATION---------------------------------

const containerSearch = document.getElementById('pagination');
 
//----------------------------------------------------------------

let homePage = 1;
let tempImageUrl = "";
let filmItems = "";

//---------------------LOAD TRENDING FILMS--------------------------
fetchApi();
//------------------------------------------------------------------

//---------------------LISTENERS TO SEARCH INPUT--------------------------
if(searchForm){
  searchForm.addEventListener("input", cancelInputValue);
  searchForm.addEventListener("submit", pageLoadSupport);
}

// //------------------------------------------------------------------------


// ====================================== HANDLING SEARCH INPUT =====BEGIN========================================

//---------------------REACTION ON EMPTY VALUE OF SEARCH INPUT METHODE (input)--------------------------
function cancelInputValue(e){
  e.preventDefault();
  console.log("cancelInputValue function do nothing because input value is true");
  if(!e.target.value){
    console.log("cancelInputValue function. Input value was deleted so fetchApi function start load the most popular films");
    alertNotResults.innerHTML = "";
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
export async function fetchApiKeyword(page){
  try {
    let searchInputValue = searchForm.searchQuery.value.trim();
    //console.log(searchInputValue);
    fetchApiConfig();
    fetchApiKeywordBase(page, searchInputValue);
    
  } catch (error) {
    console.log("fetchApiKeyword function error: ", error);
  }
};
//-----------------------------------------------------------------------------------------

//------------------USE ID AND CONFIG DATA TO GET DETAILS OF FILM--------------------------
export async function fetchApiKeywordBase(page,keyword){
  try {
    tempImageUrl = "";
    filmItems = "";

    const params = new URLSearchParams({
      api_key: API_KEY_V3,
      query: keyword,
      page: page,
    });

    const response = await fetch(API_URL + "search/movie" + "?" + params);
    const listFilms = await response.json();

    const total_results = listFilms.total_results;
    optionsSearch.totalItems = total_results;
    const paginationSearch = new Pagination(containerSearch, optionsSearch);

    if  (listFilms.results.length===0){
          console.log("There are not result. Function stops.");
          alertNotResults.innerHTML = "Search result not successful. Enter the correct movie name.";
    } else  {
      //console.log("There are results. GO!");
      console.log("Current Page:", paginationSearch.getCurrentPage());
      
      paginationSearch.on('beforeMove', async event => {
          const pageSearch = event.page;
          const topPage = document.querySelector(".header");
          paginationSearch.setTotalItems(total_results);
          optionsSearch.page = pageSearch;
          fetchApiKeyword(pageSearch);
          topPage.scrollIntoView({behavior: "smooth"});
       });

      alertNotResults.innerHTML = "";
      listFilms.results.forEach(result => {
        createHtmlTagsSearch(result);
      })
    }
    return optionsSearch.totalItems;
  } catch (error) {
    console.log("fetchApiKeywordBase function error: ", error);
  }
};
// //-----------------------------------------------------------------------------------------

//-------------------------BUILD ELEMENTS OF HTML METHODE----------------------------------
export async function createHtmlTagsSearch(result){
  try {
    const params = new URLSearchParams({
      api_key: API_KEY_V3
    });
    const response = await fetch(API_URL + "movie/" + result.id + "?" + params)
    const filmDetails = await response.json();
    //console.log("createHtmlTags object content:", filmDetails);

    if(filmDetails.poster_path && filmDetails.genres.length>0){
      let yearWithDate = new Date(filmDetails.release_date);
      const genresArray = filmDetails.genres.map(genre => {return genre.name});
     // console.log(genresArray);
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
     // console.log("fetchApi -> fetchApiTrending.then here forEach start to get film details with fetchApiGetDetailsFilm methode");
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
    // SPINER START
    const response = await fetch(API_URL + "configuration" + "?" + params);
    const config = await response.json();
    //console.log("fetchApiConfig object content:", config);
    tempImageUrl = config.images.base_url + config.images.poster_sizes[3];
    //console.log("function fetchApiConfig base url to get img:", tempImageUrl);
  } catch (error) {
    console.log("fetchApiConfig: ", error);
  }
};
// ------------------------------------------------------------

// -------------------get trending films-----------------------
export async function fetchApiTrending(page){
  try {
    removeSpinner()
      const params = new URLSearchParams({
        api_key: API_KEY_V3,
        page: page,
    });
    const response = await fetch(API_URL + "trending/" + "movie/" + "day" + "?" + params);
    const film = await response.json();

    const total_results = film.total_results;
    console.log(total_results);
    optionsSearch.totalItems = total_results;
    const paginationSearch = new Pagination(containerSearch, optionsSearch);

    // SPINER END
    //console.log("fetchApiTrending object content", film);
    //console.log("fetchApiTrending forEach start to create HTML li>img tags");
    paginationSearch.on('beforeMove', async event => {
      const page = event.page;
      const topPage = document.querySelector(".header");
      paginationSearch.setTotalItems(total_results);
      optionsSearch.page = page;
      fetchApiTrending(page);
      topPage.scrollIntoView({behavior: "smooth"});
    });
    
    console.log('Total Results Trending =', film);
    filmItems = '';
    film.results.forEach(result => {
      filmItems +=`
      <li>
        <figure class="card">
          <div class="thumb"  data-id="${result.id}">
            <img class="img" src="${tempImageUrl}${result.poster_path}" data-id="${result.id}"/>
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
    addSpinner()
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

    //console.log("fetchApiGetDetailsFilm object content:", filmDetails);
    let yearWithDate = new Date(filmDetails.release_date);
    const genresArray = filmDetails.genres.map(genre => {return genre.name});
    //console.log("genres array - result .map methode inside fetchApiGetDetailsFilm:", genresArray);
    elHtml.innerHTML = `${genresArray.join(", ")} &#124; ${yearWithDate.getFullYear()}`
  } catch (error) {
    console.log("fetchApiGetDetailsFilm: ", error);
  }
};
// ---------------------------------------------------------------------

//-------------------------DESCRIPTION TEST----------------------------------------------

export async function createHtmlTags(result){
  try {
    const params = new URLSearchParams({
      api_key: API_KEY_V3
    });
    const response = await fetch(API_URL + "movie/" + result + "?" + params)
    const filmDetails = await response.json();
    //console.log("createHtmlTags object content:", filmDetails);

    if(filmDetails.poster_path && filmDetails.genres.length>0){
      let yearWithDate = new Date(filmDetails.release_date);
      const genresArray = filmDetails.genres.map(genre => {return genre.name});
      //console.log(genresArray);
      //console.log(tempImageUrl, filmDetails.poster_path);

    const  markupMovie = `
  <div class="movie__description" data-id="${ result }">

  <div class="movie__poster-wrappaer">
    <img src="https://image.tmdb.org/t/p/w500/${ filmDetails.poster_path }" alt="title" class="movie__poster" />
  </div>
  
  <div class="movie__container">
    <h3 class="movie__title">${ filmDetails.title }</h3>
    <div class="description__container">
      <div class="description__title-wrapper">
        <p class="description__title">Vote / Votes</p>
        <p class="description__title">Popularity</p>
        <p class="description__title">Original Title</p>
        <p class="description__title">Genre</p>
      </div>

      <div class="description__text-wrapper">
        <p class="description__text">
          <span class="vote--accent">${roundingMethodToFirstPlace( filmDetails.vote_average) }</span>&#47;<span class="vote">${ filmDetails.vote_count }</span>
        </p>
        <p class="description__text description__popularity">${ filmDetails.popularity }</p>
        <p class="description__text">${ filmDetails.original_title}</p>
        <p class="description__text">${ genresArray }</p>
      </div>
    </div>
    <h4 class="about__title">About</h4>
    <p class="about__text">${ filmDetails.overview}</p>
    <div class="btn__container">
      <button type="button" class="modal__btn btn__watched" data-id="${ result }">Add to watched</button>
      <button type="button" class="modal__btn btn__queue" data-id="${ result }">Add to queue</button>
    </div>
  </div>
  <button type="button" class="modal__close" data-movie-close>
    <svg class="modal__close-icon" width="18" height="18">
      <use href="${symbol}#btn-mobile-menu-close"></use>
    </svg>
  </button>
</div>
  `;

descriptionMovie.innerHTML = markupMovie;

   }else{
      console.log("There are not exist poster_path and / or genres array");
    };

  } catch (error) {
    console.log("createHtmlTags function error: ", error);
  }
};