var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},i=e.parcelRequired7c6;null==i&&((i=function(e){if(e in t)return t[e].exports;if(e in n){var i=n[e];delete n[e];var a={id:e,exports:{}};return t[e]=a,i.call(a.exports,a,a.exports),a.exports}var s=new Error("Cannot find module '"+e+"'");throw s.code="MODULE_NOT_FOUND",s}).register=function(e,t){n[e]=t},e.parcelRequired7c6=i),i("dNTj1"),i("bO1YF"),i("6lsda");var a=i("dNTj1"),s=i("31u3U");s=i("31u3U");async function o(e){try{const t="https://api.themoviedb.org/3/",n=new URLSearchParams({api_key:"bdba5342660bdd1dac5d09b885091a0c"}),i=await fetch(t+"movie/"+e+"?"+n);return await i.json()}catch(e){console.log("fetchApiById: ",e)}}a=i("dNTj1");const l=document.querySelector(".library__grid"),c=document.querySelector(".filmless"),d=document.querySelector(".btn__lib__watched"),r=document.querySelector(".btn__lib__queue");document.querySelector(".library");function u(){l.innerHTML="",c.innerHTML="";let e=[],t=[];(0,s.getKey)("watched")&&(e=(0,s.getKey)("watched")),(0,s.getKey)("queue")&&(t=(0,s.getKey)("queue"));const n=[...e,...t];if(0===e.length&&0===t.length){const e='<h2 class="filmless__title">No films have been added to your library</h2>\n      <p>Find something you\'ve watched or something to watch from the most popular</p>\n      <button class="modal__btn filmless__button" onclick="location.href=\'https://rafallpawlak.github.io/filmoteka-group-3/\'" type="button">LET\'S GO</button>';c.insertAdjacentHTML("beforeend",e)}else{const e='<h2 class="filmless__title">Your full library:<h2>';c.insertAdjacentHTML("beforeend",e);for(let e of n)o(e).then((e=>{let t=new Date(e.release_date);const n=e.genres.map((e=>e.name)),i=`\n      <li>\n        <figure class="card">\n          <div class="thumb" data-id="${e.id}">\n            <img class="img" src="https://www.themoviedb.org/t/p/w300${e.poster_path}" />\n          </div>\n          <figcaption>\n            <h3 class="title">${e.title}</h3>\n            <div class="details-wrapper">\n              <p class="details" data-film_id="${e.id}">${n.join(", ")} &#124; ${t.getFullYear()}</p>\n              <div class="rating rating--visible">${(0,a.roundingMethodToFirstPlace)(e.vote_average)}</div>\n            </div>\n          </figcaption>\n        </figure>\n      </li>\n      `;l.insertAdjacentHTML("beforeend",i)}))}}function f(){l.innerHTML="",c.innerHTML="";const e=(0,s.getKey)("watched");if(p(d),g(r),e&&0!==e.length)for(let t of e)o(t).then((e=>{let t=new Date(e.release_date);const n=e.genres.map((e=>e.name)),i=`\n      <li>\n        <figure class="card">\n          <div class="thumb" data-id="${e.id}">\n            <img class="img" src="https://www.themoviedb.org/t/p/w300${e.poster_path}" />\n          </div>\n          <figcaption>\n            <h3 class="title">${e.title}</h3>\n            <div class="details-wrapper">\n              <p class="details" data-film_id="${e.id}">${n.join(", ")} &#124; ${t.getFullYear()}</p>\n              <div class="rating rating--visible">${(0,a.roundingMethodToFirstPlace)(e.vote_average)}</div>\n            </div>\n          </figcaption>\n        </figure>\n      </li>\n      `;l.insertAdjacentHTML("beforeend",i)}));else{const e='<h2 class="filmless__title">No films have been added to your watched</h2>\n      <p>Find something you\'ve watched from the most popular</p>\n      <button class="modal__btn filmless__button" onclick="location.href=\'https://rafallpawlak.github.io/filmoteka-group-3/\'" type="button">LET\'S GO</button>';c.insertAdjacentHTML("beforeend",e)}}function h(){l.innerHTML="",c.innerHTML="";const e=(0,s.getKey)("queue");if(p(r),g(d),e&&0!==e.length)for(let t of e)o(t).then((e=>{let t=new Date(e.release_date);const n=e.genres.map((e=>e.name)),i=`\n      <li>\n        <figure class="card">\n          <div class="thumb" data-id="${e.id}">\n            <img class="img" src="https://www.themoviedb.org/t/p/w300${e.poster_path}" />\n          </div>\n          <figcaption>\n            <h3 class="title">${e.title}</h3>\n            <div class="details-wrapper">\n              <p class="details" data-film_id="${e.id}">${n.join(", ")} &#124; ${t.getFullYear()}</p>\n              <div class="rating rating--visible">${(0,a.roundingMethodToFirstPlace)(e.vote_average)}</div>\n            </div>\n          </figcaption>\n        </figure>\n      </li>\n      `;l.insertAdjacentHTML("beforeend",i)}));else{const e='<h2 class="filmless__title">No films have been added to your queue list</h2>\n      <p>Find something to watch from the most popular</p>\n      <button class="modal__btn filmless__button" onclick="location.href=\'https://rafallpawlak.github.io/filmoteka-group-3/\'" type="button">LET\'S GO</button>';c.insertAdjacentHTML("beforeend",e)}}u(),d.addEventListener("click",f),r.addEventListener("click",h);const p=e=>{e.classList.contains("btn--active")||e.classList.add("btn--active")},g=e=>{e.classList.contains("btn--active")&&e.classList.remove("btn--active")},m=document.querySelector("body"),b=document.querySelector("[data-modal-open]"),v=document.querySelector("[data-modal]");function w(){v.classList.toggle("is-hidden"),m.classList.remove("no-scroll")}function _(e){"Escape"===e.code&&(w(),window.removeEventListener("keydown",_))}function y(){d.classList.contains("btn--active")||r.classList.contains("btn--active")||u(),d.classList.contains("btn--active")&&f(),r.classList.contains("btn--active")&&h()}b&&b.addEventListener("click",(function(e){if("thumb"!==e.target.parentElement.className)return;v.classList.toggle("is-hidden"),m.classList.add("no-scroll"),window.addEventListener("keydown",_);const t=e.target.parentElement.dataset.id;(0,a.descriptionTagMovie)(t).then((()=>{const e=document.querySelector("[data-movie-close]");e.addEventListener("click",w),e.addEventListener("click",y),(0,s.changeWatchedQueueList)(t),(0,s.textModalButtons)(t)}))})),i("31u3U");
//# sourceMappingURL=my-library.621d7e78.js.map
