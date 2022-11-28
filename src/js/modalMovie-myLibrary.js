import { descriptionTagMovie } from './fetchMovie';
import { changeWatchedQueueList, textModalButtons } from './localStorage';
import {
  showFullLibrary,
  showWatched,
  showQueue,
  btnLibWatched,
  btnLibQueue,
} from './showMyLibraryLists';
//console.log('modalMovie begin file. It is before create modal window');

const body = document.querySelector('body');
const card = document.querySelector('[data-modal-open]');
const modal = document.querySelector('[data-modal]');
//const backdrop = document.querySelector('.backdrop');

if (card) {
  card.addEventListener('click', openModal);
}

export function openModal(e) {
  if (e.target.parentElement.className !== 'thumb') {
    return;
  }
  toggleModal();
  body.classList.add('no-scroll');
  window.addEventListener('keydown', onEscClick);
  const id = e.target.parentElement.dataset.id;
  descriptionTagMovie(id).then(() => {
    //console.log('it is after create modal window');
    const closeBtn = document.querySelector('[data-movie-close]');
    //console.log(closeBtn);
    closeBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', loadLibraryListOnModalClose);
    changeWatchedQueueList(id);
    textModalButtons(id);
  });
  // console.log('modal', e.target.parentElement.className, id);
}

export function closeModal() {
  modal.classList.toggle('is-hidden');
  body.classList.remove('no-scroll');
}

function toggleModal() {
  modal.classList.toggle('is-hidden');
}

function onEscClick(event) {
  if (event.code === 'Escape') {
    closeModal();
    window.removeEventListener('keydown', onEscClick);
  }
}

function loadLibraryListOnModalClose() {
  if (
    !btnLibWatched.classList.contains('btn--active') &&
    !btnLibQueue.classList.contains('btn--active')
  ) {
    showFullLibrary();
  }
  if (btnLibWatched.classList.contains('btn--active')) {
    showWatched();
  }
  if (btnLibQueue.classList.contains('btn--active')) {
    showQueue();
  }
}

// backdrop.addEventListener('click', (e) => {
//   if (e.target.className === 'backdrop') {
//     closeModal();
//   }
// });