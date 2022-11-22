import { createHtmlTags } from './fetchMovie';
console.log("modalMovie begin file. It is before create modal window");

const body = document.querySelector('body');
const card = document.querySelector("[data-modal-open]");
const modal = document.querySelector("[data-modal]");

card.addEventListener('click', openModal);

export function openModal(e) {
  if (e.target.parentElement.className !== 'thumb') {
    return;
  }
  toggleModal();
  body.classList.add('no-scroll');
  window.addEventListener('keydown', onEscClick);
  const id = e.target.parentElement.dataset.id;
  createHtmlTags(id)
  .then(el =>{
    console.log("it is after create modal window");
    const closeBtn = document.querySelector("[data-movie-close]");
    console.log(closeBtn);
    closeBtn.addEventListener('click', closeModal);
  })
  console.log("modal", e.target.parentElement.className, id);
}

export function closeModal() {
  modal.classList.toggle("is-hidden")
  body.classList.remove('no-scroll');
}

function toggleModal() {
  modal.classList.toggle("is-hidden");
}

function onEscClick(event) {
  if (event.code === 'Escape') {
    closeModal();
    window.removeEventListener('keydown', onEscClick);
  }
}
