import { fetchApi } from './fetchMovie';
import { fetchApiTrending } from './fetchMovie';
import Pagination from 'tui-pagination';
//import 'tui-pagination/dist/tui-pagination.css';

const container = document.getElementById('pagination');
const options = { // below default value of options
     totalItems: 1000,
     itemsPerPage: 40,
     visiblePages: 5,
     page: 1,
     centerAlign: false,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
     template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
     }
};
const pagination = new Pagination(container, options);

pagination.on('afterMove', (event) => {
  const currentPage = event.page;
  fetchApiTrending(currentPage);
  const topPage = document.querySelector(".header");
  topPage.scrollIntoView({behavior: "smooth"});
});
