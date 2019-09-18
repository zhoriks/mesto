import Card from './Card.js';
import CardList from './CardList.js';
import Popup from './Popup.js';
import Api from './Api.js';

const userInfoButton = document.querySelector('.user-info__button');
const closeUserInfoButton = document.querySelector('.popup__close');
const form = document.forms.new;
const addLink = form.elements.link;
const addName = form.elements.name;
const editButton = document.querySelector('.user-info__button_edit');
const closeUserEditButton = document.querySelector('.popup-edit__close');
const popupEditSaveButton = document.querySelector('.popup-edit__button');
const formEdit = document.forms.edit;
const placesList = document.querySelector('.places-list');
const popupPhotoImage = document.querySelector('.popup-photo__image')
const closePopupPhotoButton = document.querySelector('.popup-photo__close');
const popupAddCardButton = document.querySelector('.popup__button');
const popupEditAddCardButton = document.querySelector('.popup-edit__button');
const fullNameInput = formEdit.elements.fullname;
const aboutMeInput = formEdit.elements.aboutme;
const fullName = document.querySelector('.user-info__name');
const aboutMe = document.querySelector('.user-info__job');

const api = new Api('http://95.216.175.5/cohort2', 'ba6f616a-7f07-4a53-991f-9de8753974a0');


const cardList = new CardList(document.querySelector('.places-list'));
const popup = new Popup(document.querySelector('.popup'));
const popupPhoto = new Popup(document.querySelector('.popup-photo'));
const popupEdit = new Popup(document.querySelector('.popup-edit'));

api.informationAboutMe()
  .then((result) => {
    if (result.name && result.about) { 
      fullName.textContent = result.name;
      aboutMe.textContent = result.about;
    }
      
      /**
       * Надо исправить перед обновлением элементов требуется проверять наличие
       * данных в массиве например так if (data && data.length > 0) { render(data) }
       */

       //
    // перенесите в класс пользователя
  })
// api.informationAboutMe().then(data => ) обновляем DOM
api.likesCounter()
  .then((res) => { 
    if (res && res.length > 0) { 
      for (let i=0; i<res.length; i++) {
          /**
           * Надо исправить перед обновлением элементов требуется проверять наличие
           * данных в массиве например так if (data && data.length > 0) { render(data) }
           */ 

          // здесь нужна проверка что пришел именно обьект?
        document.querySelectorAll('.place-card__like-counter')[i].textContent = res[i].likes.length;
      }
    }
  });
setInterval(api.likesCounter, 30000) // Хорошая идея


userInfoButton.addEventListener('click', function() {
  popup.open('popup');
});
closeUserInfoButton.addEventListener('click', function() {
  popup.close('popup');
});
document.forms.new.addEventListener('submit', function(event) {
  event.preventDefault();
  api.addCard()
    .then((result) => { 
      console.log(result)
      cardList.addCard(result.name, result.link);
      popup.close('popup');
      /**
       * Надо исправить перед обновлением элементов требуется проверять наличие
       * данных в массиве например так if (data && data.length > 0) { render(data) }
       */

      // здесь не знаю какая нужна проверка
    })
});

editButton.addEventListener('click', function() {
  fullNameInput.setAttribute('value', fullName.textContent);
  aboutMeInput.setAttribute('value', aboutMe.textContent);
  popupEdit.open('popup-edit');
});
closeUserEditButton.addEventListener('click', function() {
  popupEdit.close('popup-edit');  
});


formEdit.addEventListener('submit', function(event) {
  event.preventDefault();
  api.editInformationAboutMe()
    .then((result) => { 
      fullName.textContent = result.name;
      aboutMe.textContent = result.about;
      /**
       * Надо исправить перед обновлением элементов требуется проверять наличие
       * данных в массиве например так if (data && data.length > 0) { render(data) }
       */

       // Здесь идет отправка на сервер, что проверять?
    })
  popupEdit.close('popup-edit');
});

closePopupPhotoButton.addEventListener('click', function(){
  popupPhoto.close('popup-photo');
});

document.querySelector('.places-list').addEventListener('click', function(event) {
  if (event.target.classList.contains('place-card__image') === true) {
  popupPhoto.open('popup-photo');
  const popupPhotoUrl = event.target.getAttribute('style').slice(22, -1);
  popupPhotoImage.setAttribute('src', popupPhotoUrl);
  }
});

// Здравствуйте! Просьба, если будут ошибки, просьба удалить прошлые коментарии, чтобы не путаться :) Спасибо!