export class Card {
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