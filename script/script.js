import "../pages/index.css"
import {Card} from "./card.js"
import {CardList} from "./cardlist.js"
import {Popup} from "./popup.js"
import {Api} from "./api.js"

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort2' : 'https://praktikum.tk/cohort2'

const userInfoButton = document.querySelector('.user-info__button');
const closeUserInfoButton = document.querySelector('.popup__close');
const form = document.forms.new;
const editButton = document.querySelector('.user-info__button_edit');
const closeUserEditButton = document.querySelector('.popup-edit__close');
const popupEditSaveButton = document.querySelector('.popup-edit__button');
const formEdit = document.forms.edit;
const placesList = document.querySelector('.places-list');
const popupPhotoImage = document.querySelector('.popup-photo__image')
const closePopupPhotoButton = document.querySelector('.popup-photo__close');
const fullName = document.querySelector('.user-info__name');
const aboutMe = document.querySelector('.user-info__job');
const aboutMeInput = formEdit.elements.aboutme;
const fullNameInput = formEdit.elements.fullname;

export const api = new Api(serverUrl, 'ba6f616a-7f07-4a53-991f-9de8753974a0');


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
  })


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
