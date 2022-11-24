export const refs = {
 
    openFooterModal: document.querySelector('[data-action="open-lightbox"]'),
    closeFooterModal: document.querySelector('[data-action="close-lightbox"]'),
    lightboxFooterModal: document.querySelector('.js-lightbox'),
    backdropClick: document.querySelector('.modal-background'),
    spinnerPreloader: document.querySelector('.js-preloader-page'),
     
};

//================================open the modal ========================================

refs.openFooterModal.addEventListener('click', onOpenModal);

function onOpenModal() {
   window.addEventListener('keydown', onEscClick); //for Esc
    refs.lightboxFooterModal.classList.remove('visually-hidden');   
}

//========================close the modal using the icon ========================================

refs.closeFooterModal.addEventListener('click', onCloseModal);

function onCloseModal() {
    window.removeEventListener('keydown', onEscClick); //for Esc
    refs.lightboxFooterModal.classList.add('visually-hidden');
}

// ==============================close on the backdrop====================

refs.backdropClick.addEventListener('click', onBackdropClick);

function onBackdropClick(event) {
    if (event.currentTarget === event.target) {
        onCloseModal();
    }
    console.log('кликнули по backdrop');
}

// ===========================close with ESC==========================

function onEscClick(event) {
    const ESC_KEY_CODE = 'Escape';
    console.log(event.code);

    if (event.code === ESC_KEY_CODE) {
        onCloseModal();
    }
}