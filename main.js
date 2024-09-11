(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)};function e(t){t.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function n(t){t.classList.remove("popup_is-opened"),document.addEventListener("keydown",o)}function o(t){if("Escape"===t.key){var e=document.querySelector(".popup_is-opened");e&&n(e)}}t.d({},{k:()=>B});var r={cohort:"https://nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"ec4a8345-2acc-4c2a-a578-5eda86b96926","Content-Type":"application/json"}},c=function(t,e){return fetch("".concat(r.cohort,"/cards/").concat(t),{method:"DELETE",headers:r.headers}).then((function(){e.remove()})).catch((function(t){console.log(t)}))};function a(t,e,n,o,r){var c=B.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image");c.querySelector(".card__image");var u=c.querySelector(".card__title"),i=c.querySelector(".card__like-counter");a.src=t.link,c.alt=t.name,u.textContent=t.name,t.likes?i.textContent=t.likes.length:i.textContent=0;var l=c.querySelector(".card__delete-button");c.dataset.id=t._id,t.owner._id===r?l.addEventListener("click",(function(){e(t._id,c)})):l.style.display="none";var s=c.querySelector(".card__like-button");return s.addEventListener("click",(function(){n(i,s,t)})),a.addEventListener("click",(function(){o(t)})),c}var u=function(t,e,n){var o;e.classList.contains("card__like-button_is-active")?(o=n._id,fetch("".concat(r.cohort,"/cards/likes/").concat(o),{method:"DELETE",headers:r.headers}).then((function(t){return t.ok?t.json():Promise.reject("".concat(t.status))})).catch((function(t){console.log(t)}))).then((function(n){n&&(e.classList.toggle("card__like-button_is-active"),t.textContent=n.likes.length)})).catch((function(t){console.log(t)})):function(t){return fetch("".concat(r.cohort,"/cards/likes/").concat(t),{method:"PUT",headers:r.headers}).then((function(t){return t.ok?t.json():Promise.reject("".concat(t.status))})).catch((function(t){console.log(t)}))}(n._id).then((function(n){n&&(e.classList.toggle("card__like-button_is-active"),t.textContent=n.likes.length)})).catch((function(t){console.log(t)}))},i={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type-error",errorClass:"popup__error_visible"};function l(t,e){var n=t.querySelector(".".concat(e.id,"__input-error"));e.classList.remove(i.inputErrorClass),n.classList.remove(i.errorClass),n.textContent=""}function s(t,e){!function(t){return t.some((function(t){return!t.validity.valid}))}(t)?(e.disabled=!1,e.classList.remove("button__inactive")):(e.disabled=!0,e.classList.add("button__inactive"))}function d(){Array.from(document.querySelectorAll(i.formSelector)).forEach((function(t){!function(t){var e=Array.from(t.querySelectorAll(i.inputSelector)),n=t.querySelector(i.submitButtonSelector);s(e,n),e.forEach((function(o){o.addEventListener("input",(function(){(function(t,e){e.validity.patternMismatch?e.setCustomValidity(e.dataset.error):e.setCustomValidity(""),e.validity.valid?l(t,e):function(t,e,n){var o=t.querySelector(".".concat(e.id,"__input-error"));e.classList.add(i.inputErrorClass),o.textContent=n,o.classList.add(i.errorClass)}(t,e,e.validationMessage)})(t,o),s(e,n)}))}))}(t)}))}function p(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);n.forEach((function(e){l(t,e)})),s(n,o)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}var _=document.querySelectorAll(".popup"),m=(document.querySelector(".popup__form"),document.querySelector(".profile__edit-button")),h=document.querySelector(".popup_type_edit"),y=document.querySelectorAll(".popup__close"),v=document.querySelector(".profile__add-button"),S=document.querySelector(".popup_type_new-card"),g=document.querySelectorAll(".popup__content"),b=document.querySelector(".popup__input_type_name"),k=document.querySelector(".popup__input_type_description"),q=document.forms["edit-profile"],E=document.querySelector(".popup__input_type_card-name"),C=document.querySelector(".popup__input_type_url"),L=document.forms["new-place"],j=document.querySelector(".popup_type_image"),x=document.querySelector(".profile__title"),A=document.querySelector(".profile__description"),P=document.querySelector(".popup__image"),w=document.querySelector(".popup__caption"),O=document.querySelector(".profile__image"),T=document.querySelector(".popup_type_avatar"),I=document.forms["edit-avatar"],D=document.querySelector(".avatar__input_type_url"),B=document.querySelector("#card-template").content,N=document.querySelector(".places__list");function J(t){w.textContent=t.name,P.src=t.link,P.alt=t.name,e(j)}function M(t,e){t.querySelector(".popup__button").textContent=e}m.addEventListener("click",(function(){p(q,i),e(h),b.value=x.textContent,k.value=A.textContent})),v.addEventListener("click",(function(){p(S,i),E.value="",C.value="",e(S)})),O.addEventListener("click",(function(){p(T,i),D.value="",e(T)})),y.forEach((function(t){var e=t.closest(".popup");t.addEventListener("click",(function(){n(e)}))})),h.addEventListener("click",(function(){n(h)})),S.addEventListener("click",(function(){n(S)})),_.forEach((function(t){t.addEventListener("click",(function(e){e.target===t&&n(t)}))})),g.forEach((function(t){t.closest(".popup__content"),t.addEventListener("click",(function(t){t.stopPropagation()}))})),q.addEventListener("submit",(function(t){t.preventDefault();var e,o,c=b.value,a=k.value;x.textContent=c,A.textContent=a,M(h,"Сохранение..."),(e=c,o=a,fetch("".concat(r.cohort,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:e,about:o})}).then((function(t){return t.ok?t.json():Promise.reject("".concat(t.status))})).catch((function(t){console.log(t)}))).then((function(t){t.name=x.textContent,t.about=A.textContent,console.log("Данные пользователя обновлены:",t),M(h,"Сохранить")})).catch((function(t){console.log(t),M(h,"Сохранить")})),n(h)})),L.addEventListener("submit",(function(t){t.preventDefault();var e,o,i=E.value,l=C.value;M(S,"Сохранение..."),(e=i,o=l,fetch("".concat(r.cohort,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:e,link:o})}).then((function(t){return t.ok?t.json():Promise.reject("".concat(t.status))})).catch((function(t){console.log(t)}))).then((function(t){var e=a(t,c,u,J,t.owner._id);N.prepend(e),L.reset(),n(S),M(S,"Создать")})).catch((function(t){console.log(t),M(S,"Создать")}))})),I.addEventListener("submit",(function(t){t.preventDefault();var e,o=D.value;M(T,"Сохранение..."),(e=o,fetch("".concat(r.cohort,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:e})}).then((function(t){return t.ok?t.json():Promise.reject("".concat(t.status))})).catch((function(t){console.log(t)}))).then((function(t){O.style.backgroundImage="url(".concat(t.avatar,")"),console.log("Аватар пользователя обновлен:",t),M(T,"Сохранить")})).catch((function(t){console.log(t),M(T,"Сохранить")})),n(T),d()})),d();var G=[fetch("".concat(r.cohort,"/users/me"),{method:"GET",headers:r.headers}).then((function(t){return t.ok?t.json():Promise.reject("".concat(t.status))})).catch((function(t){console.log(t)})),fetch("".concat(r.cohort,"/cards"),{method:"GET",headers:r.headers}).then((function(t){return t.ok?t.json():Promise.reject("".concat(t.status))})).catch((function(t){console.log(t)}))];Promise.all(G).then((function(t){var e,n,o=(n=2,function(t){if(Array.isArray(t))return t}(e=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;i=!1}else for(;!(i=(o=c.call(n)).done)&&(u.push(o.value),u.length!==e);i=!0);}catch(t){l=!0,r=t}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return u}}(e,n)||function(t,e){if(t){if("string"==typeof t)return f(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(t,e):void 0}}(e,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],i=o[1],l=r._id;x.textContent=r.name,A.textContent=r.about,O.style.backgroundImage="url(".concat(r.avatar,")"),i.forEach((function(t){var e=a(t,c,u,J,l);N.append(e)})),console.log({userInfo:r,cardsInfo:i})})).catch((function(t){console.log(t)}))})();