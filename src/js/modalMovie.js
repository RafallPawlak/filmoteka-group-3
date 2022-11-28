import {  descriptionTagMovie } from './fetchMovie';
import { changeWatchedQueueList, textModalButtons } from './localStorage';

const body = document.querySelector('body');
const card = document.querySelector('[data-modal-open]');
const modal = document.querySelector('[data-modal]');
const backdrop = document.querySelector('.backdrop');

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
      const closeBtn = document.querySelector('[data-movie-close]');
      closeBtn.addEventListener('click', closeModal);
      changeWatchedQueueList(id);
      textModalButtons(id);
  });

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

// backdrop.addEventListener('click', (e) => {
//   if (e.target.className === 'backdrop') {
//     closeModal();
//   }
// });
