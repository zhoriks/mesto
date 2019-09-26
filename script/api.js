const formEdit = document.forms.edit;
const fullNameInput = formEdit.elements.fullname;
const aboutMeInput = formEdit.elements.aboutme;

export class Api {
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
    }
  }