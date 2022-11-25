import { getKey } from './localStorage';
import { fetchApiById } from './fetchApiById';
import { roundingMethodToFirstPlace } from './fetchMovie';

const libraryGrid = document.querySelector('.library__grid');
const libraryInfo = document.querySelector('.filmless');
const btnLibWatched = document.querySelector('.btn__lib__watched');
const btnLibQueue = document.querySelector('.btn__lib__queue');
// const library = document.querySelector('.library');

showFullLibrary();
btnLibWatched.addEventListener('click', showWatched);
btnLibQueue.addEventListener('click', showQueue);

// showing full films list of both lists (queue and watched)
function showFullLibrary() {
  libraryGrid.innerHTML = '';
  libraryInfo.innerHTML = '';

  let watchedIdList = [];
  let queueIdList = [];
  if (getKey('watched')) {
    watchedIdList = getKey('watched');
  }
  if (getKey('queue')) {
    queueIdList = getKey('queue');
  }
  const fullIdList = [...watchedIdList, ...queueIdList];

  if (watchedIdList.length === 0 && queueIdList.length === 0) {
    const noLibraryMarkup = `<h2 class="filmless__title">No films have been added to your library</h2>
      <p>Find something you've watched or something to watch from the most popular</p>
      <button class="modal__btn filmless__button" onclick="location.href='https://rafallpawlak.github.io/filmoteka-group-3/'" type="button">LET'S GO</button>`;
    libraryInfo.insertAdjacentHTML('beforeend', noLibraryMarkup);
  } else {
    for (let id of fullIdList) {
      fetchApiById(id).then(data => {
        let yearWithDate = new Date(data.release_date);
        const genresArray = data.genres.map(genre => {
          return genre.name;
        });
        const markup = `
      <li>
        <figure class="card">
          <div class="thumb" data-id="${data.id}">
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

function showWatched() {
  libraryGrid.innerHTML = '';
  libraryInfo.innerHTML = '';

  const idList = getKey('watched');

  addBtnActiveClass(btnLibWatched);
  removeBtnActiveClass(btnLibQueue);

  if (!idList || idList.length === 0) {
    const noLibraryMarkup = `<h2 class="filmless__title">No films have been added to your watched</h2>
      <p>Find something you've watched from the most popular</p>
      <button class="modal__btn filmless__button" onclick="location.href='https://rafallpawlak.github.io/filmoteka-group-3/'" type="button">LET'S GO</button>`;
    libraryInfo.insertAdjacentHTML('beforeend', noLibraryMarkup);
  } else {
    for (let id of idList) {
      fetchApiById(id).then(data => {
        let yearWithDate = new Date(data.release_date);
        const genresArray = data.genres.map(genre => {
          return genre.name;
        });
        const markup = `
      <li>
        <figure class="card">
          <div class="thumb" data-id="${data.id}">
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

function showQueue() {
  libraryGrid.innerHTML = '';
  libraryInfo.innerHTML = '';

  const idList = getKey('queue');

  addBtnActiveClass(btnLibQueue);
  removeBtnActiveClass(btnLibWatched);

  if (!idList || idList.length === 0) {
    const noLibraryMarkup = `<h2 class="filmless__title">No films have been added to your queue list</h2>
      <p>Find something to watch from the most popular</p>
      <button class="modal__btn filmless__button" onclick="location.href='https://rafallpawlak.github.io/filmoteka-group-3/'" type="button">LET'S GO</button>`;
    libraryInfo.insertAdjacentHTML('beforeend', noLibraryMarkup);
  } else {
    for (let id of idList) {
      fetchApiById(id).then(data => {
        let yearWithDate = new Date(data.release_date);
        const genresArray = data.genres.map(genre => {
          return genre.name;
        });
        const markup = `
      <li>
        <figure class="card">
          <div class="thumb" data-id="${data.id}">
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

const addBtnActiveClass = btnToAddClassTo => {
  if (btnToAddClassTo.classList.contains('btn--active')) {
    return;
  }
  btnToAddClassTo.classList.add('btn--active');
};

const removeBtnActiveClass = btnToRemoveClassFrom => {
  if (!btnToRemoveClassFrom.classList.contains('btn--active')) {
    return;
  }
  btnToRemoveClassFrom.classList.remove('btn--active');
};
