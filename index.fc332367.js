var e="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},t={},n={},o=e.parcelRequired7c6;null==o&&((o=function(e){if(e in t)return t[e].exports;if(e in n){var o=n[e];delete n[e];var d={id:e,exports:{}};return t[e]=d,o.call(d.exports,d,d.exports),d.exports}var r=new Error("Cannot find module '"+e+"'");throw r.code="MODULE_NOT_FOUND",r}).register=function(e,t){n[e]=t},e.parcelRequired7c6=o),o("dNTj1"),o("2nhTy"),o("bO1YF"),o("6lsda");var d=o("dNTj1"),r=o("31u3U");const i=document.querySelector("body"),a=document.querySelector("[data-modal-open]"),l=document.querySelector("[data-modal]");document.querySelector(".backdrop");function c(){l.classList.toggle("is-hidden"),i.classList.remove("no-scroll")}function s(e){"Escape"===e.code&&(c(),window.removeEventListener("keydown",s))}a&&a.addEventListener("click",(function(e){if("thumb"!==e.target.parentElement.className)return;l.classList.toggle("is-hidden"),i.classList.add("no-scroll"),window.addEventListener("keydown",s);const t=e.target.parentElement.dataset.id;(0,d.descriptionTagMovie)(t).then((()=>{document.querySelector("[data-movie-close]").addEventListener("click",c),(0,r.changeWatchedQueueList)(t),(0,r.textModalButtons)(t)}))})),o("31u3U");
//# sourceMappingURL=index.fc332367.js.map