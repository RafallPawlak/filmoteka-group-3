import { fetchApiGetDetailsFilm } from "./fetchMovie";

const overlay = document.querySelector('.modal-overlay');
const body = document.querySelector('body');
const movieDescription = document.querySelector('[data-movie-description]');
const card = document.querySelector('li');
overlay.addEventListener('click', onCloseModal);
card.addEventListener('click', onOpenModal);

export function onOpenModal() {
//   const marginSize = window.innerWidth - body.clientWidth;
//   if (marginSize) {
//     body.style.marginRight = marginSize + 'px';
//   }
    console.log("modal");
//   overlay.classList.add('visiable');
//   body.classList.add('no-scroll');

//   window.addEventListener('keydown', onEscClick);
}


export function onCloseModal(e) {
  if (e.target === overlay) {
    closeModal();
  }
}

export function closeModal() {
  overlay.classList.remove('visiable');
  body.classList.remove('no-scroll');
  movieDescription.textContent = '';
  body.style.marginRight = '';
}
 
