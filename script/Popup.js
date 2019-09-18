export class Popup {
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