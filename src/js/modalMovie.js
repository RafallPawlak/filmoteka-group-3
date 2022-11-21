const body = document.querySelector('body');
const card = document.querySelector("[data-modal-open]");
const closeBtn = document.querySelector("[data-movie-close]");
const modal = document.querySelector("[data-modal]");

card.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);

export function openModal(e) {
  if (e.target.parentElement.className !== 'thumb') {
    return;
  }
  toggleModal();
  body.classList.add('no-scroll');
  window.addEventListener('keydown', onEscClick);
  console.log("modal", e.target.parentElement.className);
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




