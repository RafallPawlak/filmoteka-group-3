// import Pagination from 'tui-pagination';
// import {fetchApiKeyword , API_KEY_V3 , API_URL } from './fetchMovie';
// import { optionsSearch } from './pagination';
// import { createHtmlTagsSearch } from './fetchMovie';


// const containerSearch = document.getElementById('pagination2');
// const paginationSearch = new Pagination(containerSearch, optionsSearch);


// paginationSearch.on('beforeMove', async event => {
//   const pageSearch = event.page;
//   paginationSearch.setTotalItems(optionsSearch.totalItems);
//   fetchApiKeyword(pageSearch);
// });

// export async function fetchApiKeywordBase(page,keyword){
//   try {
//     tempImageUrl = "";
//     filmItems = "";
//     const params = new URLSearchParams({
//     api_key: API_KEY_V3,
//     query: keyword,
//     page: page,
//     });
//     const response = await fetch(API_URL + "search/movie" + "?" + params);
//     const listFilms = await response.json();
//     const total_results = listFilms.total_results;
//     optionsSearch.totalItems = total_results;

//     if(listFilms.results.length===0){
//       console.log("There are not result. Function stops.");
//       alertNotResults.innerHTML = "Search result not successful. Enter the correct movie name.";
//     }else{
//      // console.log("There are results. GO!");
//       console.log("TotalItems z keywordBase:",optionsSearch.totalItems);
//       //paginationSearch.reset(listFilms.total_results);
//       //paginationSearch.setTotalItems(listFilms.total_results);
//       alertNotResults.innerHTML = "";
//       listFilms.results.forEach(result => {
//         createHtmlTagsSearch(result);
//       })
//     }
//    // return optionsSearch.totalItems;
//   } catch (error) {
//     console.log("fetchApiKeywordBase function error: ", error);
//   }
// };