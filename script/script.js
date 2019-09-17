
class Card {
  constructor(name, link) {
    this.name = name;
    this.link = link;
    this.remove = this.remove.bind(this)
    this.cardElement = this.create();

    this.cardElement
      .querySelector('.place-card__like-icon')
      .addEventListener('click', this.like);
    this.cardElement
      .querySelector('.place-card__delete-icon')
      .addEventListener('click', this.remove);
    
  }
  create() {     // без параметров
    const imageLink = `background-image: url(${this.link})`;

    const placeCard = document.createElement('div');
    placeCard.classList.add('place-card');

    const placeCardImage = document.createElement('div');
    placeCardImage.classList.add('place-card__image');
    
    const placeCardDeleteIcon = document.createElement('button');
    placeCardDeleteIcon.classList.add('place-card__delete-icon');

    const placeCardDescription = document.createElement('div');
    placeCardDescription.classList.add('place-card__description'); 
    
    const placeCardName = document.createElement('h3');
    placeCardName.classList.add('place-card__name');

    const placeCardDescriptionColumn = document.createElement('div');
    placeCardDescriptionColumn.classList.add('place-card__description-column')

    const placeCardLikeIcon = document.createElement('button');
    placeCardLikeIcon.classList.add('place-card__like-icon');

    const placeCardLikeСounter = document.createElement('div');
    placeCardLikeСounter.classList.add('place-card__like-counter');

    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardDescriptionColumn);
    placeCardDescriptionColumn.appendChild(placeCardLikeIcon);
    placeCardDescriptionColumn.appendChild(placeCardLikeСounter);
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);

    placeCardName.textContent = this.name;
    placeCardImage.setAttribute('style', imageLink);
    // Проверка #2 не исправлено

    // Надо исправить - отрисовка задача класса cardList
    // каждая функция должна иметь одно целевое действие
    // например создавать разметку карточки с данными

    return placeCard;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  remove(container) {
    this.cardElement.remove()
  }
}

class CardList {
  constructor(container) {
    this.container = container;
    this.render(); // отлично отрисовка запускается сразу при инициализации
  }

  addCard(name, link) {
    const { cardElement } = new Card(name, link);
    this.container.appendChild(cardElement);
  }

  render() {
    api.getCards()
      .then((result) => {
        for (let i=0; i<result.length; i++) {
          this.addCard(result[i].name, result[i].link);
          // Проверка #2 не исправлено
          // внутри метода render лучше вызывать this.addCard(result[i].name, result[i].link)
          // передавать данные для отрисовки и создания карточки

          // отрисовка в cardList
          // он же добавляет карточки на страницу в Card только получение разметки
          // следует делать
      
        }
      })
  }
}

class Popup {
  constructor(container) {
    this.container = container;
    this.validation();
  }
  open(pop) {
    this.container.classList.add(`${pop}_is-opened`)
  }

  close(pop) {
    this.container.classList.remove(`${pop}_is-opened`)
  }

  validation() {
    form.addEventListener('input', function(event){
      if (addName.value.length === 0 || addLink.value.length === 0) {
        popupAddCardButton.setAttribute('disabled', true);
        popupAddCardButton.classList.add("popup__button_disabled");
      }
      else {
        popupAddCardButton.removeAttribute('disabled');
        popupAddCardButton.classList.remove("popup__button_disabled");
      }
    });
    
    formEdit.addEventListener('input', function(event){
      if (fullNameInput.value.length === 0 || aboutMeInput.value.length === 0 ||fullNameInput.value.length === 1 || aboutMeInput.value.length === 1) {
        popupEditAddCardButton.setAttribute('disabled', true);
        popupEditAddCardButton.classList.add("popup__button_disabled");
      }
      else {
        popupEditAddCardButton.removeAttribute('disabled');
        popupEditAddCardButton.classList.remove("popup__button_disabled");
      }
    });

    if (addName.value === '') {
      popupAddCardButton.setAttribute('disabled', true);
      popupAddCardButton.classList.add("popup__button_disabled");
    } else {
      popupAddCardButton.removeAttribute('disabled');
      popupAddCardButton.classList.remove("popup__button_disabled");
    }

    fullNameInput.addEventListener('input',function(){
      const popupEditFullNameErrorRequired = document.querySelector('.popup-edit__fullname-error_required');
      const popupEditFullNameErrorLength = document.querySelector('.popup-edit__fullname-error_length');
      const checkFullNameInput = formEdit.fullname.validity;
      if (checkFullNameInput.valueMissing === false) {
        popupEditFullNameErrorRequired.classList.remove('popup-edit__fullname-error_add'); 
      } else { popupEditFullNameErrorRequired.classList.add('popup-edit__fullname-error_add')}
      if (checkFullNameInput.tooShort === false) {
        popupEditFullNameErrorLength.classList.remove('popup-edit__fullname-error_add'); 
      } else {popupEditFullNameErrorLength.classList.add('popup-edit__fullname-error_add')}
    });
    aboutMeInput.addEventListener('input',function(){
      const popupEditAboutMeErrorRequired = document.querySelector('.popup-edit__aboutme-error_required');
      const popupEditAboutMeErrorLength = document.querySelector('.popup-edit__aboutme-error_length');
      const checkAboutMeInput = formEdit.aboutme.validity;
      if (checkAboutMeInput.valueMissing === false) {
        popupEditAboutMeErrorRequired.classList.remove('popup-edit__aboutme-error_add'); 
      } else { popupEditAboutMeErrorRequired.classList.add('popup-edit__aboutme-error_add')}
      if (checkAboutMeInput.tooShort === false) {
        popupEditAboutMeErrorLength.classList.remove('popup-edit__aboutme-error_add'); 
      } else {popupEditAboutMeErrorLength.classList.add('popup-edit__aboutme-error_add')}
    });
  }
}

class Api {
  constructor(url,token) {
    this.url = url;
    this.token = token; 
    
  }

  getCards() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  informationAboutMe() {
    return fetch(`${this.url}/users/me`, {
      headers: {
        authorization: this.token
      } 
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  addCard() {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: addName.value,
          link: addLink.value
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    });
  }

  editInformationAboutMe() {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          name: fullNameInput.value,
          about: aboutMeInput.value
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }) 
    .catch((err) => {
    console.log(`Ошибка: ${err}`);
  });
  }

  likesCounter() {
    return fetch(`${this.url}/cards`, {
      headers: {
        authorization: this.token
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })
    // Надо исправить #2 не хватает проверки результата запроса
  }
}

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