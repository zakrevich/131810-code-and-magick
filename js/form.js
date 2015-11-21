'use strict';

(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var formControls = document.querySelectorAll('.review-fields');
  var fieldsName = document.querySelector('.review-fields-name');
  var fieldText = document.querySelector('.review-fields-text');

  // форма и поля ввода
  var formElement = document.querySelector('.review-form');
  var stars = formElement['review-mark'];
  var name = formElement['review-name'];
  var reviewText = formElement['review-text'];

  name.required = true;

  function checkName() {
    if (name.value === '') {
      fieldsName.classList.remove('invisible');
      return false;
    } else if (name.value !== '') {
      fieldsName.classList.add('invisible');
      return true;
    }
  }

  function checkStarsText() {
    if (stars.value < 3 && reviewText.value === '') {
      reviewText.required = true;
      fieldText.classList.remove('invisible');
      return false;
    } else if (stars.value < 3 && reviewText.value !== '') {
      fieldText.classList.add('invisible');
      return true;
    } else {
      fieldText.classList.add('invisible');
      reviewText.required = false;
      return true;
    }
  }

  function removeAll() {
    var starsAndText = checkStarsText();
    var namename = checkName();

    if (starsAndText === true && namename === true) {
      for (var i = 0; i < formControls.length; i++) {
        formControls[i].classList.add('invisible');
      }
    } else if (starsAndText !== true || namename !== true) {
      for (i = 0; i < formControls.length; i++) {
        formControls[i].classList.remove('invisible');
      }
    }
  }

  name.onchange = function() {
    checkName();
    checkStarsText();
    removeAll();
  };

  reviewText.onchange = function() {
    checkName();
    checkStarsText();
    removeAll();
  };

  for (var i = 0; i < stars.length; i++) {
    stars[i].onchange = function() {
      checkName();
      checkStarsText();
      removeAll();
    };
  }


  formElement.onsubmit = function(evt) {
    evt.formElement.submit();
  };

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
    fieldText.classList.add('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };
})();
