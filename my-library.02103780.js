!function(){function e(e){return e&&e.__esModule?e.default:e}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},n={},a={},i=t.parcelRequired7c6;null==i&&((i=function(e){if(e in n)return n[e].exports;if(e in a){var t=a[e];delete a[e];var i={id:e,exports:{}};return n[e]=i,t.call(i.exports,i,i.exports),i.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){a[e]=t},t.parcelRequired7c6=i),i("4cG42"),i("5YNLl"),i("kLpTw");var o=i("4cG42"),r=i("UL92Z"),c=i("8nrFW"),l=(r=i("UL92Z"),i("bpxeT")),s=i("2TvXO");function d(e){return u.apply(this,arguments)}function u(){return(u=e(l)(e(s).mark((function t(n){var a,i,o;return e(s).wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,"bdba5342660bdd1dac5d09b885091a0c","https://api.themoviedb.org/3/",a=new URLSearchParams({api_key:"bdba5342660bdd1dac5d09b885091a0c"}),e.next=6,fetch("https://api.themoviedb.org/3/movie/"+n+"?"+a);case 6:return i=e.sent,e.next=9,i.json();case 9:return o=e.sent,e.abrupt("return",o);case 13:e.prev=13,e.t0=e.catch(0),console.log("fetchApiById: ",e.t0);case 16:case"end":return e.stop()}}),t,null,[[0,13]])})))).apply(this,arguments)}o=i("4cG42");var f=document.querySelector(".library__grid"),p=document.querySelector(".filmless"),v=document.querySelector(".btn__lib__watched"),h=document.querySelector(".btn__lib__queue");document.querySelector(".library");function g(){f.innerHTML="",p.innerHTML="";var t=[],n=[];(0,r.getKey)("watched")&&(t=(0,r.getKey)("watched")),(0,r.getKey)("queue")&&(n=(0,r.getKey)("queue"));var a=e(c)(t).concat(e(c)(n));if(0===t.length&&0===n.length){p.insertAdjacentHTML("beforeend",'<h2 class="filmless__title">No films have been added to your library</h2>\n      <p>Find something you\'ve watched or something to watch from the most popular</p>\n      <button class="modal__btn filmless__button" onclick="location.href=\'https://rafallpawlak.github.io/filmoteka-group-3/\'" type="button">LET\'S GO</button>')}else{p.insertAdjacentHTML("beforeend",'<h2 class="filmless__title">Your full library:<h2>');var i=!0,l=!1,s=void 0;try{for(var u,v=a[Symbol.iterator]();!(i=(u=v.next()).done);i=!0){d(u.value).then((function(e){var t=new Date(e.release_date),n=e.genres.map((function(e){return e.name})),a='\n      <li>\n        <figure class="card">\n          <div class="thumb" data-id="'.concat(e.id,'">\n            <img class="img" src="https://www.themoviedb.org/t/p/w300').concat(e.poster_path,'" />\n          </div>\n          <figcaption>\n            <h3 class="title">').concat(e.title,'</h3>\n            <div class="details-wrapper">\n              <p class="details" data-film_id="').concat(e.id,'">').concat(n.join(", ")," &#124; ").concat(t.getFullYear(),'</p>\n              <div class="rating rating--visible">').concat((0,o.roundingMethodToFirstPlace)(e.vote_average),"</div>\n            </div>\n          </figcaption>\n        </figure>\n      </li>\n      ");f.insertAdjacentHTML("beforeend",a)}))}}catch(e){l=!0,s=e}finally{try{i||null==v.return||v.return()}finally{if(l)throw s}}}}function m(){f.innerHTML="",p.innerHTML="";var e=(0,r.getKey)("watched");y(v),w(h);var t=!0,n=!1,a=void 0;if(e&&0!==e.length)try{for(var i,c=e[Symbol.iterator]();!(t=(i=c.next()).done);t=!0){d(i.value).then((function(e){var t=new Date(e.release_date),n=e.genres.map((function(e){return e.name})),a='\n      <li>\n        <figure class="card">\n          <div class="thumb" data-id="'.concat(e.id,'">\n            <img class="img" src="https://www.themoviedb.org/t/p/w300').concat(e.poster_path,'" />\n          </div>\n          <figcaption>\n            <h3 class="title">').concat(e.title,'</h3>\n            <div class="details-wrapper">\n              <p class="details" data-film_id="').concat(e.id,'">').concat(n.join(", ")," &#124; ").concat(t.getFullYear(),'</p>\n              <div class="rating rating--visible">').concat((0,o.roundingMethodToFirstPlace)(e.vote_average),"</div>\n            </div>\n          </figcaption>\n        </figure>\n      </li>\n      ");f.insertAdjacentHTML("beforeend",a)}))}}catch(e){n=!0,a=e}finally{try{t||null==c.return||c.return()}finally{if(n)throw a}}else{p.insertAdjacentHTML("beforeend",'<h2 class="filmless__title">No films have been added to your watched</h2>\n      <p>Find something you\'ve watched from the most popular</p>\n      <button class="modal__btn filmless__button" onclick="location.href=\'https://rafallpawlak.github.io/filmoteka-group-3/\'" type="button">LET\'S GO</button>')}}function b(){f.innerHTML="",p.innerHTML="";var e=(0,r.getKey)("queue");y(h),w(v);var t=!0,n=!1,a=void 0;if(e&&0!==e.length)try{for(var i,c=e[Symbol.iterator]();!(t=(i=c.next()).done);t=!0){d(i.value).then((function(e){var t=new Date(e.release_date),n=e.genres.map((function(e){return e.name})),a='\n      <li>\n        <figure class="card">\n          <div class="thumb" data-id="'.concat(e.id,'">\n            <img class="img" src="https://www.themoviedb.org/t/p/w300').concat(e.poster_path,'" />\n          </div>\n          <figcaption>\n            <h3 class="title">').concat(e.title,'</h3>\n            <div class="details-wrapper">\n              <p class="details" data-film_id="').concat(e.id,'">').concat(n.join(", ")," &#124; ").concat(t.getFullYear(),'</p>\n              <div class="rating rating--visible">').concat((0,o.roundingMethodToFirstPlace)(e.vote_average),"</div>\n            </div>\n          </figcaption>\n        </figure>\n      </li>\n      ");f.insertAdjacentHTML("beforeend",a)}))}}catch(e){n=!0,a=e}finally{try{t||null==c.return||c.return()}finally{if(n)throw a}}else{p.insertAdjacentHTML("beforeend",'<h2 class="filmless__title">No films have been added to your queue list</h2>\n      <p>Find something to watch from the most popular</p>\n      <button class="modal__btn filmless__button" onclick="location.href=\'https://rafallpawlak.github.io/filmoteka-group-3/\'" type="button">LET\'S GO</button>')}}g(),v.addEventListener("click",m),h.addEventListener("click",b);var y=function(e){e.classList.contains("btn--active")||e.classList.add("btn--active")},w=function(e){e.classList.contains("btn--active")&&e.classList.remove("btn--active")},_=document.querySelector("body"),L=document.querySelector("[data-modal-open]"),T=document.querySelector("[data-modal]");function M(){T.classList.toggle("is-hidden"),_.classList.remove("no-scroll")}function k(e){"Escape"===e.code&&(M(),window.removeEventListener("keydown",k))}function q(){v.classList.contains("btn--active")||h.classList.contains("btn--active")||g(),v.classList.contains("btn--active")&&m(),h.classList.contains("btn--active")&&b()}L&&L.addEventListener("click",(function(e){if("thumb"!==e.target.parentElement.className)return;T.classList.toggle("is-hidden"),_.classList.add("no-scroll"),window.addEventListener("keydown",k);var t=e.target.parentElement.dataset.id;(0,o.descriptionTagMovie)(t).then((function(){var e=document.querySelector("[data-movie-close]");e.addEventListener("click",M),e.addEventListener("click",q),(0,r.changeWatchedQueueList)(t),(0,r.textModalButtons)(t)}))})),i("UL92Z")}();
//# sourceMappingURL=my-library.02103780.js.map
