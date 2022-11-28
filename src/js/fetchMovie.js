const API_KEY_V3 = "bdba5342660bdd1dac5d09b885091a0c";
const API_KEY_V4 = "";
const API_URL = "https://api.themoviedb.org/3/";
import symbol from '../images/svg/icons.svg';
import Pagination from 'tui-pagination';
import { optionsSearch } from './pagination';
import { removeSpinner, addSpinner } from './spinner';

//---------------------ROUNDING METHOD--------------------------
export function roundingMethodToFirstPlace(value) {
  let roundingValue = Number(Math.round(value + 'e+1') + 'e-1');
return roundingValue
};
//--------------------------------------------------------------

//---------------------CONNECT WITH HTML--------------------------
const searchForm = document.getElementById("search-form");
const filmsListHtml = document.querySelector(".grid");
const alertNotResults = document.querySelector(".message");
const descriptionMovie = document.querySelector('.modal');
const containerSearch = document.getElementById('pagination');
//----------------------------------------------------------------
                        
let homePage = 1;
let tempImageUrl = "";
let filmItems = "";

//---------------------LOAD TRENDING FILMS-------------------------------

fetchApi();

//---------------------LISTENERS TO SEARCH INPUT--------------------------
if(searchForm){
  searchForm.addEventListener("input", cancelInputValue);
  searchForm.addEventListener("submit", pageLoadSupport);
  searchForm.searchQuery.addEventListener("focus", removeBorderAndPlaceholder);
  searchForm.searchQuery.addEventListener("blur", addBorderAndPlaceholder);
}
//------------------------------------------------------------------------
function removeBorderAndPlaceholder(){
  searchForm.searchQuery.placeholder = "";
};
function addBorderAndPlaceholder(){
  searchForm.searchQuery.placeholder = "Search for a movie...";
};


// ====================================== HANDLING SEARCH INPUT ========================================

//---------------------REACTION ON EMPTY VALUE OF SEARCH INPUT METHODE (input)--------------------------

function cancelInputValue(e){
  e.preventDefault();
  if(!e.target.value){
    alertNotResults.innerHTML = "";
    tempImageUrl = "";
    filmItems = "";
    fetchApi()
  }
};

//---------------------REACTION ON SUBMIT OF SEARCH INPUT METHODE--------------------------

function pageLoadSupport(evt){
  evt.preventDefault()
  if(!searchForm.searchQuery.value){
    fetchApi()
  }else{
    filmsListHtml.innerHTML = "";
    fetchApiKeyword();
  }
};

//--------------------------INITIAL FETCH API KEYWORD METHODE------------------------------

export async function fetchApiKeyword(page){
  try {
    let searchInputValue = searchForm.searchQuery.value.trim();
    optionsSearch.page = 1;
    fetchApiConfig();
    fetchApiKeywordBase(page, searchInputValue)
      .then(film => {
          const filmDetailsHtml = document.querySelectorAll(".details");
          filmDetailsHtml.forEach(el => {
          fetchApiGetDetailsFilm(el)
      })
    });;
    
  } catch (error) {
      console.log("fetchApiKeyword function error: ", error);
  }
};

//------------------USE ID AND CONFIG DATA TO GET DETAILS OF FILM--------------------------

