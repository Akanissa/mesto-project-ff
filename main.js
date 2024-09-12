(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",o)}function n(e){e.classList.remove("popup_is-opened"),document.addEventListener("keydown",o)}function o(e){if("Escape"===e.key){var t=document.querySelector(".popup_is-opened");t&&n(t)}}e.d({},{k:()=>N});var r={cohort:"https://nomoreparties.co/v1/wff-cohort-22",headers:{authorization:"ec4a8345-2acc-4c2a-a578-5eda86b96926","Content-Type":"application/json"}},c=function(e){return e.ok?e.json():Promise.reject("".concat(e.status))},a=function(e,t){return fetch("".concat(r.cohort,"/cards/").concat(e),{method:"DELETE",headers:r.headers}).then((function(){t.remove()}))};function i(e,t,n,o,r){var c=N.querySelector(".card").cloneNode(!0),a=c.querySelector(".card__image");c.querySelector(".card__image");var i=c.querySelector(".card__title"),u=c.querySelector(".card__like-counter");a.src=e.link,c.alt=e.name,i.textContent=e.name;var l=c.querySelector(".card__delete-button");c.dataset.id=e._id,e.owner._id===r?l.addEventListener("click",(function(){t(e._id,c)})):l.remove(l);var s=c.querySelector(".card__like-button");return e.likes&&(u.textContent=e.likes.length),e.likes.some((function(e){return e._id===r}))?s.classList.add("card__like-button_is-active"):u.textContent=e.likes.length,s.addEventListener("click",(function(){n(u,s,e)})),a.addEventListener("click",(function(){o(e)})),c}var u=function(e,t,n){var o;t.classList.contains("card__like-button_is-active")?(o=n._id,fetch("".concat(r.cohort,"/cards/likes/").concat(o),{method:"DELETE",headers:r.headers}).then(c)).then((function(n){if(n)return t.classList.toggle("card__like-button_is-active"),e.textContent=n.likes.length})).catch((function(e){console.log("Ошибка: ".concat(e))})):function(e){return fetch("".concat(r.cohort,"/cards/likes/").concat(e),{method:"PUT",headers:r.headers}).then(c)}(n._id).then((function(n){n&&(t.classList.toggle("card__like-button_is-active"),e.textContent=n.likes.length)})).catch((function(e){console.log("Ошибка: ".concat(e))}))};function l(e,t,n){var o=e.querySelector(".".concat(t.id,"__input-error"));t.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent="",t.setCustomValidity("")}function s(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}function d(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);s(n,o,t),n.forEach((function(r){r.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.error):t.setCustomValidity(""),t.validity.valid?l(e,t,n):function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"__input-error"));t.classList.add(o.inputErrorClass),r.textContent=n,r.classList.add(o.errorClass)}(e,t,t.validationMessage,n)}(e,r,t),s(n,o,t)}))}))}(t,e)}))}function p(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),o=e.querySelector(t.submitButtonSelector);n.forEach((function(n){l(e,n,t)})),s(n,o,t)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,o=Array(t);n<t;n++)o[n]=e[n];return o}var _={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type-error",errorClass:"popup__error_visible"},m=document.querySelectorAll(".popup"),y=document.querySelector(".profile__edit-button"),h=document.querySelector(".popup_type_edit"),v=document.querySelectorAll(".popup__close"),S=document.querySelector(".profile__add-button"),b=document.querySelector(".popup_type_new-card"),g=document.querySelectorAll(".popup__content"),q=document.querySelector(".popup__input_type_name"),E=document.querySelector(".popup__input_type_description"),k=document.forms["edit-profile"],C=document.querySelector(".popup__input_type_card-name"),L=document.querySelector(".popup__input_type_url"),x=document.forms["new-place"],A=document.querySelector(".popup_type_image"),w=document.querySelector(".profile__title"),O=document.querySelector(".profile__description"),T=document.querySelector(".popup__image"),j=document.querySelector(".popup__caption"),P=document.querySelector(".profile__image"),I=document.querySelector(".popup_type_avatar"),B=document.forms["edit-avatar"],D=document.querySelector(".avatar__input_type_url"),N=document.querySelector("#card-template").content,J=document.querySelector(".places__list");function M(e){j.textContent=e.name,T.src=e.link,T.alt=e.name,t(A)}function V(e,t){e.querySelector(".popup__button").textContent=t}y.addEventListener("click",(function(){q.value=w.textContent,E.value=O.textContent,t(h),p(k,_)})),S.addEventListener("click",(function(){x.reset(),t(b),p(b,_)})),P.addEventListener("click",(function(){p(I,_),B.reset(),t(I)})),v.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){n(t)}))})),h.addEventListener("click",(function(){n(h)})),b.addEventListener("click",(function(){n(b)})),m.forEach((function(e){e.addEventListener("click",(function(t){t.target===e&&n(e)}))})),g.forEach((function(e){e.closest(".popup__content"),e.addEventListener("click",(function(e){e.stopPropagation()}))})),k.addEventListener("submit",(function(e){e.preventDefault();var t,o,a=q.value,i=E.value;V(h,"Сохранение..."),(t=a,o=i,fetch("".concat(r.cohort,"/users/me"),{method:"PATCH",headers:r.headers,body:JSON.stringify({name:t,about:o})}).then(c)).then((function(e){e.name=w.textContent,e.about=O.textContent,console.log("Данные пользователя обновлены:",e),w.textContent=a,O.textContent=i,n(h)})).catch((function(e){console.log("Ошибка обновления данных: ".concat(e))})).finally((function(){V(h,"Сохранить")}))})),x.addEventListener("submit",(function(e){e.preventDefault();var t,o,l=C.value,s=L.value;V(b,"Сохранение..."),(t=l,o=s,fetch("".concat(r.cohort,"/cards"),{method:"POST",headers:r.headers,body:JSON.stringify({name:t,link:o})}).then(c)).then((function(e){var t=i(e,a,u,M,e.owner._id);J.prepend(t),x.reset(),n(b)})).catch((function(e){console.log("Ошибка добавления данных: ".concat(e))})).finally((function(){V(b,"Создать")}))})),B.addEventListener("submit",(function(e){e.preventDefault();var t,o=D.value;V(I,"Сохранение..."),(t=o,fetch("".concat(r.cohort,"/users/me/avatar"),{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:t})}).then(c)).then((function(e){P.style.backgroundImage="url(".concat(e.avatar,")"),console.log("Аватар пользователя обновлен:",e),n(I)})).catch((function(e){console.log(e)})).finally((function(){V(I,"Сохранить")})),d(_)})),d(_);var G=[fetch("".concat(r.cohort,"/users/me"),{method:"GET",headers:r.headers}).then(c),fetch("".concat(r.cohort,"/cards"),{method:"GET",headers:r.headers}).then(c)];Promise.all(G).then((function(e){var t,n,o=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var o,r,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;u=!1}else for(;!(u=(o=c.call(n)).done)&&(i.push(o.value),i.length!==t);u=!0);}catch(e){l=!0,r=e}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw r}}return i}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),r=o[0],c=o[1],l=r._id;w.textContent=r.name,O.textContent=r.about,P.style.backgroundImage="url(".concat(r.avatar,")"),c.forEach((function(e){var t=i(e,a,u,M,l);J.append(t)})),console.log({userInfo:r,cardsInfo:c})})).catch((function(e){console.log("Ошибка получения данных: ".concat(e))}))})();