import {api} from "./script.js" 
import {Card} from "./card.js"

export class CardList {
    constructor(container) {
      this.container = container;
      this.render(); 
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
  
          }
        })
    }
  }