export async function fetchApiKeywordBase(page,keyword){
  try {
    addSpinner();
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
          alertNotResults.innerHTML = "Search result not successful. Enter the correct movie name.";
    } else  {
      paginationSearch.on('beforeMove', async event => {
          const pageSearch = event.page;
          const topPage = document.querySelector(".header");
          paginationSearch.setTotalItems(total_results);
          optionsSearch.page = pageSearch;
        
          fetchApiConfig();
          fetchApiKeywordBase(pageSearch, keyword)
            .then(film => {
              const filmDetailsHtml = document.querySelectorAll(".details");
              filmDetailsHtml.forEach(el => {
                fetchApiGetDetailsFilm(el)
          })
      });;
          topPage.scrollIntoView({behavior: "smooth"});
       });

      alertNotResults.innerHTML = "";
    
      listFilms.results.forEach(result => {
        if (result.poster_path === null) {
          return;
        } else {
          filmItems += `
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
        }
      });
    filmsListHtml.innerHTML = filmItems;
    }
    removeSpinner();
  } catch (error) {
      console.log("fetchApiKeywordBase function error: ", error);
  }
};

// ========================== HANDLING LOADING TRENDING FILMS =====================================

//-------------------------------------MAIN METHODE----------------------------------------
async function fetchApi(page){
  try {
    optionsSearch.page = 1;
    await fetchApiConfig();
    await fetchApiTrending(homePage)
      .then(film => {
          const filmDetailsHtml = document.querySelectorAll(".details");
          filmDetailsHtml.forEach(el => {
          fetchApiGetDetailsFilm(el)
      })
    })
  } catch (error) {
    console.log("fetchApi: ", error);
  }
};

// ------------------get base part image link methode---------------------

async function fetchApiConfig(){
  try {
    const params = new URLSearchParams({
      api_key: API_KEY_V3
    });
    const response = await fetch(API_URL + "configuration" + "?" + params);
    const config = await response.json();
    tempImageUrl = config.images.base_url + config.images.poster_sizes[3];
  } catch (error) {
      console.log("fetchApiConfig: ", error);
  }
};

// -------------------get trending films-----------------------------------

export async function fetchApiTrending(page){
  try {
    addSpinner()
      const params = new URLSearchParams({
        api_key: API_KEY_V3,
        page: page,
    });
    const response = await fetch(API_URL + "trending/" + "movie/" + "day" + "?" + params);
    const film = await response.json();
    const total_results = film.total_results;
    optionsSearch.totalItems = total_results;
   
    const paginationSearch = new Pagination(containerSearch, optionsSearch);

    paginationSearch.on('beforeMove', async event => {
      const page = event.page;
      const topPage = document.querySelector(".header");
      paginationSearch.setTotalItems(total_results);
      optionsSearch.page = page;
      fetchApiTrending(page)
        .then(film => {
          const filmDetailsHtml = document.querySelectorAll(".details");
          filmDetailsHtml.forEach(el => {
            fetchApiGetDetailsFilm(el)
      })
    });
      topPage.scrollIntoView({behavior: "smooth"});
    });

    filmItems = '';
    film.results.forEach(result => {
      if (result.poster_path === null) {
       // && result.genre_ids.length
        return;
      } else {
        filmItems += `
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
      }
});
    filmsListHtml.innerHTML = filmItems;
    removeSpinner();
  } catch (error) {
      console.log("fetchApiTrending: ", error);
  }
};

// --------------------get genres and year methode----------------------

export async function fetchApiGetDetailsFilm(elHtml){
  try {
    const params = new URLSearchParams({
      api_key: API_KEY_V3
    });
    const response = await fetch(API_URL + "movie/" + elHtml.dataset.film_id + "?" + params)
    const filmDetails = await response.json();

    let yearWithDate = new Date(filmDetails.release_date);
    const genresArray = filmDetails.genres.map(genre => { return genre.name });
    elHtml.innerHTML = `${genresArray.join(", ")} &#124; ${yearWithDate.getFullYear()}`;
    
  } catch (error) {
      console.log("fetchApiGetDetailsFilm: ", error);
  }
};

//-------------------------DESCRIPTION MOVIE----------------------------------------------

export async function descriptionTagMovie(result){
  try {
    const params = new URLSearchParams({
      api_key: API_KEY_V3
    });
    const response = await fetch(API_URL + "movie/" + result + "?" + params)
    const filmDetails = await response.json();

    if(filmDetails.poster_path && filmDetails.genres.length>0){
      let yearWithDate = new Date(filmDetails.release_date);
      const genresArray = filmDetails.genres.map(genre => {return genre.name});

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
      
    };
  } catch (error) {
    console.log("createHtmlTags function error: ", error);
  }
};