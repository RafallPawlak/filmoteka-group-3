import { saveKey, getKey, removeKey } from './localStorage';
import { fetchApiById } from './fetchApiById';

const libraryGrid = document.querySelector('.library-grid');
const btnLibWatched = document.querySelector('.btn__lib__watched');
const btnLibQueue = document.querySelector('.btn__lib__queue');
const libraryInfo = document.querySelector('.library__info');

showFullLibrary();
// showing full films list of both lists (queue and watched)
function showFullLibrary() {
  let watchedIdList = [];
  let queueIdList = [];
  if (getKey('watched')) {
    watchedIdList = getKey('watched');
  }
  if (getKey('queue')) {
    queueIdList = getKey('queue');
  }
  const fullIdList = [...watchedIdList, ...queueIdList];

  if (fullIdList.length === 0) {
    libraryInfo.innerHTML = `<h2>No films added to your library</h2>
      <p>Find something you've watched or something to watch from the most popular</p>
      <button>LET'S GO</button>`;
  } else {
    for (let id of fullIdList) {
      fetchApiById(id).then(data => {
        const markup = `
      <li>
        <figure class="card">
          <div class="thumb">
            <img class="img" src="https://www.themoviedb.org/t/p/w300${
              data.poster_path
            }" />
          </div>
          <figcaption>
            <h3 class="title">${data.title}</h3>
            <div class="details-wrapper">
              <p class="details" data-film_id="${data.id}">${genresArray.join(
          ', '
        )} &#124; ${yearWithDate.getFullYear()}</p>
              <div class="rating rating--visible">${roundingMethodToFirstPlace(
                data.vote_average
              )}</div>
            </div>
          </figcaption>
        </figure>
      </li>
      `;
        libraryGrid.insertAdjacentHTML('beforeend', markup);
      });
    }
  }
}
