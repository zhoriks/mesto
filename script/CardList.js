export class CardList {
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