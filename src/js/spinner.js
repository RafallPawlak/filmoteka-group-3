

import { refs } from './modal-footer';
const preloader = refs.spinnerPreloader;

document.body.onload = () => {
  setTimeout(() => {
    if (!preloader.classList.contains('preloader-js')) {
      preloader.classList.add('preloader-js');
    }
  }, 500);
};


  function removeSpinner() {
    setTimeout(preloader.classList.add('preloader-js'), 500);
  };
  function addSpinner() {
    preloader.classList.remove('preloader-js');
  };
  export {
    removeSpinner,
    addSpinner
  }
